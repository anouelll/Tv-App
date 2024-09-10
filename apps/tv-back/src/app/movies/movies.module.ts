import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movies } from './entities/movies.entity';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Movies, User])],
  providers: [MoviesService],
  controllers: [MoviesController]
})
export class MoviesModule {}
export { Movies };

