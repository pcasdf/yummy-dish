import React from 'react';
import { Edit } from '@material-ui/icons';
import Data from '../../../data/details-1.json';

const MobileCook = ({ id }) => {
  const recipe = Data.find((each) => each.id === +id);
  console.log(recipe.analyzedInstructions[0].steps);
  return (
    <>
      <h1>Cook</h1>
      <h3>MAKE IT YOUR OWN!</h3>
      <Edit style={{ width: '10px' }} />
      <h2>DIRECTIONS:</h2>
      {recipe.analyzedInstructions[0].steps.map((each) => (
        <>
          <input type='checkbox' className='cook-steps-checkbox' />
          <label htmlFor='' className='cook-steps-label'>
            {each.number}. {each.step}
          </label>
        </>
      ))}
    </>
  );
};

export default MobileCook;
