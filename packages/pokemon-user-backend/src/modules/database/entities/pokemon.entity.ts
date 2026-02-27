import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  pokedexNumber: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  type1: string;

  @Column({ nullable: true })
  type2: string;
}