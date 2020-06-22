import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FavoriteBorder } from '@material-ui/icons';

import './recipe.styles.scss';
import Header from '../../components/header/header.component';
import { ReactComponent as Icon } from '../../assets/star.svg';
import { ReactComponent as Chef } from '../../assets/chef.svg';
import { ReactComponent as Clock } from '../../assets/clock.svg';
import details from '../../data/details-1.json';
import BookmarkModal from '../../components/bookmark-modal/bookmark-modal.component';

const RecipeDetail = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 500) {
      setTab(1);
    }
  }, []);

  let tab1, tab2, tab3;
  if (tab === 1) {
    tab1 = '#effbfa';
    tab2 = '#deeaea';
    tab3 = '#deeaea';
  } else if (tab === 2) {
    tab1 = '#deeaea';
    tab2 = '#effbfa';
    tab3 = '#deeaea';
  } else {
    tab1 = '#deeaea';
    tab2 = '#deeaea';
    tab3 = '#effbfa';
  }

  const recipe = details.find((item) => item.id === +id);
  console.log(recipe);

  const {
    title,
    summary,
    analyzedInstructions,
    image,
    extendedIngredients,
    readyInMinutes,
    pricePerServing,
    spoonacularScore
  } = recipe;

  let difficulty;
  if (extendedIngredients.length > 10) {
    difficulty = 'HARD';
  } else if (extendedIngredients.length > 5) {
    difficulty = 'MEDIUM';
  } else {
    difficulty = 'EASY';
  }

  let price;
  if (pricePerServing > 300) {
    price = '$$$';
  } else if (pricePerServing > 100) {
    price = '$$';
  } else {
    price = '$';
  }

  const score = spoonacularScore / 20;

  const Recipe = () => (
    <div className='info'>
      <span className='title'>{title}</span>
      <div className='duration'>
        <span>
          <Clock className='icon' />
          {readyInMinutes}
        </span>
        <span>
          <Chef className='icon' />
          {difficulty}
        </span>
        <span>
          <Icon className='icon' />
          {score} / 5
        </span>
        <span>{price}</span>
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
            {analyzedInstructions[0] &&
              analyzedInstructions[0].steps &&
              analyzedInstructions[0].steps.map(({ step }, idx) => (
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
        <Reviews />
      </>
    );
  } else if (tab === 1) {
    body = (
      <div className='body'>
        <Recipe />
      </div>
    );
  } else if (tab === 2) {
    body = (
      <div className='body'>
        <Story />
      </div>
    );
  } else {
    body = (
      <div className='body'>
        <Reviews />
      </div>
    );
  }

  return (
    <>
      {modal && <BookmarkModal setModal={setModal} id={id} />}
      <div className='header'>
        <Header>Recipe</Header>
      </div>
      <div className='cook-mode'>
        <span>COOK MODE</span>
      </div>
      <div className='recipe-detail'>
        <div
          className='header'
          style={{ backgroundImage: `url(${image})` }}
          onClick={() => setModal(!modal)}
        >
          <FavoriteBorder fontSize='large' className='favorite' />
        </div>
        <div className='tabs'>
          <span style={{ backgroundColor: tab1 }} onClick={() => setTab(1)}>
            RECIPE
          </span>
          <span style={{ backgroundColor: tab2 }} onClick={() => setTab(2)}>
            STORY
          </span>
          <span style={{ backgroundColor: tab3 }} onClick={() => setTab(3)}>
            REVIEW
          </span>
        </div>
        {body}
      </div>
    </>
  );
};

export default RecipeDetail;
