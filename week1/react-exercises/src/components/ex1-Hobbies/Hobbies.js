import React from 'react';
import Hobby from './Hobby';

function Hobbies({ hobbies }) {
  return (
    <div>
      {hobbies.map((hobby) => {
        return <Hobby hobby={hobby} />;
      })}
    </div>
  );
}
export default Hobbies;
