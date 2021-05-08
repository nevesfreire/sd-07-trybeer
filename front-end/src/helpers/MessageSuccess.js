import React from 'react';

function MessageSuccess(response) {
  if (response === undefined) {
    console.log('minha resposta: ', response);
    return (
      <h2 className="success-message">Já existe um usuário com esse e-mail.</h2>
    );
  }
}

export default MessageSuccess;
