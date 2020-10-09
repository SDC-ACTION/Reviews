const mongoose = require('mongoose');
const ReviewSummaryModel = require('../../../database/models/reviewsummary.js');

describe('Review Summary Model', () => {
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

  it('should not allow duplicate product_ids', async () => {
    await ReviewSummaryModel.create({ product_id: 1 });
    await expect(ReviewSummaryModel.create({ product_id: 1 })).rejects.toEqual(expect.any(Error));
    const count = await ReviewSummaryModel.countDocuments({});
    expect(count).toBe(1);
  });

  it('should not allow product_id to be a string', async () => {
    await expect(ReviewSummaryModel.create({ product_id: 'a' })).rejects.toEqual(expect.any(Error));
    const count = await ReviewSummaryModel.countDocuments({});
    expect(count).toBe(0);
  });

  it('should require a product_id field', async () => {
    await expect(ReviewSummaryModel.create({ rating_1: 1 })).rejects.toEqual(expect.any(Error));
    const count = await ReviewSummaryModel.countDocuments({});
    expect(count).toBe(0);
  });

  it('rating fields should default to 0 when no value is assigned to them', async () => {
    const reviewSummary = await ReviewSummaryModel.create({ product_id: 1 });
    expect(reviewSummary.rating_1).toBe(0);
    expect(reviewSummary.rating_2).toBe(0);
    expect(reviewSummary.rating_3).toBe(0);
    expect(reviewSummary.rating_4).toBe(0);
    expect(reviewSummary.rating_5).toBe(0);
  });
});
