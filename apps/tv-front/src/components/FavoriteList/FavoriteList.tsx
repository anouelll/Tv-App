import React, { useEffect, useState } from 'react';
import '../Home/Home.css';
import Navbar from '../Navbar/Navbar';
import MovieList from '../MovieList/MovieList';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { getFavoriteList } from '../../api/api_index';

interface Movie {
  id: number;
  title: string;
  overview: string;
}

const FavoriteMovies: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const userId = useSelector((state: RootState) => state.user.userId);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId) {
        try {
          const response = await getFavoriteList(userId);
          if (!response.ok) {
            throw new Error('Failed to fetch favorites');
          }
          const favoriteMovies = await response.json();
          setFavorites(favoriteMovies);
          console.log('Updated favorites:', favoriteMovies);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchFavorites();
  }, [userId]);

  return (
    <div className="home_container">
      <Navbar />
      <div className="movie_list">
        <h1 className='title'>Favorite Movies</h1>
        {userId ? (
          <MovieList
            listTitle="Favorites"
            movieList={favorites}
            alternativeText="Loading favorites..."
          />
        ) : (
          <p className="title">Please log in to view your favorite movies.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
