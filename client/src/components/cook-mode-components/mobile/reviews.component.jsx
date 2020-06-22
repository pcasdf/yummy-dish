import React from 'react';
import { Rating } from '@material-ui/lab/';
import { StarBorder, Favorite } from '@material-ui/icons';
import { TextField } from '@material-ui/core';
import Data from '../../../data/details-1.json';
import './reviews.styles.scss';

const MobileReviews = ({ id }) => {
  const recipe = Data.find((each) => each.id === +id);

  return (
    <div className='reviews-container'>
      <h1>REVIEW</h1>
      <p>How did it go?</p>
      <div rating-bar>
        <Rating
          name='half-rating'
          defaultValue={0}
          precision={0.5}
          emptyIcon={<StarBorder />}
        />
      </div>
      <TextField
        id='outlined-multiline-static'
        className='textfield'
        label='Write a Review...'
        multiline
        rows={2}
        variant='outlined'
      />
      <button className='add-recipe-button'>
        ADD TO MY RECIPES
        <span className='favorite-icon'>
          <Favorite fontSize='inherit' style={{ color: '#fff' }} />
        </span>
      </button>
      <h3>OR </h3>
      <button className='share-button'>SHARE</button>
    </div>
  );
};

export default MobileReviews;
