import React from 'react';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import Search from '../search/search.component'
import '../search/search.styles.scss'
import { Link, useLocation } from 'react-router-dom';
import recipes from '../../data/details-1.json';
import Highlight from '../../components/highlight/highlight.component';
import './homepage.styles.scss';

// function usePageViews() 
//   let location = useLocation();


function Homepage() {
  return (
            <div className='Background'>
      <Header>Yummy Dish</Header>
      <div className='SearchBarBox'>
          <Search />
        </div>
          <div className='snacks'>
            <p className='Welcome-to-Yummy-Dish-Your-place-to-find-Quick-S'>
              Welcome to Yummy Dish
          <br />
          Your place to find Quick & Simple Vege-Friendly Recipes.
        </p>
            <div className='Rectangle-110'>
              <Link to='/bookmarks'>
                <button type='button' className='See-My-Recipe-Button'>
                  See My Recipe Box!
            </button>
              </Link>
            </div>
          </div>
          <div className='snacksFlexbox'>
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
