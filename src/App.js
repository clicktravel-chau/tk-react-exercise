import './App.css';
import React from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddRecipe from './components/AddRecipe';
import RecipesList from './components/RecipesList';
import Recipe from './components/Recipe';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/recipe/" className="navbar-brand">
          Recipes
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/recipes"} className="nav-link">
              Recipes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/recipes/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/recipes"]} component={RecipesList} />
          <Route exact path="/recipes/add" component={AddRecipe} />
          <Route exact path="/recipe/recipes/:id" component={Recipe} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
