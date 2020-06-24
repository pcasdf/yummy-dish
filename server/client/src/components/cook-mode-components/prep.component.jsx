import React, { useState } from 'react';
import Data from '../../data/details-1.json';
import './prep.styles.scss';

const Prep = ({ id }) => {
  // const [ingredients, setIngredients] = useState({});
  const recipe = Data.find((each) => each.id === +id);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setIngredients({
  //     [name]: value
  //   });
  //   console.log(ingredients);
  // };

  return (
    <div className='prep-container'>
      <div className='content-container'>
        <h1>Prep</h1>
        <h3>Ingredients:</h3>
        {recipe.extendedIngredients.map((each, idx) => (
          <div key={idx} className='ingredients'>
            <div className='input-label'>
              <input
                className='prep-steps-checkbox'
                name={idx}
                // onChange={handleChange}
                type='checkbox'
                id={each.name}
                // value={ingredients[idx]}
              />
              <label className='prep-steps-label' htmlFor={each.name}>
                <span className='number'>{idx + 1}. </span>{' '}
                <span> {each.original}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prep;
