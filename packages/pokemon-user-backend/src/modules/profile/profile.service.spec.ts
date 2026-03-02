import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../database/entities/profile.entity';
import { ProfilePokemon } from '../database/entities/profile-pokemon.entity';
import { Pokemon } from '../database/entities/pokemon.entity';
import { BadRequestException } from '@nestjs/common';

describe('ProfileService', () => {
  let service: ProfileService;

  const profileRepo = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
  };

  const profilePokemonRepo = {
    delete: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
  };

  const pokemonRepo = {
    findOne: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: getRepositoryToken(Profile), useValue: profileRepo },
        { provide: getRepositoryToken(ProfilePokemon), useValue: profilePokemonRepo },
        { provide: getRepositoryToken(Pokemon), useValue: pokemonRepo },
      ],
    }).compile();

    service = module.get(ProfileService);
  });

  it('should create a profile', async () => {
    profileRepo.create.mockReturnValue({ name: 'Ash' });
    profileRepo.save.mockResolvedValue({ id: 1, name: 'Ash' });

    const result = await service.create('Ash');

    expect(profileRepo.create).toHaveBeenCalledWith({ name: 'Ash' });
    expect(result.name).toBe('Ash');
  });

  it('should throw if more than 6 pokemon assigned', async () => {
    await expect(
      service.assignTeam(1, [1, 2, 3, 4, 5, 6, 7])
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw if profile not found', async () => {
    profileRepo.findOne.mockResolvedValue(null);

    await expect(
      service.assignTeam(99, [1])
    ).rejects.toThrow('Profile not found.');
  });

  it('should throw if pokemon not found', async () => {
    profileRepo.findOne.mockResolvedValue({ id: 1 });
    pokemonRepo.findOne.mockResolvedValue(null);

    await expect(
      service.assignTeam(1, [999])
    ).rejects.toThrow('Pokemon 999 not found.');
  });

  it('should assign team successfully', async () => {
    profileRepo.findOne.mockResolvedValue({ id: 1 });

    pokemonRepo.findOne.mockImplementation(async ({ where }) => ({
      id: where.id,
    }));

    profilePokemonRepo.create.mockReturnValue({});
    profilePokemonRepo.save.mockResolvedValue({});

    const result = await service.assignTeam(1, [1, 2, 3]);

    expect(profilePokemonRepo.delete).toHaveBeenCalled();
    expect(profilePokemonRepo.save).toHaveBeenCalledTimes(3);
    expect(result.message).toBe('Team assigned successfully.');
  });
});