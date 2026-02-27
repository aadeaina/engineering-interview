import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Pokemon } from '../database/entities/pokemon.entity';

@Injectable()
export class PokemonSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async onModuleInit() {
    const count = await this.pokemonRepository.count();
    if (count > 0) {
      console.log('Pokemon already seeded.');
      return;
    }

    console.log('Seeding first 150 Pokémon...');

    for (let i = 1; i <= 150; i++) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${i}`
      );

      const data = response.data;

      const pokemon = this.pokemonRepository.create({
        pokedexNumber: i,
        name: data.name,
        type1: data.types[0]?.type.name,
        type2: data.types[1]?.type.name ?? null,
      });

      await this.pokemonRepository.save(pokemon);
      console.log(`Inserted ${data.name}`);
    }

    console.log('Seeding complete.');
  }
}