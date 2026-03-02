import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from '../database/entities/pokemon.entity';
import { pokemonList } from './pokemon.data';

@Injectable()
export class PokemonSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
  ) {}

  async onModuleInit() {
    //Disable auto-seeding during tests
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    const count = await this.pokemonRepository.count();
    if (count > 0) {
      return;
    }

    await this.pokemonRepository.save(pokemonList);
  }
}