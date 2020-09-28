const mongoose = require('mongoose');
const ReviewModel = require('./reviews.js');

describe('Review Model', () => {
  beforeAll(async () => {
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
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
    await expect(ReviewModel.create({ review_rating: 123, product_id: 123, review_id: 1 }))
      .rejects.toEqual(expect.any(Error));
    // missing review_rating
    await expect(ReviewModel.create({ username: '123', product_id: 123, review_id: 2 }))
      .rejects.toEqual(expect.any(Error));
    // missing product_id
    await expect(ReviewModel.create({ review_rating: 123, username: '123', review_id: 3 }))
      .rejects.toEqual(expect.any(Error));
    // missing review_id
    await expect(ReviewModel.create({ review_rating: 123, username: '123', product_id: 123 }))
      .rejects.toEqual(expect.any(Error));

    const count = await ReviewModel.countDocuments({});
    expect(count).toBe(0);
  });

  it('should not be allowed to add a document inputting a non matching data type', async () => {
    // review_rating is not a number
    await expect(ReviewModel.create({
      review_rating: 'String', username: 'Test1', product_id: 1, review_id: 1,
    })).rejects.toEqual(expect.any(Error));
    // product_id is not a number
    await expect(ReviewModel.create({
      review_rating: 4, username: 'Test1', product_id: 'String', review_id: 2,
    })).rejects.toEqual(expect.any(Error));
    // review_id is not a number
    await expect(ReviewModel.create({
      review_rating: 4, username: 'Test1', product_id: 123, review_id: 'String',
    })).rejects.toEqual(expect.any(Error));

    const count = await ReviewModel.countDocuments({});
    expect(count).toBe(0);
  });
});
