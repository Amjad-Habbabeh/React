import React from 'react';
import Hobbies from './Hobbies';

const hobbies = ['Surfing', 'Rock climbing', 'Mountain biking', 'Breakdancing'];

const hobbyList = () => {
  return (
    <div className="list">
      <h1>Hobbies</h1>
      <ul>{<Hobbies hobbies={hobbies} />}</ul>
    </div>
  );
};

export default hobbyList;
