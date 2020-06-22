import React from 'react';
import MobilePrep from '../../components/cook-mode-components/mobile/prep.component';
import MobileCook from '../../components/cook-mode-components/mobile/cook.component';
import MobileReviews from '../../components/cook-mode-components/mobile/reviews.component';
import './cook-mode.styles.scss';
import Data from '../../data/details-1.json';
import { useParams } from 'react-router-dom';
import { ReactComponent as Previous } from '../../assets/previous.svg';
import { ReactComponent as Next } from '../../assets/next.svg';

const CookModePage = () => {
  const { id } = useParams();
  const recipe = Data.find((each) => each.id === +id);

  return (
    <div className='cookmode-container'>
      <div
        className='header-image'
        style={{ backgroundImage: `url(${recipe.image})` }}
      />
      <MobilePrep id={id} />
      <MobileCook id={id} />
      <MobileReviews id={id} />
      <div className='footer'>
        <Previous className='previous' />
        <Next className='next' />
      </div>
    </div>
  );
};

export default CookModePage;
