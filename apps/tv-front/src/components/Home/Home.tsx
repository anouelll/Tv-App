import React, { useState, FormEvent, useEffect } from 'react';
import './Home.css';
import { fetchSearchMovie} from '../../api/api_index';
import Navbar from '../Navbar/Navbar';
import MovieList from '../MovieList/MovieList';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchMoviePopular, fetchMoviesTrending } from '../../api/api_index';
import Movie from '../Movie/Movie';



const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [movieListTrending, setMovieListTrending] = useState<Movie[]>([]); 
  const [movieListPopular, setMovieListPopular] = useState<Movie[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 
  const navigate = useNavigate(); 
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const responseTrending = await fetchMoviesTrending();
        const dataTrending = await responseTrending.json();
        setMovieListTrending(dataTrending.results);

       
        const responsePopular = await fetchMoviePopular();
        const dataPopular = await responsePopular.json();
        setMovieListPopular(dataPopular.results);

       
       

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[]); 

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetchSearchMovie(searchTerm);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        navigate('/search-results', { state: { movies: data.results } });
      } else {
        setError('No movies found for your search.');
      }
    } catch (error) {
      setError('Error fetching movies.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home_container">
      <Navbar/>
      <div className="search_container">
        <h1 className='title'>Find Movies, TV Shows, and More...</h1>
        <form onSubmit={handleSearchSubmit} role="search">
          <input
            id="search"
            type="search"
            placeholder="Search..."
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            autoFocus
            required
          />
          <button type="submit">Go</button>
        </form>
      </div>
      <div className='movie_list'>
        <MovieList 
          listTitle = "Trending" 
          movieList = {movieListTrending}  
          alternativeText = "Loading ..."
        />
        <MovieList 
          listTitle = "Popular" 
          movieList = {movieListPopular} 
          alternativeText = "Loading ..." 
        />
      </div>
    </div>
  );
};

export default Home;
