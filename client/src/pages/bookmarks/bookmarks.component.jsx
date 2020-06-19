import React from 'react';
import Tabs from '../../components/tabs/tabs.component';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';

const Bookmarks = () => {
  return (
    <>
      <Header>My Recipes</Header>
      <Tabs>Snacks</Tabs>
      <Tabs>Dessert</Tabs>
      <Tabs>For Party</Tabs>
      <Tabs>Dinner Date</Tabs>
      <Footer />
    </>
  );
};

export default Bookmarks;
