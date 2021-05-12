import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Segment } from 'semantic-ui-react';

const CustomAdminProfile = ({
  email: emailL,
  name: nameL,
  formDataUpdate: { email, name },
}) => {

  return (
    <div>
      <h1>Perfil</h1>
      <p data-testid="profile-name">Nome: { nameL }</p>
      <p data-testid="profile-email">Email: { emailL }</p>
    </div>
    // <Form size="large">
    //   <Segment stacked>
    //     <Form.Input
    //       data-testid="profile-email"
    //       fluid
    //       icon="mail"
    //       iconPosition="left"
    //       label="Email"
    //       placeholder={ emailL }
    //       name="email"
    //       readonly="true"
    //       readOnly
    //       value={ email }
    //     />
    //     <label>Nome</label>
    //     <input
    //       data-testid="profile-name"
    //       fluid
    //       icon="user"
    //       iconPosition="left"
    //       label="Nome"
    //       placeholder={ nameL }
    //       type="text"
    //       name="name"
    //       readonly="true"
    //       readOnly
    //       value={ name }
    //     />
    //   </Segment>
    // </Form>
  );
};

CustomAdminProfile.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  formDataUpdate: PropTypes.func.isRequired,
};

export default CustomAdminProfile;
