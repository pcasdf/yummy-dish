import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';
import searchComponent from './pages/search/search.component';
import Bookmarks from './pages/bookmarks/bookmarks.component';
import Account from './pages/account/account.component';
import RecipeDetail from './pages/recipe/recipe.component';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/bookmarks' component={Bookmarks} />
        <Route exact path='/login' component={Account} />

        <Route path='/recipes/:id' component={RecipeDetail} />
      </Switch>
    </div>
  );
}

export default App;
