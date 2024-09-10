import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MovieDetails from './MovieDetails';
import { addMovieToFavorite, removeFromFavorite, getFavoriteList } from '../../api/api_index';
import userReducer from '../../userSlice';
import '@testing-library/jest-dom';

jest.mock('../../api/api_index', () => ({
  addMovieToFavorite: jest.fn(),
  removeFromFavorite: jest.fn(),
  getFavoriteList: jest.fn(),
}));

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

describe('MovieDetails', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    release_date: '2023-01-01',
    poster_path: '/test.jpg',
    runtime: 120,
    vote_average: 8.0,
    overview: 'This is a test movie.',
    tagline: 'Test tagline',
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (getFavoriteList as jest.Mock).mockResolvedValue({ json: async () => [] });
  });

  test('renders movie details', async () => {
    render(
      <Provider store={store}>
        <MovieDetails movie={mockMovie} onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByText('Test movie')).toBeInTheDocument();
    expect(screen.getByText('Rating: 8')).toBeInTheDocument();
    expect(screen.getByText('Runtime: 120 mins')).toBeInTheDocument();
    expect(screen.getByText('This is a test movie.')).toBeInTheDocument();
    expect(screen.getByText('Test tagline')).toBeInTheDocument();
  });

  test('adds movie to favorites when button is clicked', async () => {
    (addMovieToFavorite as jest.Mock).mockResolvedValue({});
  
    render(
      <Provider store={store}>
        <MovieDetails movie={mockMovie} onClose={mockOnClose} />
      </Provider>
    );
  

    const addButton = screen.getByRole('button', { name: /Add to my favorite/i });
    fireEvent.click(addButton);
  
    
    await waitFor(() => {
      expect(addMovieToFavorite).toHaveBeenCalledTimes(1);
      expect(addMovieToFavorite).toHaveBeenCalledWith(
        expect.any(Number), 
        mockMovie.id,
        mockMovie.title,
        mockMovie.poster_path,
        mockMovie.release_date
      );
    });
  });

  test('removes movie from favorites when button is clicked', async () => {
    (getFavoriteList as jest.Mock).mockResolvedValueOnce({ json: async () => [mockMovie] });

    render(
      <Provider store={store}>
        <MovieDetails movie={mockMovie} onClose={mockOnClose} />
      </Provider>
    );

    (removeFromFavorite as jest.Mock).mockResolvedValue({});

    
    fireEvent.click(screen.getByRole('button', { name: /Add to my favorite/i }));
    await waitFor(() => expect(addMovieToFavorite).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole('button', { name: /Remove from favorites/i }));

    await waitFor(() => expect(removeFromFavorite).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(removeFromFavorite).toHaveBeenCalledWith(1, mockMovie.id));
  });
});
