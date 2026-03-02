process.env.NODE_ENV = 'test';

import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AppModule } from '../../../pokemon-user-backend/src/modules/app/app.module';
import { Pokemon } from '../../../pokemon-user-backend/src/modules/database/entities/pokemon.entity';

describe('Pokemon Team Builder (e2e)', () => {
  let app: INestApplication;
  let pokemonRepo: Repository<Pokemon>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();

    // 🔥 Get repository and seed test data
    pokemonRepo = moduleRef.get<Repository<Pokemon>>(
      getRepositoryToken(Pokemon),
    );

    await pokemonRepo.save([
      { pokedexNumber: 1, name: 'Bulbasaur', type1: 'Grass' },
      { pokedexNumber: 2, name: 'Ivysaur', type1: 'Grass' },
      { pokedexNumber: 3, name: 'Venusaur', type1: 'Grass' },
      { pokedexNumber: 4, name: 'Charmander', type1: 'Fire' },
      { pokedexNumber: 5, name: 'Charmeleon', type1: 'Fire' },
      { pokedexNumber: 6, name: 'Charizard', type1: 'Fire' },
      { pokedexNumber: 7, name: 'Squirtle', type1: 'Water' },
    ]);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return pokemon list', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/pokemon')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should create profile and assign valid team of 6', async () => {
    const createProfile = await request(app.getHttpServer())
      .post('/api/profiles')
      .send({ name: 'TestAsh' })
      .expect(201);

    const profileId = createProfile.body.id;

    await request(app.getHttpServer())
      .post(`/api/profiles/${profileId}/team`)
      .send({ pokemonIds: [1, 2, 3, 4, 5, 6] })
      .expect(201);
  });

  it('should reject team with more than 6 pokemon', async () => {
    const createProfile = await request(app.getHttpServer())
      .post('/api/profiles')
      .send({ name: 'TestMisty' })
      .expect(201);

    const profileId = createProfile.body.id;

    await request(app.getHttpServer())
      .post(`/api/profiles/${profileId}/team`)
      .send({ pokemonIds: [1, 2, 3, 4, 5, 6, 7] })
      .expect(400);
  });
});