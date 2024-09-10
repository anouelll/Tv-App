import React, { useState } from 'react';
import './TvShow.css';

interface tvshow {
  id: number;
  title: string;
  release_date: string;
  poster_path?: string;  
  runtime?: number;      
  vote_average: number;
  overview: string;
  tagline: string;
}

interface tvshowProps {
  tvshow: tvshow;
}

const TvShow: React.FC<tvshowProps> = ({ tvshow }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const releaseYear = new Date(tvshow.release_date).getFullYear();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div key={tvshow.id} className="tvshow-card">
      {tvshow.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${tvshow.poster_path}`}
          alt={`${tvshow.title} poster`}
        />
      ) : (
        <div className="placeholder">No Image Available</div>
      )}
      <div>
        <div className="tvshow-info">
          <h3>{tvshow.title}</h3>
        </div>
        <div className="release_date">
          <span className='release-year'>{releaseYear}</span>
          {tvshow.runtime !== undefined && (  
            <span className='runtime'>{tvshow.runtime} mins</span>
          )}
          <button className='button_plus' onClick={handleShowModal}>+</button>
        </div>
      </div>

    </div>
  );
};

export default TvShow;
