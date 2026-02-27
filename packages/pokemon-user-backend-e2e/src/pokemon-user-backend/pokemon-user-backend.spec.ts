import request from 'supertest';

const API = 'http://localhost:3000/api';

describe('Pokemon Team Builder (e2e)', () => {
  it('should create profile and assign valid team of 6', async () => {
    const createProfile = await request(API)
      .post('/profiles')
      .send({ name: 'TestAsh' })
      .expect(201);

    const profileId = createProfile.body.id;

    await request(API)
      .post(`/profiles/${profileId}/team`)
      .send({ pokemonIds: [1, 2, 3, 4, 5, 6] })
      .expect(201);
  });

  it('should reject team with more than 6 pokemon', async () => {
    const createProfile = await request(API)
      .post('/profiles')
      .send({ name: 'TestMisty' })
      .expect(201);

    const profileId = createProfile.body.id;

    await request(API)
      .post(`/profiles/${profileId}/team`)
      .send({ pokemonIds: [1, 2, 3, 4, 5, 6, 7] })
      .expect(400);
  });
});

// import { Test } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';

// import { AppModule } from '../../../../pokemon-user-backend/src/modules/app/app.module';
// import { startDatabase } from '../../../../pokemon-user-backend/src/modules/database/db';




// import axios from 'axios';

// describe('GET /api', () => {
//   it('should return a message', async () => {
//     const res = await axios.get(`/api`);

//     expect(res.status).toBe(200);
//     expect(res.data).toEqual({ message: 'Hello API' });
//   });
// });
