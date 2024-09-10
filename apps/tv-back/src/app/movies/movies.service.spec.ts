import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Movies } from './entities/movies.entity';
import { AddMovieToFavoritesDto } from './dto/add-movie-to-favorite-list.dto';

describe('MoviesService', () => {
  let service: MoviesService;
  let userRepository: Repository<User>;
  let moviesRepository: Repository<Movies>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Movies),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    moviesRepository = module.get<Repository<Movies>>(getRepositoryToken(Movies));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addMovieToFavorites', () => {
    it('should add a movie to the user\'s favorites', async () => {
      const userId = 1;
      const movieDetails: AddMovieToFavoritesDto = {
        movie_id: 1, title: 'Test Movie',
        posterPath: '',
        releaseDate: ''
      };
      const user = new User();
      user.id = userId;
      user.favoriteMovies = [];

      const movie = new Movies();
      movie.movie_id = movieDetails.movie_id;
      movie.title = movieDetails.title;

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(moviesRepository, 'findOne').mockResolvedValue(movie);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await service.addMovieToFavorites(userId, movieDetails);
      expect(result).toBe(user);
      expect(user.favoriteMovies).toContain(movie);
    });
  });

  describe('getFavoriteMovies', () => {
    it('should return the user\'s favorite movies', async () => {
      const userId = 1;
      const movie = new Movies();
      movie.movie_id = 1;
      movie.title = 'Test Movie';

      const user = new User();
      user.id = userId;
      user.favoriteMovies = [movie];

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await service.getFavoriteMovies(userId);
      expect(result).toEqual([movie]);
    });
  });

  describe('removeFromFavorites', () => {
    it('should remove a movie from the user\'s favorites', async () => {
      const userId = 1;
      const movie_id = 1;
      const movie = new Movies();
      movie.movie_id = movie_id;
      movie.title = 'Test Movie';

      const user = new User();
      user.id = userId;
      user.favoriteMovies = [movie];

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await service.removeFromFavorites(userId, movie_id);
      expect(result).toBe(user);
      expect(user.favoriteMovies).not.toContain(movie);
    });
  });
});
