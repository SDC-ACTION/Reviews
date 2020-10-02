const mongoose = require('mongoose');
const CounterModel = require('../../../database/models/counter.js');
const counterMethods = require('../../../database/methods/counter.js');

describe('Counter method', () => {
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

  describe('incrementReviewSeq method', () => {
    beforeEach(async () => {
      await CounterModel.create({ model_name: 'review' });
    });
    afterEach(async () => {
      await CounterModel.deleteMany({});
    });

    it('method should increment sequence field by 1', async () => {
      await counterMethods.incrementReviewSeq();
      await counterMethods.incrementReviewSeq();
      let counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(2);

      await counterMethods.incrementReviewSeq();
      counter = await CounterModel.find({ model_name: 'review' });
      expect(counter[0].seq).toBe(3);
    });
  });
});
