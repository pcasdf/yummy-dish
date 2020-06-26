import React, { useState, useEffect, useContext } from 'react';
import Prep from '../../components/cook-mode-components/prep.component';
import Cook from '../../components/cook-mode-components//cook.component';
import Reviews from '../../components/cook-mode-components/reviews.component';
import Header from '../../components/header/header.component';
import './cook-mode.styles.scss';
import Data from '../../data/details-1.json';
import { useParams, Link } from 'react-router-dom';
import { ReactComponent as Previous } from '../../assets/previous.svg';
import { ReactComponent as Next } from '../../assets/next.svg';
import { ThemeContext } from '../../contexts/theme.context';

const CookModePage = () => {
  const { id } = useParams();
  const recipe = Data.find((each) => each.id === +id);
  const [steps, setSteps] = useState({
    prep: true,
    cook: true,
    review: true
  });
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSteps({
        prep: true,
        cook: false,
        review: false
      });
    }
  }, [window.innerWidth]);
  const handlePreviousClick = (e) => {
    e.preventDefault();
    if (steps.cook) {
      setSteps({
        prep: true,
        cook: false,
        review: false
      });
    } else if (steps.review) {
      setSteps({
        prep: false,
        cook: true,
        review: false
      });
    }
  };
  const handleNextClick = (e) => {
    e.preventDefault();
    if (steps.prep) {
      setSteps({
        prep: false,
        cook: true,
        review: false
      });
    } else if (steps.cook) {
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
  let footerColor;
  if (steps.review && steps.prep && steps.cook) {
    body = (
      <div className='desktop-view'>
        <div className='desktop-prep'>
          <Prep id={id} />
        </div>
        <div className='desktop-cook'>
          <Cook id={id} />
        </div>
        <div className='desktop-review'>
          <Reviews id={id} />
        </div>
      </div>
    );
    previous = (
      <p>
        <Link to={`/recipes/${id}`}>Recipe</Link>
      </p>
    );
    next = (
      <p>
        <Link to='/'>Return Home</Link>
      </p>
    );
  } else if (steps.cook) {
    footerColor = '#709f7c';
    body = <Cook id={id} />;
    previous = <p>Prep</p>;
    next = <p>Skip to Review</p>;
  } else if (steps.review) {
    footerColor = '#ff9f1c';
    body = <Reviews id={id} />;
    previous = <p>Back to Cook</p>;
    next = (
      <p>
        <Link to='/'>Return Home</Link>
      </p>
    );
  } else if (steps.prep) {
    body = <Prep id={id} />;
    previous = (
      <p>
        <Link to={`/recipes/${id}`}>Recipe</Link>
      </p>
    );
    next = <p>Skip to Cook</p>;
    footerColor = '#2ec4b6';
  }
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Header>Cook Mode</Header>
      <div  className='cookmode-container'>
        <div
          className='header-image'
          style={{ backgroundImage: `url(${recipe.image})` }}
        />
        <div className='body'>{body}</div>
        <div className='footer' style={{ backgroundColor: theme.cookModeFooter }}>
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
    </>
  );
};
export default CookModePage;
