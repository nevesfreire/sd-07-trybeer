import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Button, Form, Segment, Checkbox, Divider } from 'semantic-ui-react';

const SignUpForm = ({
  formData: { name, email, password },
  onInputChange,
  onHandleSubmit,
}) => (
  <Form size="large">
    <Segment stacked>
      <Form.Input
        data-testid="signup-name"
        fluid
        placeholder="Name"
        value={name}
        name="name"
        onChange={(e) => onInputChange(e)}
      />
      <Form.Input
        data-testid="signup-email"
        fluid
        placeholder="E-mail address"
        value={email}
        name="email"
        onChange={(e) => onInputChange(e)}
      />
      <Form.Input
        data-testid="signup-password"
        fluid
        placeholder="Password"
        value={password}
        type="password"
        name="password"
        onChange={(e) => onInputChange(e)}
      />
      <Divider ></Divider>
      <Checkbox
        data-testid="signup-seller"
        label="Quero vender"
      />
      <Divider ></Divider>
      <Button
        data-testid="signup-btn"
        color="orange"
        fluid
        size="large"
        onClick={async () => await onHandleSubmit()}
      >
        Cadastrar
      </Button>
    </Segment>
  </Form>
);
export default SignUpForm;
