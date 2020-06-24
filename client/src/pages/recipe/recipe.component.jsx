import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FavoriteBorder } from '@material-ui/icons';

import './recipe.styles.scss';
import { UserContext } from '../../contexts/user.context';
import details from '../../data/details-1.json';
import Header from '../../components/header/header.component';
import BookmarkModal from '../../components/bookmark-modal/bookmark-modal.component';
import Review from '../../components/review/review.component';
import { getReviews } from '../../services/reviews';
import { ReactComponent as Icon } from '../../assets/star.svg';

const RecipeDetail = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const [modal, setModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(UserContext);

  const fetchReviews = async (id) => {
    const response = await getReviews(id);
    console.log(response);
    setReviews(response);
  };

  const fetchReviews = async (id) => {
    const response = await getReviews(id);
    console.log(response);
  };

  useEffect(() => {
    if (window.innerWidth < 600) {
      setTab(1);
    }
    fetchReviews(id);
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
    extendedIngredients
  } = recipe;

  const Recipe = () => (
    <div className='info'>
      <div className='cook-mode'>
        <Link to={`/cookmode/${id}`}>
          <span>COOK MODE</span>
        </Link>
      </div>
      <span className='title'>{title}</span>
      <div className='duration'>
        <span>10 MIN</span>
        <span>{extendedIngredients.length > 3}</span>
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
      <div className='ratings'>
        {reviews.map((each, idx) => (
          <Review key={idx} {...each} />
        ))}
      </div>
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

  const toggleBookmarkModal = () => {
    if (user) {
      setModal(!modal);
    } else {
      console.log('log in');
    }
  };

  return (
    <div className='recipe-component'>
      {modal && <BookmarkModal setModal={setModal} id={id} />}
      <Header>Recipe</Header>
      <div className='recipe-detail'>
        <div className='header' style={{ backgroundImage: `url(${image})` }}>
          <FavoriteBorder
            onClick={toggleBookmarkModal}
            fontSize='large'
            className='favorite'
          />
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
        </div>
        {body}
      </div>
    </div>
  );
};

export default RecipeDetail;
