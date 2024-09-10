import React, { useState, useEffect } from 'react';
import TvShow from '../Tv show/TvShow'; 
import { fetchTvShowsTrending } from '../../api/api_index'; 


interface tvshow {
  id: number;
  title: string;
  overview: string;
 
}


interface TvShowsProps {
  searchResults?: tvshow[];
}


const TvShows: React.FC<TvShowsProps> = ({ searchResults }) => {

  const [tvshowsTrending, setTvshowsTrending] = useState<tvshow[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const responseTrending = await fetchTvShowsTrending();
        const dataTrending = await responseTrending.json();

       
        setTvshowsTrending(dataTrending.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {searchResults ? (
        <div>
          <h1>Search Results</h1>
          {searchResults.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {searchResults.map((tvshow) => (
                <TvShow key={tvshow.id} tvshow={tvshow} />
              ))}
            </div>
          ) : (
            <p>No TV shows found for your search.</p>
          )}
        </div>
      ) : (
        <div>
          <h1>Trending</h1>
          {tvshowsTrending.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {tvshowsTrending.map((tvshow) => (
                <TvShow key={tvshow.id} tvshow={tvshow} />
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TvShows;
