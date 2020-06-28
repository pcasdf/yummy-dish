import React, { useContext, useState } from 'react';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import '../search/search.styles.scss';
import { Link, useHistory } from 'react-router-dom';
import recipes from '../../data/details-1.json';
import Highlight from '../../components/highlight/highlight.component';
import './homepage.styles.scss';
import { Search } from '@material-ui/icons';
import { InputBase, Paper } from '@material-ui/core/';
import { ThemeContext } from '../../contexts/theme.context';
import { UserContext } from '../../contexts/user.context';

function Homepage() {
  const { theme } = useContext(ThemeContext);
  const { setTags } = useContext(UserContext);
  const [input, setInput] = useState('');
  const { push } = useHistory();

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTags(input);
    push('/search');
  };

  return (
    <div style={{ background: theme.background }} className='background'>
      <div style={{ background: theme.background }} className='search-bar'>
        <Paper component='form' className='search-wrapper'>
          <Search fontSize='small' onClick={handleSubmit} />
          <InputBase
            placeholder='Search in your recipes'
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Paper>
      </div>
      <Header>Yummy Dish</Header>
      <div style={{ background: theme.snacks }} className='snacks'>
        <div style={{ color: theme.text }} className='paragraph'>
          <p>
            Welcome to Yummy Dish
            <br />
            Your place to find Quick & Simple Vege-Friendly Recipes.
          </p>
        </div>
        <div className='infographic'>
          <Link to='/bookmarks'>
            <button
              style={{ background: theme.seeMyRecipeBtn }}
              type='button'
              className='See-My-Recipe-Button'
            >
              See My Recipe Box!
            </button>
          </Link>
        </div>
      </div>
      <div style={{ background: theme.snacks }} className='scroller'>
        {recipes.map(
          (item, idx) =>
            idx < 24 && (
              <Highlight
                key={idx}
                id={item.id}
                img={item.image}
                title={item.title}
              />
            )
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
export default Homepage;
