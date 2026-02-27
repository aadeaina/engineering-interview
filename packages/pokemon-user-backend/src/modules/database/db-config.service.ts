import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SomeEntity } from './entities/some.entity';
import { Pokemon } from './entities/pokemon.entity';
import { Profile } from './entities/profile.entity';
import { ProfilePokemon } from './entities/profile-pokemon.entity';

@Injectable()
export class DbConfigService {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'pokemon',
      entities: [SomeEntity,Pokemon,Profile, ProfilePokemon],
      synchronize: true,
    };
  }
}
