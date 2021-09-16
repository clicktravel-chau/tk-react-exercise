import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axiosMock from 'axios';
import AddRecipe from '../../components/AddRecipe';

describe('AddRecipe', () => {
  afterEach(cleanup);

  it('renders', () => {
    const { asFragment } = render(<AddRecipe />);
    expect(asFragment()).toMatchSnapshot();
  })

  describe('has form for adding a recipe', () => {

    it('should be a class for a submittable form containing name, description and ingredients',
      () => {
        const {
          getByTestId,
          getByLabelText,
        } = render(<AddRecipe />);

        expect(getByTestId('add-recipe-root')).toHaveClass('submit-form');
        expect(getByLabelText('Name')).toBeVisible()
        expect(getByLabelText('Description')).toBeVisible();
        expect(getByLabelText('Ingredients (separate them with a comma)')).toBeVisible();
      });

    it('should submit successfully', async () => {
      // Given
      axiosMock.post.mockResolvedValue({
        data: {
          id: 1,
          name: 'Pizza',
          description: 'Bake in the oven',
          ingredients: [{ name: 'cheese' }],
        },
      });

      // When
      const {
        getByTestId,
        getByText,
      } = render(<AddRecipe />);
      fireEvent.click(getByText('Submit'));

      // Then
      await waitFor(() => expect(getByTestId('success-header')).toHaveTextContent(
        'You submitted successfully!'));
      expect(axiosMock.post).toHaveBeenCalledTimes(1);
    });
  });
});
