import React from 'react';
import { ReactComponent as Edit } from '../../assets/edit.svg';
import Data from '../../data/details-1.json';
import './cook.styles.scss';
import { FormControlLabel, Checkbox } from '@material-ui/core';
const Cook = ({ id }) => {
  const recipe = Data.find((each) => each.id === +id);
  const customSteps = [
    '1. Chop everything up.',
    '2. Cook them however you want.',
    '3. Hope for the best.'
  ];
  return (
    <div className='cook-container'>
      <div className='content-container'>
        <h1>Cook</h1>
        <h3>
          MAKE IT YOUR OWN! <Edit className='edit-icon' />
        </h3>
        <h2>DIRECTIONS:</h2>
        {recipe.analyzedInstructions[0] ? (
          recipe.analyzedInstructions[0].steps.map((each) => (
            <div key={each.number} className='directions'>
              <div className='input-label'>
                <label className='cook-steps-label'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        fontSize='small'
                        color='primary'
                        style={{ padding: 0 }}
                      />
                    }
                  />
                  <span className='cook-steps'>
                    {each.number + '.'} {each.step}
                  </span>
                </label>
              </div>
            </div>
          ))
        ) : (
          <div className='directions'>
            {customSteps.map((item, idx) => (
              <div key={idx} className='directions'>
                <div className='input-label'>
                  <FormControlLabel
                    control={<Checkbox color='primary' />}
                    style={{ padding: 0 }}
                  />
                  <span className='cook-steps'>{item}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Cook;
