import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProfilePokemon } from './profile-pokemon.entity';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  pokedexNumber: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  type1: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  type2?: string;

  @OneToMany(() => ProfilePokemon, (pp) => pp.pokemon)
  profiles: ProfilePokemon[];
}