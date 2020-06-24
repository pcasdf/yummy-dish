import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import '../search/search.styles.scss';
import { Link } from 'react-router-dom';
import recipes from '../../data/details-1.json';
import Highlight from '../../components/highlight/highlight.component';
import './homepage.styles.scss';
import { Search } from '@material-ui/icons';
import { InputBase, Paper } from '@material-ui/core/';

function Homepage() {
  const { push } = useHistory();
  return (
    <div className='background'>
      <div className='search-bar'>
        <Paper
          onClick={() => push('/search')}
          component='form'
          className='search-wrapper'
        >
          <Search fontSize='small' />
          <InputBase placeholder='Search in your recipes' />
        </Paper>
      </div>
      <Header>Yummy Dish</Header>
      <div className='snacks'>
        <div className='paragraph'>
          <p>
            Welcome to Yummy Dish
            <br />
            Your place to find Quick & Simple Vege-Friendly Recipes.
          </p>
        </div>
        <div className='infographic'>
          <Link to='/bookmarks'>
            <button type='button' className='See-My-Recipe-Button'>
              See My Recipe Box!
            </button>
          </Link>
        </div>
      </div>
      <div className='scroller'>
        {recipes.map(
          (item, idx) =>
            idx < 24 && (
              <Highlight id={item.id} img={item.image} title={item.title} />
            )
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Homepage;
