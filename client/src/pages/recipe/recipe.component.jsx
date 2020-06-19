import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ReactComponent as Icon } from '../../assets/star.svg';
import details from '../../data/details-1.json';
import './recipe.styles.scss';

const RecipeDetail = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);

  const recipe = details.find((item) => item.id === +id);

  const {
    title,
    summary,
    analyzedInstructions,
    image,
    extendedIngredients
  } = recipe;

  const Recipe = () => (
    <div className='info'>
      <span className='title'>{title}</span>
      <div className='duration'>
        <span>10 MIN</span>
        <span>Easy</span>
        <Icon className='icon' />
        <span>$$$</span>
      </div>
      <div className='instructions'>
        <div>
          <span>YOU WILL NEED:</span>
          <ul className='ingredient-list'>
            {extendedIngredients.map(({ original }, idx) => (
              <li key={idx}>{original}</li>
            ))}
          </ul>
        </div>
        <div>
          <span>DIRECTIONS:</span>
          <ol>
            {analyzedInstructions[0].steps.map(({ step }, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );

  const Story = () => (
    <div className='story'>
      <span className='label'>STORY</span>
      <div className='summary' dangerouslySetInnerHTML={{ __html: summary }} />
    </div>
  );

  const Reviews = () => (
    <div className='reviews'>
      <span className='label'>REVIEWS</span>
      <div className='ratings'></div>
    </div>
  );

  let body;

  if (tab === 0) {
    body = (
      <>
        <div className='body'>
          <Recipe />
          <Story />
        </div>
      </>
    );
  } else if (tab === 1) {
    body = <Recipe />;
  } else if (tab === 2) {
    body = <Story />;
  } else {
    body = <Reviews />;
  }

  return (
    <div className='recipe-detail'>
      <div className='header' style={{ backgroundImage: `url(${image})` }} />
      <div className='tabs'>
        <span onClick={() => setTab(1)}>RECIPE</span>
        <span onClick={() => setTab(2)}>STORY</span>
        <span onClick={() => setTab(3)}>REVIEW</span>
      </div>
      <div>{body}</div>
    </div>
  );
};

export default RecipeDetail;
