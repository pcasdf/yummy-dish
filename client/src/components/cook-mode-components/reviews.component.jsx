import React from 'react';
import { Rating } from '@material-ui/lab/';
import { Star } from '@material-ui/icons';
import { ReactComponent as Heart } from '../../assets/heart.svg';
import Data from '../../data/details-1.json';
import './reviews.styles.scss';

const Reviews = ({ id }) => {
  const recipe = Data.find((each) => each.id === +id);

  return (
    <div className='reviews-container'>
      <div className='content-container'>
        <h1>REVIEW</h1>
        <p>How did it go?</p>
        <div rating-bar>
          <Rating
            className={Rating}
            name='half-rating'
            defaultValue={0}
            precision={0.5}
            emptyIcon={<Star style={{ color: '#fff' }} />}
          />
        </div>
        <textarea placeholder='Write A Review...' rows='2' />
        <button className='add-recipe-button'>
          ADD TO MY RECIPES
          <Heart className='heart-icon' />
        </button>
        <h2>OR</h2>
        <button className='share-button'>SHARE</button>
      </div>
    </div>
  );
};

export default Reviews;
