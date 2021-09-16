import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axiosMock from 'axios';
import RecipesList from '../../components/RecipesList';
import {BrowserRouter} from 'react-router-dom';

describe('RecipesList', () => {
  afterEach(cleanup);

  const response = {
    data: [
      {
        id: 1,
        name: 'Pizza',
        description: 'Bake in the oven',
        ingredients: [{ id: 3, name: 'cheese' }],
      },
      {
        id: 2,
        name: 'Spaghetti pizza',
        description: 'Put it in the oven',
        ingredients: [{ id: 4, name: 'dough' }]
      },
    ],
  }

  it('renders', async () => {
    axiosMock.get.mockResolvedValue(response);
    const { asFragment, getByTestId } = render(<RecipesList />);
    expect(asFragment()).toMatchSnapshot();
    await waitFor(() => expect(getByTestId('recipes-listgroup')).toBeVisible());
  });

  describe('when a list of recipes are being retrieved', () => {
    it('should render a list of recipes after retrieving them and render the search bar',
      async () => {
      // Given
      axiosMock.get.mockResolvedValue(response);

      // When
      const { getByTestId } = render(<RecipesList />);

      // Then
      expect(getByTestId('recipes-search-bar')).toBeVisible();
      expect(getByTestId('recipes-search-btn')).toBeVisible();
      expect(getByTestId('recipes-header')).toBeVisible();
      await waitFor(() => expect(getByTestId('recipe-1')).toHaveTextContent('Pizza'));
      await waitFor(() => expect(getByTestId('recipe-2')).toHaveTextContent('Spaghetti pizza'));
      expect(getByTestId('empty-recipe-details')).toBeVisible();
      expect(axiosMock.get).toHaveBeenCalledTimes(1);
    });

    it('should show an empty list', async () => {
      // Given
      axiosMock.get.mockResolvedValue({ data: [] });

      // When
      const { getByTestId } = render(<RecipesList />);

      // Then
      await waitFor(() => expect(getByTestId('recipes-listgroup')).toBeEmptyDOMElement());
    });

    it('should render the selected recipe from the recipe list', async () => {
      // Given
      axiosMock.get.mockResolvedValue(response);

      // When
      // Need to wrap in BrowserRouter otherwise test is hit by an error,
      // You should not use <Link> outside a <Router>
      const { getByTestId } = render(<BrowserRouter><RecipesList /></BrowserRouter>);

      // Then
      await waitFor(() => expect(getByTestId('recipes-listgroup')).toBeVisible());
      fireEvent.click(getByTestId('recipe-1'));
      await waitFor(() => expect(getByTestId('recipe-details')).toBeVisible());
      expect(getByTestId('recipe-name')).toHaveTextContent('Pizza');
      expect(getByTestId('recipe-desc')).toHaveTextContent('Bake in the oven');
      expect(getByTestId('recipe-ing')).toHaveTextContent('cheese');
      expect(getByTestId('recipe-edit')).toBeVisible();
    });
  });
});
