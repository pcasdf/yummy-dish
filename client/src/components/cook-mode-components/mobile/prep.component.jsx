import React, { useContext } from 'react';
import Data from '../../../data/details-1.json';

const MobilePrep = () => {
  return (
    <>
      <h1>Prep</h1>
      <h6>Preparation Steps</h6>
      {Data[0].extendedIngredients.map((each) => (
        <div className='ingredient'>
          <input type='checkbox' id={each.name} value={each.name} />
          <label for={each.name}>{each.original}</label>
        </div>
      ))}
    </>
  );
};

export default MobilePrep;
