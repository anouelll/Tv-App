import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AddMovieToFavoritesDto {

  @IsNotEmpty()
  @IsNumber()
  movie_id: number;
  
  @IsNotEmpty()
  @IsString()
  title: string;
  
  @IsNotEmpty()
  @IsString()
  posterPath: string;

  @IsNotEmpty()
  @IsString()
  releaseDate: string;


}
