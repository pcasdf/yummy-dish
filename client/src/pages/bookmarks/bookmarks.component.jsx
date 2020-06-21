import React, { useContext } from 'react';
import './bookmarks.styles.scss';
import Tabs from '../../components/tabs/tabs.component';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import { Search } from '@material-ui/icons';
import { InputBase, Paper } from '@material-ui/core/';
import { UserContext } from '../../contexts/user.context';

const Bookmarks = () => {
  const { user } = useContext(UserContext);
  return (
    <div className='bookmark-page'>
      <Header style={{ backgroundColor: '#fec368' }}>
        My Recipes
        <div className='search-bar'>
          <Paper component='form' className='search-wrapper'>
            <Search
              style={{
                color: '#ff9f1c',
                padding: '5px 10px',
                alignSelf: 'center'
              }}
            />
            <InputBase
              placeholder='Search in your recipes'
              style={{
                padding: '5px',
                backgroundColor: '#fff'
              }}
            />
          </Paper>
        </div>
      </Header>
      {user && user.categories.map((category) => <Tabs>{category}</Tabs>)}
      <Tabs>Favorites</Tabs>
      <Footer />
    </div>
  );
};

export default Bookmarks;
