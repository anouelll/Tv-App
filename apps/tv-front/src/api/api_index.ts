import { release } from "os";
import Movie from "../components/Movie/Movie";
import axios from "axios";

const api_options : RequestInit = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2IxNjRlYWZlNzY0MDAyZDY2OWE4ODk3MGUwZTBhZSIsInN1YiI6IjY2NjZkMzcxOWUyYzA4MWY0M2MwOWZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w1kZOfKoxcN82Gi72f4xUz7s9IEx1ApZrW2M08mjnI8'
    }
}
const fetchWithAuth = async (url : string, options : RequestInit) : Promise<Response> => {
    try {
      console.log(options)
      const response = await fetch(url, options);

  
       if (!response.ok) {
        
        const error = new Error(`HTTP ${response.status} ${response.statusText}`);
    
        throw error;
      }
  
      return response;
    } catch (error) {
        console.log(error)
        throw error
    }}

    // const fetchWithAuth2 = async (url : string, options : RequestInit) : Promise<Response> => {
    //   try {
    //     console.log(options)
    //     const response = await axios.post(url, options.body, { headers: api_options.headers})
  
    
    //      if (!response.ok) {
          
    //       const error = new Error(`HTTP ${response.status} ${response.statusText}`);
      
    //       throw error;
    //     }
    
    //     return response;
    //   } catch (error) {
    //       console.log(error)
    //       throw error
    //   }}
  


    export const fetchMoviesTrending = (page  = 1): Promise<Response> => {
        return fetchWithAuth(`https://api.themoviedb.org/3/movie/now_playing?page=${page}`,{...api_options,method : 'GET'})
    }

    export const fetchMovieDetails = (movie_id : number): Promise<Response> => {
        return fetchWithAuth(`https://api.themoviedb.org/3/movie/?movie_id=${movie_id}`,{...api_options,method : 'GET'})
    }

    export const fetchMoviePopular = (page = 1): Promise<Response> => {
        return fetchWithAuth(`https://api.themoviedb.org/3/movie/popular?page=${page}`,{...api_options,method : 'GET'})
    }

    export const fetchMovieGenre = (): Promise<Response> =>{
         return fetchWithAuth('https://api.themoviedb.org/3/genre/movie/list?language=en',{...api_options,method : 'GET'})
    }

    export const fetchSearchMovie = (keyword : string): Promise<Response> =>{
        return fetchWithAuth(`https://api.themoviedb.org/3/search/keyword?query=${keyword}&page=1`,{...api_options,method : 'GET'})
   }

   export const fetchMoviebyID = (movie_id : number) : Promise<Response> =>{
    return fetchWithAuth(`'https://api.themoviedb.org/3/movie/movie_id?movie=${movie_id}`,{...api_options,method : 'GET'})
   }

   export const fetchTvShowsTrending = (page  = 1) : Promise<Response> =>{
    return fetchWithAuth(`https://api.themoviedb.org/3/tv/on_the_air?page=${page}`,{...api_options,method : 'GET'})
   }

   export const addMovieToFavorite = (user_Id: string | null, movie_id : number, title : string, posterPath : string, releaseDate : string): Promise<Response> => {
    const payload = { movie_id , title, posterPath, releaseDate}

    console.log(payload)

    return fetchWithAuth(`/api/movies/add-to-favorites/${user_Id}`, {
      ...api_options,
      method: 'POST',
      body:JSON.stringify(payload)
    });
  };

   export const removeFromFavorite = (  user_Id: string | null, movie_Id : number) : Promise<Response> =>{
    return fetchWithAuth(`/api/movies/remove-movie/${user_Id}/${movie_Id}`,{...api_options,method : 'DELETE'})
   }

   export const getFavoriteList  = ( user_id : string | null) : Promise<Response> =>{
    return fetchWithAuth(`/api/movies/favorites/${user_id}`,{...api_options,method : 'GET'})
   }

  //  export const addMovieToFavorite = (user_Id: string | null, movie_id: number, title : string, posterPath : string, releaseDate : string, runtime : number ): Promise<Response> => {
  //   return fetchWithAuth(`/api/movies/add-to-favorites/${user_Id}`, {
  //     ...api_options,
  //     method: 'POST',
  //     body: JSON.stringify({ movie_id, title, posterPath, releaseDate, runtime })
  //   });
  // };