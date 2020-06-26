import React, { useState, useEffect, useContext } from 'react';
import Data from '../../data/details-1.json';
import './prep.styles.scss';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import axios from 'axios';
import { FindReplace } from '@material-ui/icons';
import { ThemeContext } from '../../contexts/theme.context';

const Prep = ({ id }) => {
  const recipe = Data.find((each) => each.id === +id);
  const [substitutes, setSubstitutes] = useState({});
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState();

  const handleSubstitution = async (ingredient) => {
    const response = await axios(
      `https://api.spoonacular.com/food/ingredients/substitutes?apiKey=${process.env.REACT_APP_API_KEY}&ingredientName=${ingredient}`
    );
    return response.data;
  };

  const handlePopoverOpen = (ingredient) => {
    let popover;
    if (substitutes[ingredient].status === 'failure') {
      popover = <p>Cannot find substitutions for {ingredient}</p>;
    } else {
      popover = (
        <>
          <p>Substitutions for {ingredient}</p>
          <ol>
            {substitutes[ingredient].substitutes.map((each, idx) => (
              <li key={idx}>{each}</li>
            ))}
          </ol>
        </>
      );
    }

    setPopup(popover);
    setOpen(true);
  };

  const toggleModal = (e) => {
    if (e.target.className !== 'modal-content') {
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
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme.prepBG }} className='prep-container'>
      <div style={{ color: theme.recipeText }} className='content-container'>
        {open && (
          <div className='modal' onClick={toggleModal}>
            <div className='modal-content'>{popup}</div>
          </div>
        )}
        <div className='content-container'>
          <h1>Prep</h1>
          <h2>INGREDIENTS:</h2>

          {recipe.extendedIngredients.map((each, idx) => (
            <div key={idx} className='ingredients'>
              <div className='input-label'>
                <label className='prep-steps-label'>
                  <FormControlLabel control={<Checkbox fontSize='small' />} />
                  <span className='prep-steps'>
                    {idx + 1 + '.'} {each.original}
                  </span>
                </label>
                <FindReplace onClick={() => handlePopoverOpen(each.name)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Prep;
