import React from 'react';
import Header from '../../components/header/header.component';
import Search from '../../components/search-bar/search-bar.component';
import { Link } from 'react-router-dom';
import recipes from '../../data/details-1.json';
import Highlight from '../../components/highlight/highlight.component';
import './homepage.styles.scss';

function Homepage() {
  return (
    <div className="Background">
      {/* <Header />
      <Search /> */}
      <div className="snacks">
        <p className="Welcome-to-Yummy-Dish-Your-place-to-find-Quick-S">
          Welcome to Yummy Dish
          <br />
          Your place to find Quick & Simple Vege-Friendly Recipes.
        </p>
        <div className="Rectangle-110">
          <Link to="/bookmarks">
            <button type="button" className="See-My-Recipe-Box">
              See My Recipe Box!
            </button>
          </Link>
        </div>
      </div>
      <div className="snacksFlexbox">
        {recipes.map(
          (item, idx) =>
            idx < 24 && <Highlight img={item.image} title={item.title} />
        )}
      </div>
    </div>
  );
}
export default Homepage;
