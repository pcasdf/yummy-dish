import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FavoriteBorder, Timer, AttachMoney } from '@material-ui/icons';

import './recipe.styles.scss';
import { UserContext } from '../../contexts/user.context';
import details from '../../data/details-1.json';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';

import BookmarkModal from '../../components/bookmark-modal/bookmark-modal.component';
import Review from '../../components/review/review.component';
import { getReviews } from '../../services/reviews';
import { ReactComponent as Icon } from '../../assets/star.svg';
import { ReactComponent as ChefIcon } from '../../assets/chef.svg';
import { ThemeContext } from '../../contexts/theme.context';

const RecipeDetail = () => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);
  const [modal, setModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(UserContext);

  const fetchReviews = async (id) => {
    const response = await getReviews(id);
    if (response) {
      setReviews(response);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 600) {
      setTab(1);
    }
    fetchReviews(id);
    // eslint-disable-next-line
  }, []);

  let tab1, tab2, tab3;
  if (tab === 1) {
    tab1 = '#effbfa';
    tab2 = '#deeaea';
    tab3 = '#deeaea';
  } else if (tab === 2) {
    tab1 = '#deeaea';
    tab2 = '#def6f4';
    tab3 = '#deeaea';
  } else {
    tab1 = '#deeaea';
    tab2 = '#deeaea';
    tab3 = '#def6f4';
  }

  const recipe = details.find((item) => item.id === +id);

  const {
    title,
    summary,
    analyzedInstructions,
    image,
    extendedIngredients,
    readyInMinutes,
    pricePerServing
  } = recipe;

  let difficulty;
  if (extendedIngredients.length > 10) {
    difficulty = 'Hard';
  } else if (extendedIngredients.length > 5) {
    difficulty = 'Medium';
  } else {
    difficulty = 'Easy';
  }

  let cost;
  if (pricePerServing > 300) {
    cost = 3;
  } else if (pricePerServing > 100) {
    cost = 2;
  } else {
    cost = 1;
  }

  const Recipe = () => (
    <div style={{ background: theme.background }} className='info'>
      <div className='cook-mode'>
        <Link to={`/cookmode/${id}`}>
          <p>COOK MODE</p>
        </Link>
      </div>
      <div className='print-directions' onClick={() => window.print()}>
        <Link>Print Directions</Link>
      </div>
      <span style={{ color: theme.recipeText }} className='title'>
        {title}
      </span>
      <div className='duration'>
        <div className='length'>
          <Timer />
          <span style={{ color: theme.recipeText }}>{readyInMinutes} min.</span>
        </div>
        <div className='difficulty'>
          <ChefIcon className='icon' />
          <span style={{ color: theme.recipeText }}>{difficulty}</span>
        </div>
        <div className='stars'>
          <Icon className='icon' />
        </div>
        <div className='cost'>
          {[...Array(cost)].map((each, idx) => (
            <AttachMoney key={idx} />
          ))}
        </div>
      </div>
      <div className='instructions'>
        <div>
          <span style={{ color: theme.recipeText }}>YOU WILL NEED:</span>
          <ul className='ingredient-list'>
            {extendedIngredients.map(({ original }, idx) => (
              <li key={idx}>{original}</li>
            ))}
          </ul>
        </div>
        <div>
          <span style={{ color: theme.recipeText }}>DIRECTIONS:</span>
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
    <div style={{ background: theme.background }} className='story'>
      <span style={{ color: theme.recipeText }} className='label'>
        STORY
      </span>
      <div className='summary' dangerouslySetInnerHTML={{ __html: summary }} />
    </div>
  );

  const Reviews = () => (
    <div
      style={{ background: theme.background, color: theme.recipeText }}
      className='reviews'
    >
      <span style={{ color: theme.recipeText }} className='label'>
        REVIEWS
      </span>
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
    }
  };
  const { theme } = useContext(ThemeContext);

  return (
    <div className='recipe-component'>
      {modal && <BookmarkModal setModal={setModal} id={id} />}
      <Header>Recipe</Header>
      <div style={{ color: theme.recipeText }} className='recipe-detail'>
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
              REVIEWS
            </span>
          </div>
        </div>
        {body}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RecipeDetail;
