import React, { useState, useEffect } from 'react';

import { Form, Button } from 'react-bulma-components';

const { Control, Field } = Form;

function ProductCard() {
  return (<>
    <div className="card">
      <div className="card-content">
        <Field>
          <Control>
            <p>TESTE</p>
          </Control>
        </Field>
      </div>
    </div>
  </>)
};

export default ProductCard;