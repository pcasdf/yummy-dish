import React from 'react';
import { useParams } from 'react-router-dom';

import { ReactComponent as Icon } from '../../assets/star.svg';
import Clock from '../../components/clock/clock.component';
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
      <Clock hours='9' minutes='15' className='clock' />
      <div className='header' style={{ backgroundImage: `url(${image})` }} />
      <div className='body'>
        <div className='info'>
          <div className='title label'>{title}</div>
          <div className='duration'>
            Duration
            <Icon className='icon' />
          </div>
          <div className='instructions'>
            <div className='ingredients'>
              <span className='label'>YOU WILL NEED:</span>
              <ul className='ingredient-list'>
                {extendedIngredients.map(({ original }, idx) => (
                  <li key={idx}>{original}</li>
                ))}
              </ul>
            </div>
            <div className='directions'>
              <span className='label'>DIRECTIONS:</span>
              <ol className='direction-list'>
                {analyzedInstructions[0].steps.map(({ step }, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className='story'>
          <span className='label'>STORY</span>
          <span className='summary'>{summary}</span>
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
