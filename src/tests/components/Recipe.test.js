import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axiosMock from 'axios';
import Recipe from '../../components/Recipe'

describe('Recipe', () => {
  afterEach(cleanup);
  const match = {
    params: {
      id: 1,
    },
  };
  const history = {
    push: jest.fn(),
  };
  const response = {
    data: {
      id: 1,
      name: 'Test',
      description: 'this is a test',
      ingredients: [{ id: 3, name: 'testing' }],
    },
  };

  it('renders', async () => {
    axiosMock.get.mockResolvedValue(response);
    const { asFragment, getByTestId } = render(<Recipe match={match} history={history} />);
    expect(asFragment()).toMatchSnapshot();
    await waitFor(() => expect(getByTestId('recipe-edit-form')).toBeVisible());
  });

  describe('renders the edit form', () => {
    it('should render the entire form to edit the recipe', async () => {
      // Given
      axiosMock.get.mockResolvedValue(response);

      // When
      const { getByTestId, getByLabelText } = render(<Recipe match={match} history={history} />);

      // Then
      await waitFor(() => expect(getByTestId('recipe-edit-form')).toBeVisible());
      expect(getByLabelText('Name')).toBeVisible();
      expect(getByLabelText('Description')).toBeVisible();
      expect(getByLabelText('Ingredients')).toBeVisible();
      expect(getByTestId('delete-btn')).toBeVisible();
      expect(getByTestId('update-btn')).toBeVisible();
      expect(axiosMock.get).toHaveBeenCalledTimes(1);
    });

    it('should render a success message after updating a recipe', async () => {
      // Given
      axiosMock.get.mockResolvedValue(response);
      axiosMock.patch.mockResolvedValue({ data: {} });

      // When
      const { getByTestId } = render(<Recipe match={match} history={history} />);
      await waitFor(() => expect(getByTestId('recipe-edit-form')).toBeVisible());

      // Then
      fireEvent.click(getByTestId('update-btn'));
      await waitFor(() => expect(getByTestId('update-message')).toBeVisible());
      expect(axiosMock.patch).toHaveBeenCalledTimes(1);
    });

    it('should delete recipe', async () => {
      // Given
      axiosMock.get.mockResolvedValue(response);
      axiosMock.delete.mockResolvedValue({});

      // When
      const { getByTestId } = render(<Recipe match={match} history={history} />);
      await waitFor(() => expect(getByTestId('recipe-edit-form')).toBeVisible());

      // Then
      fireEvent.click(getByTestId('delete-btn'));
      expect(axiosMock.delete).toHaveBeenCalledTimes(1);
    });

    it('should render a empty recipe form', async () => {
      // Given
      axiosMock.get.mockResolvedValue({});

      // When
      const { getByTestId } = render(<Recipe match={match} history={history} />);

      // Then
      await waitFor(() => expect(getByTestId('empty-recipe')).toBeVisible());
    });
  });
});
