import React, { useState, useEffect, useContext } from 'react';
import Data from '../../data/details-1.json';
import './prep.styles.scss';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import axios from 'axios';
import { ThemeContext } from '../../contexts/theme.context';


const Prep = ({ id }) => {
  const recipe = Data.find((each) => each.id === +id);
  const [substitution, setSubstitution] = useState('');

  useEffect(() => {
    const getSubstitutions = async () => {
      // const response = await axios(process.env.REACT_APP_API_KEY);
    };
    getSubstitutions();
  }, []);
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme.prepBG }} className='prep-container'>
      <div style={{ color: theme.recipeText }} className='content-container'>
        <h1>Prep</h1>
        <h2>INGREDIENTS:</h2>
        {recipe.extendedIngredients.map((each, idx) => (
          <div key={idx} className='ingredients'>
            <div className='input-label'>
              <label className='prep-steps-label'>
                <FormControlLabel
                  control={<Checkbox fontSize='small' color='primary' />}
                  style={{ padding: '0', margin: '0' }}
                />
                <span className='prep-steps'>
                  {idx + 1 + '.'} {each.original}
                </span>
                <span className='substitution'>{substitution}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Prep;
