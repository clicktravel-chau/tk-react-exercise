import React, { useState } from 'react';
import RecipeService from '../services/RecipeService';

const AddRecipe = () => {
  const initialRecipeState = {
    id: null,
    name: '',
    description: '',
    ingredients: '',
  };

  const [recipe, setRecipe] = useState(initialRecipeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const saveRecipe = () => {
    const ingredients = recipe.ingredients
      .split(',')
      .map(ingredient => ({ name: ingredient.trim() }));

    const data = {
      name: recipe.name,
      description: recipe.description,
      ingredients: ingredients,
    };

    RecipeService.create(data)
      .then(response => {
        setRecipe({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          ingredients: response.data.ingredients,
        });

        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newRecipe = () => {
    setRecipe(initialRecipeState);
    setSubmitted(false);
  };

  return (
    <div data-testid="add-recipe-root" className="submit-form">
      {submitted ? (
        <div>
          <h4 data-testid="success-header">You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newRecipe}>
            Add another
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={recipe.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={recipe.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ingredients">Ingredients (separate them with a comma)</label>
            <input
              type="text"
              className="form-control"
              id="ingredients"
              required
              value={recipe.ingredients}
              onChange={handleInputChange}
              name="ingredients"
            />
          </div>

          <button onClick={saveRecipe} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddRecipe;
