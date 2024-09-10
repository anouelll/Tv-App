import { Controller, Post, Param, Body, ParseIntPipe, Get, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AddMovieToFavoritesDto } from './dto/add-movie-to-favorite-list.dto';
import { User } from '../users/entities/user.entity';
import { Movies } from './entities/movies.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('add-to-favorites/:userId')
  async addMovieToFavorites(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() movieDetails: AddMovieToFavoritesDto,
  ): Promise<User> {
    console.log(movieDetails)
    return await this.moviesService.addMovieToFavorites(userId, movieDetails);
  }

  @Get('favorites/:userId')
  async getFavoriteMovies(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Movies[]> {
    return await this.moviesService.getFavoriteMovies(userId);
  }

  @Delete('remove-movie/:userId/:movieId')
  async removeFromFavorite(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('movieId', ParseIntPipe) movieId: number,
  ): Promise<User>{
    return await this.moviesService.removeFromFavorites(userId,movieId)
  }
}
