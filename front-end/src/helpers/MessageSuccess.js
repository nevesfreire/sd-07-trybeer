import React from 'react';

function MessageSuccess(response) {
  if (response === undefined) {
    return (
      <span className="success-message">Já existe um usuário com esse e-mail.</span>
    );
  }
}

export default MessageSuccess;
