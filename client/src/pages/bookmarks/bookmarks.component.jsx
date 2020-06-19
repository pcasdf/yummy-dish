import React from 'react';
import Tabs from '../../components/tabs/tabs.component';
import Header from '../../components/header/header.component';

const Bookmarks = () => {
  return (
    <>
      <Header>My Recipes</Header>
      <Tabs>Snacks</Tabs>
      <Tabs>Desserts</Tabs>
      <Tabs>For Party</Tabs>
      <Tabs>Dinner Date</Tabs>
    </>
  );
};

export default Bookmarks;
