import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../database/entities/profile.entity';
import { ProfilePokemon } from '../database/entities/profile-pokemon.entity';
import { Pokemon } from '../database/entities/pokemon.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,

    @InjectRepository(ProfilePokemon)
    private profilePokemonRepository: Repository<ProfilePokemon>,

    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
  ) {}

  async create(name: string): Promise<Profile> {
    const profile = this.profileRepository.create({ name });
    return this.profileRepository.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find({
      relations: ['team'],
    });
  }

  async assignTeam(profileId: number, pokemonIds: number[]) {
    if (pokemonIds.length > 6) {
      throw new BadRequestException('Maximum 6 Pokémon allowed.');
    }

    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });

    if (!profile) {
      throw new BadRequestException('Profile not found.');
    }

    await this.profilePokemonRepository.delete({ profile });

    for (const pokemonId of pokemonIds) {
      const pokemon = await this.pokemonRepository.findOne({
        where: { id: pokemonId },
      });

      if (!pokemon) {
        throw new BadRequestException(`Pokemon ${pokemonId} not found.`);
      }

      const relation = this.profilePokemonRepository.create({
        profile,
        pokemon,
      });

      await this.profilePokemonRepository.save(relation);
    }

    return { message: 'Team assigned successfully.' };
  }
}