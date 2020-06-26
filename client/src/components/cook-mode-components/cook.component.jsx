import React, { useState, useContext, useEffect } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

import Data from '../../data/details-1.json';
import './cook.styles.scss';

import { ReactComponent as Edit } from '../../assets/edit.svg';
import { updateUser } from '../../services/users';
import { UserContext } from '../../contexts/user.context';
import { ThemeContext } from '../../contexts/theme.context';

const Cook = ({ id }) => {
  const recipe = Data.find((each) => each.id === +id);
  const { user } = useContext(UserContext);
  const [editing, setIsEditing] = useState(false);
  const [instructions, setInstructions] = useState(null);

  useEffect(() => {
    if (recipe.analyzedInstructions[0]) {
      setInstructions(recipe.analyzedInstructions[0].steps);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let userSteps;
    if (user) {
      userSteps = user.edits.find((item) => item.recipeId === id);
    }
    if (userSteps) {
      setInstructions(userSteps.edit);
    }
    // eslint-disable-next-line
  }, [user]);

  const customSteps = [
    'Chop everything up.',
    'Cook them however you want.',
    'Hope for the best.',
    'Enjoy?'
  ];

  const handleEdit = async (event) => {
    event.preventDefault();
    if (!editing) {
      setIsEditing(true);
    } else {
      await updateUser(user._id, {
        ...user,
        edits: [
          ...user.edits.filter((item) => item.recipeId !== id),
          { recipeId: id, edit: instructions }
        ]
      });
      setIsEditing(false);
    }
  };

  const handleChange = (event, idx) => {
    const newSteps = [...instructions];
    newSteps.splice(idx, 1, {
      number: instructions[idx].number,
      step: event.target.value
    });
    setInstructions(newSteps);
  };
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme.cookBG }} className='cook-container'>
      <div className='content-container'>
        <h1>Cook</h1>
        <h3 onClick={handleEdit}>
          MAKE IT YOUR OWN! <Edit className='edit-icon' />
        </h3>
        <h2>DIRECTIONS:</h2>
        {editing && (
          <form onSubmit={handleEdit}>
            {instructions.map((each, idx) => (
              <div key={idx} className='directions'>
                <div className='input-label'>
                  <label className='cooks-steps-label'>
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
                      {idx + 1 + '.'}
                      <input
                        key={idx}
                        value={instructions[idx].step}
                        onChange={(event) => handleChange(event, idx)}
                      />
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </form>
        )}
        {!editing && instructions
          ? instructions.map((each) => (
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
          : !editing &&
            customSteps.map((item, idx) => (
              <div key={idx} className='directions'>
                <div className='input-label'>
                  <label className='cook-steps-label'>
                    <FormControlLabel
                      control={<Checkbox color='primary' />}
                      style={{ padding: 0 }}
                    />
                    <span className='cook-steps'>{item}</span>
                  </label>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Cook;
