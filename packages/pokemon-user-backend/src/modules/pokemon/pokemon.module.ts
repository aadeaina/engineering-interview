import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from '../database/entities/pokemon.entity';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PokemonSeedService } from './pokemon.seed';
@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  providers: [PokemonService,PokemonSeedService],
  controllers: [PokemonController],
})
export class PokemonModule {}