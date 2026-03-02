import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pokemon } from '../database/entities/pokemon.entity';

describe('PokemonService', () => {
  let service: PokemonService;

  const pokemonRepo = {
    find: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: getRepositoryToken(Pokemon), useValue: pokemonRepo },
      ],
    }).compile();

    service = module.get(PokemonService);
  });

  it('should return all pokemon', async () => {
    const mockPokemon = [
      { id: 1, name: 'Bulbasaur' },
      { id: 2, name: 'Ivysaur' },
    ];

    pokemonRepo.find.mockResolvedValue(mockPokemon);

    const result = await service.findAll();

    expect(pokemonRepo.find).toHaveBeenCalled();
    expect(result).toEqual(mockPokemon);
  });

  it('should return empty array if no pokemon exist', async () => {
    pokemonRepo.find.mockResolvedValue([]);

    const result = await service.findAll();

    expect(result).toEqual([]);
  });
});