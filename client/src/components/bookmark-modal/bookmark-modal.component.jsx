import React, { useState, useContext } from 'react';

import './bookmark-modal.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { updateUser } from '../../services/users';

const BookmarkModal = ({ setModal, id }) => {
  const [category, setCategory] = useState('');
  const { user, setUser } = useContext(UserContext);

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
    const updated = { ...user, categories: [...user.categories, category] };
    await updateUser(user._id, updated);
    setUser(updated);
    setCategory('');
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
    console.log(response);
  };

  return (
    <div className='bookmark-modal'>
      <div className='modal' onClick={toggleModal}>
        <div className='modal-content'>
          <span>ADD TO MY RECIPE BOX</span>
          <form onSubmit={handleAddCategory}>
            <input value={category} onChange={handleChange} />
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
