const mongoose = require('mongoose');
const CounterModel = require('../models/counter.js');
const counterMethods = require('./counter.js');

describe('Counter method', () => {
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

  describe('incrementReviewSeq method', () => {
    beforeEach(async () => {
      await CounterModel.create({ model_name: 'review' });
    });
    afterEach(async () => {
      await CounterModel.deleteMany({});
    });

    it('method should increment sequence field by 1', async () => {
      await counterMethods.incrementReviewSeq();
      let counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(1);

      await counterMethods.incrementReviewSeq();
      counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(2);

      await counterMethods.incrementReviewSeq();
      counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(3);
    });
  });

  describe('decrementReviewSeq method', () => {
    beforeEach(async () => {
      await CounterModel.create({ model_name: 'review' });
    });
    afterEach(async () => {
      await CounterModel.deleteMany({});
    });

    it('method should decrement sequence field by 1', async () => {
      await counterMethods.incrementReviewSeq();
      await counterMethods.incrementReviewSeq();
      await counterMethods.incrementReviewSeq();
      await counterMethods.incrementReviewSeq();

      await counterMethods.decrementReviewSeq();
      let counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(3);

      await counterMethods.decrementReviewSeq();
      counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(2);

      await counterMethods.decrementReviewSeq();
      counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(1);
    });

    it('method should not be able to decrement values to 0 and below', async () => {
      await counterMethods.decrementReviewSeq();
      await counterMethods.decrementReviewSeq();
      let counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(0);

      await counterMethods.incrementReviewSeq();
      await counterMethods.incrementReviewSeq();
      counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(2);

      await counterMethods.decrementReviewSeq();
      await counterMethods.decrementReviewSeq();
      await counterMethods.decrementReviewSeq();
      await counterMethods.decrementReviewSeq();
      counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(1);
    });
  });
});
