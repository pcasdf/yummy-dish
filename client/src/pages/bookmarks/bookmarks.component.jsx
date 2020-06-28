import React, { useState, useContext, useEffect } from 'react';
import './bookmarks.styles.scss';
import BookmarkTabs from '../../components/boomark-tabs/bookmark-tabs.component';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import { Search } from '@material-ui/icons';
import { InputBase, Paper } from '@material-ui/core/';
import { UserContext } from '../../contexts/user.context';
import Data from '../../data/details-1.json';
import { ThemeContext } from '../../contexts/theme.context';

const Bookmarks = () => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState('');
  const [bookmarks, setBookmarks] = useState({});
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const stuff = {};
    const filteredKeys = [];

    if (user) {
      user.bookmarks.forEach((item) => {
        const recipe = Data.find((each) => each.id === +item.recipe);
        stuff[item.recipe] = recipe;
        filteredKeys.push(+item.recipe);
      });
    }

    setFiltered(filteredKeys);
    setBookmarks(stuff);
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value.toLowerCase());

    let filteredValues = [];
    let filteredKeys = [];

    for (let key in bookmarks) {
      filteredValues.push(bookmarks[key]);
    }

    filteredValues = filteredValues.filter((item) =>
      item.title.toLowerCase().includes(value)
    );

    filteredValues.forEach((item) => filteredKeys.push(item.id));

    setFiltered(filteredKeys);
  };

  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{ background: theme.bookmarkBackground }}
      className='bookmark-page'
    >
      <Header className='bookmarkHeader' style={{ backgroundColor: '#fec368' }}>
        <span className='title'>My Recipes</span>
      </Header>
      <div
        style={{ background: theme.bookmarkBackground }}
        className='search-bar'
      >
        <Paper component='form' className='search-wrapper'>
          <Search
            style={{
              color: '#ff9f1c',
              padding: '5px 10px',
              alignSelf: 'center'
            }}
          />
          <InputBase
            onChange={handleChange}
            value={input}
            placeholder='Search in your recipes'
            style={{
              width: '90%',
              marginBottom: 0,
              backgroundColor: '#fff'
            }}
          />
        </Paper>
      </div>
      <div className='labels'>
        {user &&
          user.categories.map((category, index) => (
            <BookmarkTabs key={index} index={index} data={filtered}>
              {category}
            </BookmarkTabs>
          ))}
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  );
};

export default Bookmarks;
