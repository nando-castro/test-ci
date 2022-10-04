import { jest } from '@jest/globals';
import supertest from 'supertest';
import app from '../src/app.js';
import { prisma } from '../src/database.js';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "memes"`;
});

const meme = {
  url: 'http://www.memesbr.com.br/xablau',
  title: 'Xablau rindo sem parar',
  description: 'Xablau viu qualquer coisa aleatória e riu',
  author: 'Frank Rocha'
};

describe('Test Meme Routes', () => {
  it('Deve criar um meme e retornar status 201', async () => {
    const result = await supertest(app).post(`/memes`).send(meme);

    const createdMeme = await prisma.memes.findUnique({
      where: { title: meme.title }
    });

    expect(result.status).toBe(201);
    expect(createdMeme).not.toBeNull();
  });

  it('Lista todos os mesmes e deve retornar status 200 e um array de memes', async () => {
    const result = await supertest(app).get(`/memes`).send();

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
