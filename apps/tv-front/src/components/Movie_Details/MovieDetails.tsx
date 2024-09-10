import React, { useEffect, useState } from 'react';
import './MovieDetails.css';
import Movie from '../Movie/Movie';
import { addMovieToFavorite, removeFromFavorite, getFavoriteList } from '../../api/api_index';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.user.userId);
console.log(movie)
  useEffect(() => {
    const checkIfFavorite = async () => {
      if (userId) {
        try {
          const response = await getFavoriteList(userId);
          const favoriteMovies = await response.json();
          const movieInFavorites = favoriteMovies.some((favMovie: Movie) => favMovie.id === movie.id);
          setIsFavorite(movieInFavorites);
        } catch (error) {
          console.error('Error fetching favorite movies:', error);
        }
      }
    };

    checkIfFavorite();
  }, [userId, movie.id]);

  const handleAddToFavorites = async () => {
    console.log('movie:', movie)
    if (!userId) {
      console.error('User ID is not available');
      return;
    }
    try {
       await addMovieToFavorite(userId, movie.id, movie.title, movie.poster_path, movie.release_date);

      console.log('Movie added to favorites')
      setIsFavorite(true);
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  };

  const handleRemoveFromFavorites = async () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }
    try {
      await removeFromFavorite(userId, movie.movie_id);
      console.log('Movie removed from favorites');
      setIsFavorite(false);
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="container">
        <div className="movie">
          <div className='movie-poster'>
            {movie.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title} poster`} />
            ) : (
              <div className="placeholder">No Image Available</div>
            )}
          </div>
          <div className="movie-contexte">
            <div className="col1">
              <h1>{movie.title}</h1>
              <ul className="movie-infos">
                <li>Rating: {movie.vote_average}</li>
                {movie.runtime !== undefined && (
                  <li>Runtime: {movie.runtime} mins</li>
                )}
              </ul>
            </div>
            <div className="col2">
              <h5>SUMMARY</h5>
              <p className="movie-description">{movie.overview}</p>
              <p className="movie-tagline">{movie.tagline}</p>
            </div>
            <div>
              <button onClick={handleAddToFavorites} disabled={isFavorite}>Add to my favorite</button>
              {isFavorite && (
                <button onClick={handleRemoveFromFavorites}>Remove from favorites</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
