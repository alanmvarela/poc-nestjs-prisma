import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Cards API Test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  })

  const issueCard = {
    "type": "issue",
    "title": "Test Issue Title",
    "description": "Test Issue Description"
  };

  const taskCard = {
    "type": "task",
    "title": "Test Task Title",
    "category": "test"
  };

  const bugCard = {
    "type": "bug",
    "description": "Test Bug Description"
  };

  it('Create a new IssueCard', () => {
    const card = issueCard;
    return request(app.getHttpServer())
      .post('/trello-manager')
      .send(card)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('description');
        const { title, description } = res.body;
        expect(title).toBe(card.title);
        expect(description).toBe(card.description);
      });
  });

  it('Get all IssueCards', () => {
    return request(app.getHttpServer())
      .get('/trello-manager/issue')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('Get a IssueCard', () => {
    const card = issueCard;
    return request(app.getHttpServer())
      .post('/trello-manager')
      .send(card)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        const { id } = res.body;
        return request(app.getHttpServer())
          .get(`/trello-manager/issue/${id}`)
          .expect(200)
          .then((res) => {
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('title');
            expect(res.body).toHaveProperty('description');
            const { title, description } = res.body;
            expect(title).toBe(card.title);
            expect(description).toBe(card.description);
          });
      });
  });

  it('Delete a IssueCard', () => {
    const card = issueCard;
    return request(app.getHttpServer())
      .post('/trello-manager')
      .send(card)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        const { id } = res.body;
        return request(app.getHttpServer())
          .delete(`/trello-manager/issue/${id}`)
          .expect(200);
      });
  });

  it('Create a new TaskCard', () => {
    const card = taskCard;
    return request(app.getHttpServer())
      .post('/trello-manager')
      .send(card)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('category');
        const { title, category } = res.body;
        expect(title).toBe(card.title);
        expect(category).toBe(card.category);
      });
  });

  it('Get all TaskCards', () => {
    return request(app.getHttpServer())
      .get('/trello-manager/task')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('Get a TaskCard', () => {
    const card = taskCard;
    return request(app.getHttpServer())
      .post('/trello-manager')
      .send(card)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        const { id } = res.body;
        return request(app.getHttpServer())
          .get(`/trello-manager/task/${id}`)
          .expect(200)
          .then((res) => {
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('title');
            expect(res.body).toHaveProperty('category');
            const { title, category } = res.body;
            expect(title).toBe(card.title);
            expect(category).toBe(card.category);
          });
      });
  });

  it('Delete a TaskCard', () => {
    const card = taskCard;
    return request(app.getHttpServer())
      .post('/trello-manager')
      .send(card)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        const { id } = res.body;
        return request(app.getHttpServer())
          .delete(`/trello-manager/task/${id}`)
          .expect(200);
      });
  });

  it('Create a new BugCard', () => {
    const card = bugCard;
    return request(app.getHttpServer())
      .post('/trello-manager')
      .send(card)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('description');
        const { description } = res.body;
        expect(description).toBe(card.description);
      });
  });

  it('Get all BugCards', () => {
    return request(app.getHttpServer())
      .get('/trello-manager/bug')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('Get a BugCard', () => {
    const card = bugCard;
    return request(app.getHttpServer())
      .post('/trello-manager')
      .send(card)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        const { id } = res.body;
        return request(app.getHttpServer())
          .get(`/trello-manager/bug/${id}`)
          .expect(200)
          .then((res) => {
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('title');
            expect(res.body).toHaveProperty('description');
            const { description } = res.body;
            expect(description).toBe(card.description);
          });
      });
  });

  it('Delete a BugCard', () => {
    const card = bugCard;
    return request(app.getHttpServer())
      .post('/trello-manager')
      .send(card)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        const { id } = res.body;
        return request(app.getHttpServer())
          .delete(`/trello-manager/bug/${id}`)
          .expect(200);
      });
  });
});
