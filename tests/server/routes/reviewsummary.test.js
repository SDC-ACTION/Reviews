const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app.mock.js');
const ReviewSummaryModel = require('../../../database/models/reviewsummary.js');

describe('GET /api/reviewsummary/{product_id} route', () => {
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

  afterEach(async () => {
    await ReviewSummaryModel.deleteMany({});
  });

  it('should send status 200 when a review summary exists for a product', async (done) => {
    await ReviewSummaryModel.create({ product_id: 1 });
    const response = await request(app).get('/api/reviewsummary/1')
      .expect('Content-Type', /application\/json/)
      .expect(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].product_id).toBe(1);
    done();
  });

  it('should send status 404 when review summary is not found', async (done) => {
    await ReviewSummaryModel.create({ product_id: 1 });
    const response = await request(app).get('/api/reviewsummary/2')
      .expect('Content-Type', /text\/html/)
      .expect(404);
    expect(response.text).toBe('Review Summary Not Found.');
    done();
  });

  describe('should send status 400 on bad parameters', () => {
    it('when product_id is not a number', async (done) => {
      const response = await request(app).get('/api/reviewsummary/a')
        .expect('Content-Type', /text\/html/)
        .expect(400);
      expect(response.text).toBe('Bad Request.');
      done();
    });
  });

  it('should send status 500 when error occurs even w/ valid parameters', async (done) => {
    await ReviewSummaryModel.create({ product_id: 9999 });
    const response = await request(app).get('/api/reviewsummary/9999')
      .expect('Content-Type', /text\/html/)
      .expect(500);
    expect(response.text).toBe('Internal Server Error.');
    done();
    done();
  });
});
