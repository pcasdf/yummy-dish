import React, { useState } from 'react';
import Data from '../../../data/details-1.json';

const MobilePrep = ({ id }) => {
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
    <>
      <h1>Prep</h1>
      <legend>Preparation Steps</legend>
      {recipe.extendedIngredients.map((each, idx) => (
        <div key={idx} className='ingredient'>
          <input
            className='prep-steps-checkbox'
            name={idx}
            // onChange={handleChange}
            type='checkbox'
            id={each.name}
            // value={ingredients[idx]}
          />
          <label className='prep-steps-label' htmlFor={each.name}>
            {idx + 1}. {each.original}
          </label>
        </div>
      ))}
    </>
  );
};

export default MobilePrep;
