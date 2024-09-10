
import React, { useState, useEffect } from 'react';
import Movie  from '../Movie/Movie';




interface MovieListProps {  
  listTitle: string;
  movieList: Movie[];
  alternativeText: string;
}

const MovieList: React.FC<MovieListProps> = ({ listTitle = "", movieList = [], alternativeText = "Default" }) => {
  
  return (
  <div>
          <div>
          <h1 style={{
  fontFamily: 'cursive',
  fontSize: '4em',
  color: 'white',
  marginLeft: '30px', 
}}>{listTitle}</h1>
            {movieList.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginLeft : '30px' }}>
                {movieList.map((movie) => (
                  <Movie
                    key = {movie.id} 
                    movie = {movie}
                  />
                ))}
              </div>
            ) : (
              <p>{alternativeText}</p>
            )}
          </div>
    </div>
  )

};

export default MovieList;
