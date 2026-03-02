import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProfilePokemon } from './profile-pokemon.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => ProfilePokemon, (pp) => pp.profile)
  team: ProfilePokemon[];
}