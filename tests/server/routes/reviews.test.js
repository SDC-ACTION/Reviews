const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app.mock.js');
const ReviewModel = require('../../../database/models/reviews.js');
const ReviewSummaryModel = require('../../../database/models/reviewsummary.js');

describe('GET /api/reviews...', () => {
  beforeAll(async () => {
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    await mongoose.connect(global.__MONGO_URI__, options, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await ReviewModel.deleteMany({});
    await ReviewSummaryModel.deleteMany({});
  });

  /** **
   *
   * ROUTE /api/reviews/{product_id}
   *
  **** */
  describe('... /{product_id}', () => {
    it('should send status 200 when a review exists for a product', async (done) => {
      await ReviewModel.create({
        review_rating: 1, username: 'Test1', product_id: 2, review_id: 3,
      });
      const response = await request(app).get('/api/reviews/2')
        .expect('Content-Type', /application\/json/)
        .expect(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].product_id).toBe(2);
      done();
    });

    it('should send status 200 when a review exists & parameters are valid', async (done) => {
      await ReviewModel.create({
        review_rating: 1, username: 'Test1', product_id: 2, review_id: 3,
      });
      const response = await request(app).get('/api/reviews/2?limit=1&review_rating=1')
        .expect('Content-Type', /application\/json/)
        .expect(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].product_id).toBe(2);
      done();
    });

    it('should send status 404 when reviews are not found w/ valid parameters', async (done) => {
      await ReviewModel.create({
        review_rating: 1, username: 'Test1', product_id: 1, review_id: 1,
      });
      await request(app).get('/api/reviews/1?review_rating=2')
        .expect(404);
      const response = await request(app).get('/api/reviews/2')
        .expect('Content-Type', /text\/html/)
        .expect(404);
      expect(response.text).toBe('Reviews Not Found.');
      done();
    });

    describe('should send status 400 on bad parameters', () => {
      it('when product_id is not a number', async (done) => {
        const response = await request(app).get('/api/reviews/a')
          .expect('Content-Type', /text\/html/)
          .expect(400);
        expect(response.text).toBe('Bad Request.');
        done();
      });

      it('when limit or review_rating is not a number', async (done) => {
        await ReviewModel.create({
          review_rating: 1, username: 'Test1', product_id: 1, review_id: 1,
        });
        // limit is a letter
        const response1 = await request(app).get('/api/reviews/1?limit=a')
          .expect('Content-Type', /text\/html/)
          .expect(400);
        expect(response1.text).toBe('Bad Request.');
        // review_rating is a letter
        const response2 = await request(app).get('/api/reviews/1?review_rating=a')
          .expect('Content-Type', /text\/html/)
          .expect(400);
        expect(response2.text).toBe('Bad Request.');
        done();
      });

      it('when limit is a negative number', async (done) => {
        const response = await request(app).get('/api/reviews/1?limit=-1')
          .expect('Content-Type', /text\/html/)
          .expect(400);
        expect(response.text).toBe('Bad Request.');
        done();
      });
    });

    it('should send status 500 when error occurs even w/ valid parameters', async (done) => {
      await ReviewModel.create({
        review_rating: 1, username: 'Test1', product_id: 9999, review_id: 1,
      });
      const response = await request(app).get('/api/reviews/9999')
        .expect('Content-Type', /text\/html/)
        .expect(500);
      expect(response.text).toBe('Internal Server Error.');
      done();
    });
  });

  /** **
   *
   * ROUTE /api/reviews/{product_id}/summary
   *
  **** */
  describe('.../{product_id}/summary', () => {
    it('should send status 200 when a review summary exists for a product', async (done) => {
      await ReviewSummaryModel.create({ product_id: 1 });
      const response = await request(app).get('/api/reviews/1/summary')
        .expect('Content-Type', /application\/json/)
        .expect(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].product_id).toBe(1);
      done();
    });

    it('should send status 404 when review summary is not found', async (done) => {
      await ReviewSummaryModel.create({ product_id: 1 });
      const response = await request(app).get('/api/reviews/2/summary')
        .expect('Content-Type', /text\/html/)
        .expect(404);
      expect(response.text).toBe('Review Summary Not Found.');
      done();
    });

    describe('should send status 400 on bad parameters', () => {
      it('when product_id is not a number', async (done) => {
        const response = await request(app).get('/api/reviews/a/summary')
          .expect('Content-Type', /text\/html/)
          .expect(400);
        expect(response.text).toBe('Bad Request.');
        done();
      });
    });

    it('should send status 500 when error occurs even w/ valid parameters', async (done) => {
      await ReviewSummaryModel.create({ product_id: 9999 });
      const response = await request(app).get('/api/reviews/9999/summary')
        .expect('Content-Type', /text\/html/)
        .expect(500);
      expect(response.text).toBe('Internal Server Error.');
      done();
    });
  });
});
