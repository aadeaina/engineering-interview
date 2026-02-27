import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../database/entities/profile.entity';
import { ProfilePokemon } from '../database/entities/profile-pokemon.entity';
import { Pokemon } from '../database/entities/pokemon.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, ProfilePokemon, Pokemon])],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}