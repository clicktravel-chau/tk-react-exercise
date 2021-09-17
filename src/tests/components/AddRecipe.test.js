import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axiosMock from 'axios';
import AddRecipe from '../../components/AddRecipe';

describe('AddRecipe', () => {
  afterEach(cleanup);

  it('renders and submits successfully', async () => {
    // Given
    axiosMock.post.mockResolvedValue({
      data: {
        id: 1,
        name: 'Pizza',
        description: 'Bake in the oven',
        ingredients: [{name: 'cheese'}],
      },
    });

    // When
    const { asFragment } = render(<AddRecipe />);
    fireEvent.click(screen.getByText('Submit'));

    // Then
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByTestId('add-recipe-root')).toHaveClass('submit-form');
    expect(screen.getByLabelText('Name')).toBeVisible()
    expect(screen.getByLabelText('Description')).toBeVisible();
    expect(screen.getByLabelText('Ingredients (separate them with a comma)')).toBeVisible();
    expect(await screen.findByText('You submitted successfully!')).toBeInTheDocument()
    expect(axiosMock.post).toHaveBeenCalledTimes(1);
  });
});
