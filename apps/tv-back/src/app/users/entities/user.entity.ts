import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Movies } from '../../movies/entities/movies.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Movies, movie => movie.users)
  @JoinTable({
    name: "user_favorite_movies",
    joinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "movie_id",
      referencedColumnName: "movie_id"
    }
  })
  favoriteMovies: Movies[];
}
