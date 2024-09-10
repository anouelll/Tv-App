import { Entity, Column, ManyToMany, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Movies {
 
  @PrimaryColumn()
  movie_id: number;

  @Column()
  title: string;

  @Column()
  posterPath: string;

  @Column()
  releaseDate: string;


  @ManyToMany(() => User, user => user.favoriteMovies)
  users: User[];
}
