import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { AddMovieToFavoritesDto } from './dto/add-movie-to-favorite-list.dto';
import { User } from '../users/entities/user.entity';
import { Movies } from './entities/movies.entity';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            addMovieToFavorites: jest.fn(),
            getFavoriteMovies: jest.fn(),
            removeFromFavorites: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addMovieToFavorites', () => {
    it('should call addMovieToFavorites with correct parameters', async () => {
      const userId = 1;
      const movieDetails: AddMovieToFavoritesDto = {
          movie_id: 1, title: 'Test Movie',
          posterPath: 'test.jpg',
          releaseDate: '2024'
      };
      const user = new User();

      jest.spyOn(service, 'addMovieToFavorites').mockResolvedValue(user);

      expect(await controller.addMovieToFavorites(userId, movieDetails)).toBe(user);
      expect(service.addMovieToFavorites).toHaveBeenCalledWith(userId, movieDetails);
    });
  });

  describe('getFavoriteMovies', () => {
    it('should call getFavoriteMovies with correct parameter', async () => {
      const userId = 1;
      const movies = [new Movies()];

      jest.spyOn(service, 'getFavoriteMovies').mockResolvedValue(movies);

      expect(await controller.getFavoriteMovies(userId)).toBe(movies);
      expect(service.getFavoriteMovies).toHaveBeenCalledWith(userId);
    });
  });

  describe('removeFromFavorite', () => {
    it('should call removeFromFavorites with correct parameters', async () => {
      const userId = 1;
      const movieId = 1;
      const user = new User();

      jest.spyOn(service, 'removeFromFavorites').mockResolvedValue(user);

      expect(await controller.removeFromFavorite(userId, movieId)).toBe(user);
      expect(service.removeFromFavorites).toHaveBeenCalledWith(userId, movieId);
    });
  });
});
