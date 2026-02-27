import { Module } from '@nestjs/common';
import { DbModule } from '../database/db.module';
import { PokemonModule } from '../pokemon/pokemon.module'; 
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [DbModule,PokemonModule,ProfileModule],
})
export class AppModule {}
