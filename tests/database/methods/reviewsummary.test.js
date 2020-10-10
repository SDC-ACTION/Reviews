const mongoose = require('mongoose');
const ReviewSummaryModel = require('../../../database/models/reviewsummary.js');
const reviewSummaryMethods = require('../../../database/methods/reviewsummary.js');

describe('Review Summary Collection', () => {
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
    await ReviewSummaryModel.deleteMany({});
  });

  describe('getReviewSummary method', () => {
    it('should find review summary of a product given a product_id as input', async () => {
      await ReviewSummaryModel.create({ product_id: 1, total_reviews: 0 });
      const reviewSummary = await reviewSummaryMethods.getReviewSummary(1);
      const expected = [{
        product_id: 1,
        total_reviews: 0,
        rating_1: 0,
        rating_2: 0,
        rating_3: 0,
        rating_4: 0,
        rating_5: 0,
      }];
      expect(reviewSummary).toMatchObject(expected);
    });

    it('should return an empty array when product_id is not found', async () => {
      await ReviewSummaryModel.create({ product_id: 1, total_reviews: 0 });
      const reviewSummary = await reviewSummaryMethods.getReviewSummary(2);
      expect(reviewSummary.length).toBe(0);
    });
  });
});
