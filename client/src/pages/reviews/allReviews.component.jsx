import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Rating } from '@material-ui/lab/';

import './allReviews.styles.scss';

import Data from '../../data/details-1.json';
import Header from '../../components/header/header.component';
import { UserContext } from '../../contexts/user.context';
import { updateUser } from '../../services/users';
import {
  getUserReviews,
  deleteReview,
  updateReview
} from '../../services/reviews';

const AllReviews = () => {
  const { user, setUser } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState('');
  const [editReview, setEditReview] = useState(null);
  const [value, setValue] = useState(null);
  const [editCategory, setEditCategory] = useState(false);
  const [editing, setEditing] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');

  const checkReviews = async () => {
    try {
      const allRev = await getUserReviews(user._id);
      setReviews(allRev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      checkReviews();
    }
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (id) => {
    await deleteReview(id);
    checkReviews();
  };

  const handleUpdate = async (e, review) => {
    e.preventDefault();
    if (edit) {
      const updatedReview = { ...editReview, comment: input, rating: value };
      await updateReview(editReview._id, updatedReview);
      setEditReview(null);
      checkReviews();
      setEdit(false);
    } else {
      setEdit(true);
      setEditReview(review);
      setValue(review.rating);
      setInput(review.comment);
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleRatingChange = (e) => {
    setValue(e.target.value);
  };

  const toggleEditCategory = async (category, idx) => {
    if (!editCategory) {
      setEditing(idx);
      setCategoryInput(category);
      setEditCategory(true);
    } else {
      const updatedCategories = [...user.categories];
      updatedCategories[editing] = categoryInput;

      const otherBookmarks = user.bookmarks.filter(
        (item) => item.category !== category
      );
      const categoryBookmarks = user.bookmarks.filter(
        (item) => item.category === category
      );

      let updated = [];
      categoryBookmarks.forEach((item) =>
        updated.push({ ...item, category: categoryInput })
      );
      const updatedBookmarks = [...otherBookmarks, ...updated];

      const updatedUser = {
        ...user,
        categories: updatedCategories,
        bookmarks: updatedBookmarks
      };
      const response = await updateUser(user._id, updatedUser);

      setEditing(null);
      setEditCategory(false);
      setUser(response);
    }
  };

  const handleCategoryInputChange = (event) => {
    setCategoryInput(event.target.value);
  };

  const handleDeleteCategory = async (category) => {
    const updatedUser = {
      ...user,
      categories: user.categories.filter((each) => each !== category)
    };
    const response = await updateUser(user._id, updatedUser);
    setEditing(null);
    setEditCategory(false);
    setUser(response);
  };

  return (
    <div className='user-reviews'>
      <Header>All Reviews</Header>
      <div className='user-body'>
        <div className='reviews'>
          <h3>Reviews</h3>
          {reviews.map((review, idx) => (
            <div className='review'>
              <div className='content'>
                <Link
                  className='link-container'
                  to={`/recipes/${review.recipe}`}
                >
                  {Data.find((item) => item.id === +review.recipe).title}
                </Link>
                {edit && editReview === review && (
                  <>
                    <Rating
                      onChange={handleRatingChange}
                      precision={0.5}
                      value={value}
                    />
                    <input value={input} onChange={handleChange} />
                  </>
                )}
                {editReview !== review && (
                  <>
                    <Rating value={review.rating} precision={0.5} readOnly />
                    <p>{`"${review.comment}"`}</p>
                  </>
                )}
              </div>
              <div className='buttons'>
                <button onClick={(e) => handleUpdate(e, review)}>Update</button>
                <button onClick={() => handleDelete(review._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className='favorites'>
          <h3>Favorites</h3>
          {user &&
            user.categories.map((each, idx) => (
              <div className='bookmark'>
                {editing === idx ? (
                  <input
                    value={categoryInput}
                    onChange={handleCategoryInputChange}
                  />
                ) : (
                  <span className='label'>{each}</span>
                )}
                <span className='buttons'>
                  {editCategory && editing === idx && (
                    <button onClick={() => handleDeleteCategory(each)}>
                      Delete
                    </button>
                  )}
                  <button onClick={() => toggleEditCategory(each, idx)}>
                    Edit
                  </button>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
