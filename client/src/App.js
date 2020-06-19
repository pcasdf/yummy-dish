import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';
import Bookmarks from './pages/bookmarks/bookmarks.component';
import RecipeDetail from './pages/recipe/recipe.component';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/bookmarks' component={Bookmarks} />
        <Route path='/recipe/:id' component={RecipeDetail} />
      </Switch>
    </div>
  );
}

export default App;
