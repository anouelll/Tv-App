import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movies } from './entities/movies.entity';
import { User } from '../users/entities/user.entity';
import { AddMovieToFavoritesDto } from './dto/add-movie-to-favorite-list.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private readonly moviesRepository: Repository<Movies>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addMovieToFavorites(userId: number, movieDetails: AddMovieToFavoritesDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['favoriteMovies'] });

    if (!user) {
      console.error(`User not found with ID: ${userId}`);
      throw new NotFoundException('User not found');
    }

    let movie = await this.moviesRepository.findOne({ where: { movie_id: movieDetails.movie_id } });

    if (!movie) {
      movie = this.moviesRepository.create(movieDetails);
      await this.moviesRepository.save(movie);
    }

    if (!user.favoriteMovies) {
      user.favoriteMovies = [];
    }

    user.favoriteMovies.push(movie);
    await this.userRepository.save(user);

    return user;
  }

  async getFavoriteMovies(userId: number): Promise<Movies[]> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['favoriteMovies'] });
    if (!user) {
      console.error(`User not found with ID: ${userId}`);
      throw new NotFoundException('User not found');
    }

    return user.favoriteMovies;
  }

  async removeFromFavorites(userId: number, movieId: number): Promise<User>{
    const user = await this.userRepository.findOne({where:{id: userId}, relations: ['favoriteMovies']})

    if(!user){
      console.error(`User not found with ID: ${userId}`);
      throw new NotFoundException('User not found');
    }
    user.favoriteMovies = user.favoriteMovies.filter(movie => movie.movie_id !== movieId)
    await this.userRepository.save(user);

    return user;
  }
}
