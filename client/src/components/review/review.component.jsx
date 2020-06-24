import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Star } from '@material-ui/icons';

import './review.styles.scss';

const Review = ({ comment, rating, fullName }) => (
  <div className='review-block'>
    <div className='stars'>
      <Rating
        value={rating}
        precision={0.5}
        emptyIcon={<Star style={{ color: '#fff' }} />}
        readOnly
      />
    </div>
    <div className='comments'>"{comment}"</div>
    <div className='author'>- {fullName}</div>
  </div>
);

export default Review;
