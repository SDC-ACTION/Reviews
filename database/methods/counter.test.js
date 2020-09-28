const mongoose = require('mongoose');
const CounterModel = require('../models/counter.js');
const counterMethods = require('./counter.js');

describe('Counter method tests', () => {
  describe('incrementReviewSeq method tests', () => {
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

    beforeEach(async () => {
      await CounterModel.create({ model_name: 'review' });
    });

    afterEach(async () => {
      await CounterModel.deleteMany({});
    });

    it('method should increment sequence field by the input number', async () => {
      await counterMethods.incrementReviewSeq(1);
      let counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(1);

      await counterMethods.incrementReviewSeq(14);
      counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(15);

      await counterMethods.incrementReviewSeq(-13);
      counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(2);
    });
  });
});
