import React, { useEffect } from 'react';

function Message({ message, closeMessage }) {
  useEffect(() => {
    setTimeout(() => {
      closeMessage();
    }, 3000);
  });
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default Message;
