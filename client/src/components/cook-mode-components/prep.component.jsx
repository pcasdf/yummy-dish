import React, { useState } from 'react';
import Data from '../../data/details-1.json';
import './prep.styles.scss';
import { FormControlLabel, Checkbox } from '@material-ui/core';

const Prep = ({ id }) => {
  const recipe = Data.find((each) => each.id === +id);

  return (
    <div className='prep-container'>
      <div className='content-container'>
        <h1>Prep</h1>
        <h2>INGREDIENTS:</h2>
        {recipe.extendedIngredients.map((each, idx) => (
          <div key={idx} className='ingredients'>
            <div className='input-label'>
              <FormControlLabel
                control={<Checkbox color='primary' />}
                label={idx + 1 + '.'}
              />
              <label className='prep-steps-label'>
                <span className='prep-steps'> {each.original}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prep;
