import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Movies } from '../movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Movies])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
