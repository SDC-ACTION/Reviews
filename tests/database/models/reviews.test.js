const mongoose = require('mongoose');
const ReviewModel = require('../../../database/models/reviews.js');

describe('Review Model', () => {
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
    await ReviewModel.deleteMany({});
  });

  it('should not allow duplicate review_ids', async () => {
    await ReviewModel.create({
      review_rating: 1, username: 'Test1', product_id: 1, review_id: 1,
    });
    let count = await ReviewModel.countDocuments({});
    expect(count).toBe(1);

    await expect(ReviewModel.create({
      review_rating: 2, username: 'Test2', product_id: 2, review_id: 1,
    })).rejects.toEqual(expect.any(Error));

    count = await ReviewModel.countDocuments({});
    expect(count).toBe(1);
  });

  it('should not be allowed to add a document with a missing required field', async () => {
    // missing username
    await expect(ReviewModel.create({ review_rating: 1, product_id: 123, review_id: 1 }))
      .rejects.toEqual(expect.any(Error));
    // missing review_rating
    await expect(ReviewModel.create({ username: '123', product_id: 123, review_id: 2 }))
      .rejects.toEqual(expect.any(Error));
    // missing product_id
    await expect(ReviewModel.create({ review_rating: 1, username: '123', review_id: 3 }))
      .rejects.toEqual(expect.any(Error));
    // missing review_id
    await expect(ReviewModel.create({ review_rating: 1, username: '123', product_id: 123 }))
      .rejects.toEqual(expect.any(Error));

    const count = await ReviewModel.countDocuments({});
    expect(count).toBe(0);
  });

  it('should not be able to input ratings below 1 or above 5', async () => {
    await expect(ReviewModel.create({
      review_rating: 6, username: 'Test1', product_id: 1, review_id: 1,
    })).rejects.toEqual(expect.any(Error));

    await expect(ReviewModel.create({
      review_rating: 0, username: 'Test1', product_id: 1, review_id: 2,
    })).rejects.toEqual(expect.any(Error));

    const count = await ReviewModel.countDocuments({});
    expect(count).toBe(0);
  });

  it('should be able to input ratings from 1 through 5', async () => {
    await ReviewModel.create({
      review_rating: 1, username: 'Test1', product_id: 1, review_id: 1,
    });
    await ReviewModel.create({
      review_rating: 2, username: 'Test2', product_id: 1, review_id: 2,
    });
    await ReviewModel.create({
      review_rating: 3, username: 'Test3', product_id: 1, review_id: 3,
    });
    await ReviewModel.create({
      review_rating: 4, username: 'Test4', product_id: 1, review_id: 4,
    });
    await ReviewModel.create({
      review_rating: 5, username: 'Test5', product_id: 1, review_id: 5,
    });

    const count = await ReviewModel.countDocuments({});
    expect(count).toBe(5);
  });
});
