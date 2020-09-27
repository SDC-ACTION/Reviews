/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const ReviewModel = require('../models/reviews.js');
const CounterModel = require('../models/counter.js');
const reviewsMethods = require('./reviews.js');

describe('Methods for reviews collection', () => {
  describe('addReview method tests', () => {
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
      await CounterModel.deleteMany({});
    });

    it('addReview should insert a valid doc into the reviews collection', async () => {
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

    it('addReview should create counter document if it does not exists', async () => {
      const count0 = await CounterModel.find({});
      await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });
      const count1 = await CounterModel.find({});

      expect(count0.length).toBe(0);
      expect(count1.length).toBe(1);
    });

    it('review_id should increment for each new document added to the review collection', async () => {
      for (let i = 1; i <= 10; i += 1) {
        const doc = await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });
        expect(doc.review_id).toBe(i);
      }
    });

    it('addReview should increment seq field in the counters collection for each new document added to the review collection', async () => {
      for (let i = 1; i <= 10; i += 1) {
        await reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 1 });
        const count1 = await CounterModel.find({ model_name: 'review' });
        expect(count1[0].seq).toBe(i);
      }
    });

    describe('addReview should not be able to insert into the reviews collection...', () => {
      it('...when there are missing required fields', async () => {
        // missing username
        await expect(reviewsMethods.addReview({ review_rating: 123, product_id: 123 }))
          .rejects.toEqual(expect.any(Error));
        // missing review_rating
        await expect(reviewsMethods.addReview({ username: '123', product_id: 123 }))
          .rejects.toEqual(expect.any(Error));
        // missing product_id
        await expect(reviewsMethods.addReview({ review_rating: 123, username: '123' }))
          .rejects.toEqual(expect.any(Error));

        const count = await ReviewModel.count({});
        expect(count).toBe(0);
      });

      it('...when there are incorrect data types', async () => {
        // review_rating is not a number
        await expect(reviewsMethods.addReview({ review_rating: 'String', username: 'Test1', product_id: 1 }))
          .rejects.toEqual(expect.any(Error));
        // product_id is not a number
        await expect(reviewsMethods.addReview({ review_rating: 4, username: 'Test1', product_id: 'String' }))
          .rejects.toEqual(expect.any(Error));

        const count = await ReviewModel.count({});
        expect(count).toBe(0);
      });
    });
  });
});
