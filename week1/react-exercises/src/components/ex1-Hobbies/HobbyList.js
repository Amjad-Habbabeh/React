import React from 'react';
import Hobbies from './Hobbies';

const hobbies = ['Surfing', 'Rock climbing', 'Mountain biking', 'Breakdancing'];

const hobbyList = () => {
  return (
    <div className="list">
      <h1>Hobbies</h1>
      {<Hobbies hobbies={hobbies} />}
    </div>
  );
};

export default hobbyList;
