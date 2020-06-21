import React from 'react';
import './bookmarks.styles.scss';
import Tabs from '../../components/tabs/tabs.component';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import { Search } from '@material-ui/icons';
import { InputBase, Paper } from '@material-ui/core/';

const Bookmarks = () => {
  return (
    <>
      <Header>
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
      <Tabs>Favorites</Tabs>
      <Tabs>Breakfast</Tabs>
      <Tabs>Lunch</Tabs>
      <Tabs>Dinner</Tabs>
      <Footer />
    </>
  );
};

export default Bookmarks;
