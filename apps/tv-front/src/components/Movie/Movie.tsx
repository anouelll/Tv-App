import React, { useState } from 'react';
import './Movie.css';
import MovieDetails from '../Movie_Details/MovieDetails';

interface Movie {
 id: number;
  title: string;
  release_date: string;
  poster_path: string;
  runtime: number;
  vote_average?: number;
  overview: string;
  tagline?: string;
}

interface MovieProps {
  movie: Movie;
}

const Movie: React.FC<MovieProps> = ({ movie }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const releaseYear = new Date(movie.release_date).getFullYear();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLDivElement).className === "modal-overlay") {
      setShowModal(false);
    }
  };

  return (
    <div key={movie.id} className="movie-card">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={`${movie.title} poster`}
        />
      ) : (
        <div className="placeholder">No Image Available</div>
      )}
      <div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
        </div>
        <div className="release_date">
          <span className='release-year'>{releaseYear}</span>
          {movie.runtime !== undefined && (
            <span className='runtime'>{movie.runtime} mins</span>
          )}
          <button className='button_plus' onClick={handleShowModal}>+</button>
        </div>
      </div>
      {showModal && (
        <MovieDetails 
          movie={movie} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default Movie;
