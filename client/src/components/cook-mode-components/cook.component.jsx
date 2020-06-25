import React, { useState, useContext, useEffect } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import Data from '../../data/details-1.json';
import './cook.styles.scss';
import { updateUser } from '../../services/users';
import { UserContext } from '../../contexts/user.context';
import { ReactComponent as Edit } from '../../assets/edit.svg';
const Cook = ({ id }) => {
  const recipe = Data.find((each) => each.id === +id);
  const { user, setUser } = useContext(UserContext);
  const [editing, setIsEditing] = useState(false);
  const [instructions, setInstructions] = useState(
    recipe.analyzedInstructions[0].steps
  );
  useEffect(() => {
    let userSteps;
    if (user) {
      userSteps = user.edits.find((item) => item.recipeId === id);
    }
    if (userSteps) {
      setInstructions(userSteps.edit);
    }
  }, [user]);
  const customSteps = [
    'Chop everything up.',
    'Cook them however you want.',
    'Hope for the best.',
    'Enjoy?'
  ];
  const handleEdit = async () => {
    if (!editing) {
      setIsEditing(true);
    } else {
      const response = await updateUser(user._id, {
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
  return (
    <div className='cook-container'>
      <div className='content-container'>
        <h1>Cook</h1>
        <h3 onClick={handleEdit}>
          MAKE IT YOUR OWN! <Edit className='edit-icon' />
        </h3>
        <h2>DIRECTIONS:</h2>
        {editing &&
          instructions.map((each, idx) => (
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
          : !editing && (
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
