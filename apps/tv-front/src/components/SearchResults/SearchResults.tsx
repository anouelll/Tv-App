import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Movies from '../MovieList/MovieList';

interface Movie {
  id: number;
  title: string;
  overview: string;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const searchResults = location.state?.movies as Movie[]; 
  console.log(searchResults)

  return (
    <div className="search_results_container">
      <Navbar />
      <div className="search_results">
        <h1>Search Results</h1>
        <Movies movieList={searchResults} /> 
      </div>
    </div>
  );
};

export default SearchResults;
