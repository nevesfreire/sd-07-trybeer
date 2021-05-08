import React from 'react';

import { Form, Card } from 'react-bulma-components';

const { Control, Field } = Form;

function Header() {
  return (
    <div>
      <Card>
        <Card.Content>
          <Field>
            <Control>Header</Control>
          </Field>
        </Card.Content>
      </Card>
    </div>
  );
}

export default Header;
