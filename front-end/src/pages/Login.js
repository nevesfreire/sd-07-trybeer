import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import CustomLogin from "../components/CustomLogin";
import CustomHeader from "../components/CustomHeader";
import fetchToken from "../service/auth";

function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState(new Map());

  const register = () => history.push("/register");

  const validate = () => {
    const email = formData.get("email");
    const password = formData.get("password");
    if (email) {
      const regexEmail = /\S+@\S+\.\S+/;
      if (!regexEmail.test(email)) {
        return true;
      }
    }
    if (!password || password.length <= 5) {
      return true;
    }
    return false;
  };

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData((prevState) => {
      return new Map(prevState).set(name, value);
    });
  }, []);

  const handleSubmit = async () => {
    const email = formData.get("email");
    const password = formData.get("password");
    const user = await fetchToken(email, password);
    const { role } = user;
    if (role === "client") return history.push("/products");
    history.push("/admin/orders");
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 500 }}>
        <CustomHeader message="TRYBEER" />
        <CustomLogin
          formData={formData}
          onInputChange={handleInputChange}
          onHandleSubmit={handleSubmit}
          goRegister={register}
          isValid={validate}
        />
      </Grid.Column>
    </Grid>
  );
}

export default Login;
