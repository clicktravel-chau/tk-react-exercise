import React, { useState, useEffect } from 'react';
import RecipeService from '../services/RecipeService';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    retrieveRecipes();
  }, []);

  const onChangeSearchName = event => {
    const searchName = event.target.value;
    setSearchName(searchName);
  };

  const retrieveRecipes = async () => {
    try {
      const response = await RecipeService.getAll();
      setRecipes(response.data);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  const setActiveRecipe = (recipe, index) => {
    setCurrentRecipe(recipe);
    setCurrentIndex(index);
  };

  const findByName = async () => {
    try {
      const response = await RecipeService.findByName(searchName);
      setRecipes(response.data);
    } catch (e) {
      setErrorMessage(e.message);
    }
  };

  return (
    <div className="list row">
      <ErrorMessage errorMessage={errorMessage} />
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
            data-testid="recipes-search-bar"
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
              data-testid="recipes-search-btn"
            >Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h1 data-testid="recipes-header">Recipes List</h1>

        <ul data-testid="recipes-listgroup" className="list-group">
          {
            recipes && recipes.map((recipe, index) => (
              <li
                data-testid={"recipe-" + recipe.id}
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveRecipe(recipe, index)}
                key={recipe.id}
              >
                {recipe.name}
              </li>
            ))
          }
        </ul>
      </div>
      <div className="col-md-6">
        {currentRecipe ? (
          <div data-testid="recipe-details">
            <h4>Recipe</h4>
            <div data-testid="recipe-name">
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentRecipe.name}
            </div>
            <div data-testid="recipe-desc">
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentRecipe.description}
            </div>
            <div data-testid="recipe-ing">
              <label>
                <strong>Ingredients:</strong>
              </label>{" "}
              <ul>
                {currentRecipe.ingredients.map(ingredient =>
                  <li key={ingredient.id}>{ingredient.name}</li>
                )}
              </ul>
            </div>

            <Link
              to={"/recipe/recipes/" + currentRecipe.id}
              className="btn btn-secondary"
              data-testid="recipe-edit"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p data-testid="empty-recipe-details">Please click on a Recipe</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesList;
