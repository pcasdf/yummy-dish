import React, { useState } from 'react';
import MobilePrep from '../../components/cook-mode-components/mobile/prep.component';
import MobileCook from '../../components/cook-mode-components/mobile/cook.component';
import MobileReviews from '../../components/cook-mode-components/mobile/reviews.component';
import './cook-mode.styles.scss';
import Data from '../../data/details-1.json';
import { useParams, Link } from 'react-router-dom';
import { ReactComponent as Previous } from '../../assets/previous.svg';
import { ReactComponent as Next } from '../../assets/next.svg';

const CookModePage = () => {
  const { id } = useParams();
  const recipe = Data.find((each) => each.id === +id);
  const [steps, setSteps] = useState({
    prep: true,
    cook: false,
    review: false
  });
  const handlePreviousClick = (e) => {
    e.preventDefault();
    if (steps.cook === true) {
      setSteps({
        prep: true,
        cook: false,
        review: false
      });
    } else if (steps.review === true) {
      setSteps({
        prep: false,
        cook: true,
        review: false
      });
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (steps.prep === true) {
      setSteps({
        prep: false,
        cook: true,
        review: false
      });
    } else if (steps.cook === true) {
      setSteps({
        prep: false,
        cook: false,
        review: true
      });
    }
  };
  let body;
  let previous;
  let next;
  if (steps.prep === true) {
    body = <MobilePrep id={id} />;
    previous = (
      <p>
        <Link to={`/recipes/${id}`}>Recipe</Link>
      </p>
    );
    next = <p>Skip to Cook</p>;
  } else if (steps.cook === true) {
    body = <MobileCook id={id} />;
    previous = <p>Prep</p>;
    next = <p>Skip to Review</p>;
  } else if (steps.review === true) {
    body = <MobileReviews id={id} />;
    previous = <p>Back to Cook</p>;
    next = <Link to='/'>Return Home</Link>;
  }

  return (
    <div className='cookmode-container'>
      <div
        className='header-image'
        style={{ backgroundImage: `url(${recipe.image})` }}
      />

      {body}
      <div className='footer'>
        <div className='left' onClick={handlePreviousClick}>
          <Previous className='previous' />
          {previous}
        </div>
        <div className='right' onClick={handleNextClick}>
          <Next className='next' />
          {next}
        </div>
      </div>
    </div>
  );
};

export default CookModePage;
