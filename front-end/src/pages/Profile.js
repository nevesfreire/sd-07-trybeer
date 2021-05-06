import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { getToken } from "../helpers/localStorage";
import CustomHeader from "../components/CustomHeader";
import CustomProfile from "../components/CustomProfile";
import fetchUpdate from "../service/profile";

function Profile() {
  const { email, name } = getToken();
  const [btnEnable, setBtnEnable] = useState(true);
  const [txtEnable, setTxtEnable] = useState(true);
  // const history = useHistory();
  const changeStateBtn = () => {
    setBtnEnable(false);
  };
  const changeStateTxt = () => {
    setTxtEnable(false);
  };

  const [formDataUpdate, setFormDataUpdate] = useState(new Map());

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormDataUpdate((prevState) => {
      return new Map(prevState).set(name, value);
    });
  }, []);

  const updateName = async () => {
    const name = formDataUpdate.get("name");
    const { id, token, email} = getToken();
   const result = await fetchUpdate(email, name, id, token);
   if(result === 200) setTxtEnable(false)
   console.log(result) 
  }
  // const [formData, setFormData] = useState(new Map());
  return (
    <div>
      <CustomHeader message="Cliente - Meu Perfil" />
      <CustomProfile
        name={name}
        email={email}
        btnEnable={btnEnable}
        txtEnable={txtEnable}
        formDataUpdate={formDataUpdate}
        stateBtn={changeStateBtn}
        stateTxt={changeStateTxt}
        uptName={updateName}
        onInputChange={handleInputChange}
      />
    </div>
  );
}

export default Profile;
