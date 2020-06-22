import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';
import Bookmarks from './pages/bookmarks/bookmarks.component';
import Account from './pages/account/account.component';
import RecipeDetail from './pages/recipe/recipe.component';
import CookModePage from './pages/cook-mode/cook-mode.component';
import Search from './pages/search/search.component';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/bookmarks' component={Bookmarks} />
        <Route exact path='/login' component={Account} />
        <Route path='/cookmode/:id' component={CookModePage} />
        <Route path='/search' component={Search} />
        <Route path='/recipes/:id' component={RecipeDetail} />
      </Switch>
    </div>
  );
}

export default App;
