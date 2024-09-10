import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from './Home';
import { fetchSearchMovie, fetchMoviePopular, fetchMoviesTrending } from '../../api/api_index';

// Mocking the API functions
jest.mock('../../api/api_index');

const mockFetchSearchMovie = fetchSearchMovie as jest.MockedFunction<typeof fetchSearchMovie>;
const mockFetchMoviePopular = fetchMoviePopular as jest.MockedFunction<typeof fetchMoviePopular>;
const mockFetchMoviesTrending = fetchMoviesTrending as jest.MockedFunction<typeof fetchMoviesTrending>;

// Create a mock store with thunk middleware
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const renderComponent = (store: any) => {
  return render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  );
};

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Home page and fetches popular and trending movies', async () => {
    const store = mockStore({});

    mockFetchMoviePopular.mockResolvedValue({
      page: 1,
      results: [
        {
          backdrop_path: "/tncbMvfV0V07UZozXdBEq4Wu9HH.jpg",
          id: 573435,
          title: "Bad Boys: Ride or Die",
          original_title: "Bad Boys: Ride or Die",
          overview: "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
          poster_path: "/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [28, 80, 53, 35, 10749],
          popularity: 4352.387,
          release_date: "2024-06-05",
          video: false,
          vote_average: 7.46,
          vote_count: 828,
        },
      ],
    });

    mockFetchMoviesTrending.mockResolvedValue({
      page: 1,
      results: [
        {
          backdrop_path: "/9l1eZiJHmhr5jIlthMdJN5WYoff.jpg",
          id: 533535,
          title: "Deadpool & Wolverine",
          original_title: "Deadpool & Wolverine",
          overview: "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
          poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
          media_type: "movie",
          adult: false,
          original_language: "en",
          genre_ids: [878, 28, 35],
          popularity: 2178.995,
          release_date: "2024-07-24",
          video: false,
          vote_average: 8.142,
          vote_count: 144,
        },
      ],
    });

    renderComponent(store);

    await waitFor(() => expect(mockFetchMoviePopular).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockFetchMoviesTrending).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getByText('Bad Boys: Ride or Die')).toBeInTheDocument();
    expect(screen.getByText('Trending')).toBeInTheDocument();
    expect(screen.getByText('Deadpool & Wolverine')).toBeInTheDocument();
  });

  test('handles search submission and displays results', async () => {
    const store = mockStore({});

    mockFetchSearchMovie.mockResolvedValue({
      results: [
        {
          id: 3,
          title: 'Searched Movie',
          overview: 'Overview of searched movie',
          release_date: '2024',
          poster_path: 'poster.jpeg',
          vote_average: 7.0,
          vote_count: 500,
        },
      ],
    });

    renderComponent(store);

    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'Test Search' } });
    fireEvent.submit(screen.getByRole('search'));

    await waitFor(() => expect(mockFetchSearchMovie).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Searched Movie')).toBeInTheDocument();
  });

  test('shows error message on failed search', async () => {
    const store = mockStore({});

    mockFetchSearchMovie.mockRejectedValue(new Error('Error fetching movies'));

    renderComponent(store);

    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'Test Search' } });
    fireEvent.submit(screen.getByRole('search'));

    await waitFor(() => expect(mockFetchSearchMovie).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Error fetching movies.')).toBeInTheDocument();
  });

  test('shows no movies found message when search yields no results', async () => {
    const store = mockStore({});

    mockFetchSearchMovie.mockResolvedValue({
      results: [],
    });

    renderComponent(store);

    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'No Results' } });
    fireEvent.submit(screen.getByRole('search'));

    await waitFor(() => expect(mockFetchSearchMovie).toHaveBeenCalledTimes(1));

    expect(screen.getByText('No movies found for your search.')).toBeInTheDocument();
  });
});
