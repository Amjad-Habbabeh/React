import React from 'react';
import Hobby from './Hobby';
import { v4 as uuidv4 } from 'uuid';

function Hobbies({ hobbies }) {
  return (
    <div>
      {hobbies.map((hobby) => {
        return <Hobby hobby={hobby} key={uuidv4()} />;
      })}
    </div>
  );
}
export default Hobbies;
