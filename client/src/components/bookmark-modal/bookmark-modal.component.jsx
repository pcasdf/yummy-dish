import React, { useState, useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import './bookmark-modal.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { updateUser } from '../../services/users';
import { SnackbarContent } from '@material-ui/core';

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
      if (!user.categories.includes(category)) {
        const updated = { ...user, categories: [...user.categories, category] };
        await updateUser(user._id, updated);
        setUser(updated);
        setCategory('');
      }
    }
  };

  const handleSave = async (each) => {
    console.log(user.bookmarks);
    const prevRecipe = user.bookmarks.filter((item) => item.recipe === id);
    console.log(prevRecipe);
    const existingBookmark = prevRecipe.find((item) => item.category === each);
    if (!existingBookmark) {
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
      console.log('success');
    }
    if (existingBookmark) {
      console.log('already there');
    }
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
          >
            <SnackbarContent
              style={{ backgroundColor: 'rgb(255, 159, 28)', color: 'white' }}
              message='Added to recipe box!'
            />
          </Snackbar>
          <span>My Recipe Box</span>
          {user.categories.length < 10 && (
            <form onSubmit={handleAddCategory}>
              <input
                value={category}
                placeholder='...category'
                onChange={handleChange}
              />
              <button>ADD CATEGORY</button>
            </form>
          )}
          <div className='categories'>
            {user &&
              user.categories.map((each) => (
                <div className='category' onClick={() => handleSave(each)}>
                  {each}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkModal;
