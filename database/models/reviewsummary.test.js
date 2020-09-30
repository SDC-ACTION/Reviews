const mongoose = require('mongoose');
const ReviewSummaryModel = require('./reviewsummary.js');

describe('Counter Model', () => {
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

  it('should not allow duplicate product_ids', async () => {
    await ReviewSummaryModel.create({ product_id: 1 });
    await expect(ReviewSummaryModel.create({ product_id: 1 })).rejects.toEqual(expect.any(Error));
    const count = await ReviewSummaryModel.countDocuments({});
    expect(count).toBe(1);
  });

  it('product_id should be a required field', async () => {
    await expect(ReviewSummaryModel.create({ stars_1: 1 })).rejects.toEqual(expect.any(Error));
    const count = await ReviewSummaryModel.countDocuments({});
    expect(count).toBe(0);
  });

  it('stars fields should default to 0 when no value is assigned to them', async () => {
    const reviewSummary = await ReviewSummaryModel.create({ product_id: 1 });
    expect(reviewSummary.stars_1).toBe(0);
    expect(reviewSummary.stars_2).toBe(0);
    expect(reviewSummary.stars_3).toBe(0);
    expect(reviewSummary.stars_4).toBe(0);
    expect(reviewSummary.stars_5).toBe(0);
  });
});
