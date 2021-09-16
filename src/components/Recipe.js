import React, { useState, useEffect } from 'react';
import RecipeService from '../services/RecipeService';

const Recipe = props => {
  const initialRecipeState = {
    id: null,
    name: "",
    description: "",
    ingredients: [],
  };
  const [currentRecipe, setCurrentRecipe] = useState(initialRecipeState);
  const [message, setMessage] = useState("");

  const getRecipe = id => {
    RecipeService.get(id)
      .then(response => {
        if (response.data) {
          const ingredients = response.data.ingredients.reduce(
            (accumulator, currentIngredient) =>
              (accumulator ? accumulator + ", " : "") + currentIngredient.name
            , "");

          setCurrentRecipe({...response.data, ingredients});
        } else {
          setCurrentRecipe(false);
        }
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRecipe(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentRecipe({...currentRecipe, [name]: value});
  };

  const updateRecipe = () => {
    const ingredients = currentRecipe.ingredients
      .split(',')
      .map(ingredient => ({ name: ingredient.trim() }));
    const transformedRecipe = {
      ...currentRecipe,
      ingredients,
    };

    RecipeService.update(transformedRecipe.id, transformedRecipe)
      .then(response => {
        console.log(response.data);
        setMessage("Recipe has been updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteRecipe = () => {
    RecipeService.remove(currentRecipe.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/recipe/recipes/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentRecipe ? (
        <div data-testid="recipe-edit-form" className="edit-form">
          <h4>Recipe</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentRecipe.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentRecipe.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ingredients">Ingredients</label>
              <input
                type="text"
                className="form-control"
                id="ingredients"
                name="ingredients"
                value={currentRecipe.ingredients}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button data-testid="delete-btn" className="btn btn-danger" onClick={deleteRecipe}>
            Delete
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={updateRecipe}
            data-testid="update-btn"
          >
            Update
          </button>
          <p data-testid="update-message">{message}</p>
        </div>
      ) : (
        <div data-testid="empty-recipe">
          <br />
          <p>Please click on a Recipe</p>
        </div>
      )}
    </div>
  );
};

export default Recipe;
