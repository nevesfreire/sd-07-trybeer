import React from 'react';
import Message from '../components/Message';

function MessageSuccess(response) {
  if (response === undefined) {
    return (
      <div className="success-message">
         <Message />
      </div>
    );
  }
}

export default MessageSuccess;
