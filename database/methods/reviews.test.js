const mongoose = require('mongoose');
const ReviewModel = require('../models/reviews.js');
const reviewsMethods = require('./reviews.js');

describe('Reviews Table Methods Test', () => {
  beforeAll(async () => {
    const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true };
    // eslint-disable-next-line no-underscore-dangle
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
    await ReviewModel.deleteMany({});
  });

  it('addReview should insert a doc into the reviews collection', async () => {
    const count0 = await ReviewModel.count({});
    await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });
    const count1 = await ReviewModel.count({});
    await reviewsMethods.addReview({ review_rating: 5, username: 'Test2', product_id: 2 });
    const count2 = await ReviewModel.count({});

    const review1 = await ReviewModel.find({ username: 'Test1' });
    const review2 = await ReviewModel.find({ username: 'Test3' });

    expect(review1.length).toBe(1);
    expect(review1[0].username).toBe('Test1');
    expect(review1[0].product_id).toBe(1);
    expect(review1[0].review_rating).toBe(4);
    expect(review2.length).toBe(0);
    expect(count0).toBe(0);
    expect(count1).toBe(1);
    expect(count2).toBe(2);
  });

  describe('addReview should not be able to insert...', () => {
    it('...for missing username, review_rating, or product_id', async () => {
      // username
      await expect(reviewsMethods.addReview({ review_rating: 123, product_id: 123 }))
        .rejects.toEqual(expect.any(Error));
      // review_rating
      await expect(reviewsMethods.addReview({ username: '123', product_id: 123 }))
        .rejects.toEqual(expect.any(Error));
      // product_id
      await expect(reviewsMethods.addReview({ review_rating: 123, username: '123' }))
        .rejects.toEqual(expect.any(Error));

      const count = await ReviewModel.count({});
      expect(count).toBe(0);
    });

    it('...for incorrect data type for review_rating, or product_id', async () => {
      // review_rating
      await expect(reviewsMethods.addReview({ review_rating: 'String', username: 'Test1', product_id: 1 }))
        .rejects.toEqual(expect.any(Error));
      // product_id
      await expect(reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 'String' }))
        .rejects.toEqual(expect.any(Error));

      const count = await ReviewModel.count({});
      expect(count).toBe(0);
    });
  });
});
