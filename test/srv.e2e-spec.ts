import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SrvModule } from '../src/srv.module';

describe('SrvController (e2e)', () => {
  let srv: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [SrvModule],
    }).compile();

    srv = moduleFixture.createNestApplication();
    await srv.init();
  });

  it('/ (GET)', () => {
    return request(srv.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
