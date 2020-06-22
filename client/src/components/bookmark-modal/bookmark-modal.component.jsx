import React, { useState, useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import './bookmark-modal.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { updateUser } from '../../services/users';

const BookmarkModal = ({ setModal, id }) => {
  const [category, setCategory] = useState('');
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const toggleModal = (event) => {
    if (event.target.className === 'modal') {
      setModal(false);
    }
  };

  const handleAddCategory = async (event) => {
    event.preventDefault();
    if (category.length > 3) {
      const updated = { ...user, categories: [...user.categories, category] };
      await updateUser(user._id, updated);
      setUser(updated);
      setCategory('');
    }
  };

  const handleSave = async (each) => {
    const updated = {
      ...user,
      bookmarks: [
        ...user.bookmarks,
        {
          recipe: id,
          category: each
        }
      ]
    };
    const response = await updateUser(user._id, updated);
    setUser(updated);
    setOpen(true);
    console.log(response);
  };

  return (
    <div className='bookmark-modal'>
      <div className='modal' onClick={toggleModal}>
        <div className='modal-content'>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(!open)}
            message='Added to recipe box!'
            action={
              <React.Fragment>
                <IconButton
                  size='small'
                  aria-label='close'
                  color='inherit'
                  onClick={() => setOpen(!open)}
                />
              </React.Fragment>
            }
          />
          <span>ADD TO MY RECIPE BOX</span>
          <form onSubmit={handleAddCategory}>
            <input
              value={category}
              placeholder='Add a category'
              onChange={handleChange}
            />
            <button>ADD CATEGORY</button>
          </form>
          <div className='categories'>
            {user &&
              user.categories.map((each) => (
                <div onClick={() => handleSave(each)}>{each}</div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkModal;
