import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: FunctionComponent = () => {
  return (
    <div className="">
      <h2>Page inexistante</h2>
      <Link to="/">Revenir à l'accueil</Link>
    </div>
  );
};

export default PageNotFound;
