import React from 'react';
import { useParams } from 'react-router-dom';

import { ReactComponent as Icon } from '../../assets/star.svg';
import details from '../../data/details-1.json';
import './recipe.styles.scss';

const RecipeDetail = () => {
  const { id } = useParams();

  const recipe = details.find((item) => item.id === +id);

  const {
    title,
    summary,
    analyzedInstructions,
    image,
    extendedIngredients
  } = recipe;

  console.log(recipe);

  return (
    <div className='recipe-detail'>
      <div className='header' style={{ backgroundImage: `url(${image})` }} />
      <div className='body'>
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
        <div className='story'>
          <span className='label'>STORY</span>
          <div
            className='summary'
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </div>
      </div>
      <div className='reviews'>
        <span className='label'>REVIEWS</span>
        <div className='ratings'></div>
      </div>
    </div>
  );
};

export default RecipeDetail;
