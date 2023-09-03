import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';
import * as bcrypt from "bcrypt";

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = await moduleFixture.resolve(PrismaService);
    await prisma.card.deleteMany();
    await prisma.note.deleteMany();
    await prisma.credential.deleteMany();
    await prisma.user.deleteMany();

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I'm okay!");
  });

  it("POST /users/sign-up", async () => {
    await request(app.getHttpServer())
      .post("/users/sign-up")
      .send({
        email: "user@example.com",
        password: "StrongP@ssw0rd"
      })
      .expect(201);

    const users = await prisma.user.findMany();
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user).toEqual({
      id: expect.any(Number),
      email: "user@example.com",
      password: expect.any(String)
    });
  });

  it("POST /users/sign-in", async () => {
    await prisma.user.create({
      data: {
        email: "user@example.com",
        password: bcrypt.hashSync("Senha1234*", 10)
      } 
    })

    const response = await request(app.getHttpServer())
      .post("/users/sign-in")
      .send({
        email: "user@example.com",
        password: "Senha1234*"
      })

    expect((response.statusCode)).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  });

});
