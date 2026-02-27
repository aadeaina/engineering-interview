import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Pokemon } from './pokemon.entity';

@Entity()
@Unique(['profile', 'pokemon'])
export class ProfilePokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.team, {
    onDelete: 'CASCADE',
  })
  profile: Profile;

  @ManyToOne(() => Pokemon, {
    eager: true,
    onDelete: 'CASCADE',
  })
  pokemon: Pokemon;
}