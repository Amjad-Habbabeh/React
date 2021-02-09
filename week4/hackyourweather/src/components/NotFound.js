import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <p>Soory !! we couldn't find this page!</p>
      <Link to="/">go to the home page</Link>
    </div>
  );
};

export default NotFound;
