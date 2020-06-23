import React from 'react';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import Data from '../../data/details-1.json';
import './cook.styles.scss';

const Cook = ({ id }) => {
  const recipe = Data.find((each) => each.id === +id);
  console.log(recipe.analyzedInstructions[0].steps);
  return (
    <div className='cook-container'>
      <div className='content-container'>
        <h1>Cook</h1>
        <h3>
          MAKE IT YOUR OWN! <Edit className='edit-icon' />
        </h3>
        <h2>DIRECTIONS:</h2>
        {recipe.analyzedInstructions[0].steps.map((each) => (
          <div className='directions'>
            <div className='input-label'>
              <input type='checkbox' className='cook-steps-checkbox' />
              <label htmlFor='' className='cook-steps-label'>
                <span>
                  {each.number}. {each.step}
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cook;