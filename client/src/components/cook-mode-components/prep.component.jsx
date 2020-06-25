import React, { useState, useEffect } from 'react';
import Data from '../../data/details-1.json';
import './prep.styles.scss';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import axios from 'axios';
import { FindReplace } from '@material-ui/icons';

const Prep = ({ id }) => {
  const recipe = Data.find((each) => each.id === +id);
  const [substitutes, setSubstitutes] = useState({});
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState();

  const handleSubstitution = async (ingredient) => {
    const response = await axios(
      `https://api.spoonacular.com/food/ingredients/substitutes?apiKey=${process.env.REACT_APP_API_KEY}&ingredientName=${ingredient}`
    );
    console.log(response);
    return response.data;
  };

  const handlePopoverOpen = (ingredient) => {
    let popover;
    if (substitutes[ingredient].status === 'failure') {
      popover = <p>Cannot find substitution for {ingredient}</p>;
    } else {
      popover = (
        <>
          <p>{substitutes[ingredient].message}</p>
          <ol>
            {substitutes[ingredient].substitutes.map((each, idx) => (
              <li key={idx}>{each}</li>
            ))}
          </ol>
        </>
      );
    }

    setPopup(popover);
    console.log(popup);
    setOpen(true);
  };

  const handlePopoverClose = () => {
    setOpen(false);
  };

  const toggleModal = (event) => {
    if (event.target.className === 'modal') {
      setOpen(false);
    }
  };

  useEffect(() => {
    const subs = {};
    recipe.extendedIngredients.forEach(async (item) => {
      subs[item.name] = await handleSubstitution(item.name);
    });
    setSubstitutes(subs);
  }, []);

  console.log(popup);

  return (
    <div className='prep-container'>
      <div className='content-container'>
        <h1>Prep</h1>
        <h2>INGREDIENTS:</h2>
        {open && (
          <div className='modal' onClick={toggleModal}>
            <div className='modal-content'>{popup}</div>
          </div>
        )}
        {recipe.extendedIngredients.map((each, idx) => (
          <div key={idx} className='ingredients'>
            <div className='input-label'>
              <label className='prep-steps-label'>
                <FormControlLabel control={<Checkbox fontSize='small' />} />
                <span className='prep-steps'>
                  {idx + 1 + '.'} {each.original}
                </span>
              </label>
              <FindReplace
                onClick={() => handlePopoverOpen(each.name)}
                onMouseLeave={handlePopoverClose}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Prep;
