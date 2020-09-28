const mongoose = require('mongoose');
const CounterModel = require('./counter.js');

describe('Counter Model', () => {
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
    await CounterModel.deleteMany({});
  });

  it('should not allow duplicate model_names', async () => {
    await CounterModel.create({ model_name: 'test' });
    let count = await CounterModel.countDocuments({});
    expect(count).toBe(1);

    await expect(CounterModel.create({ model_name: 'test' })).rejects.toEqual(expect.any(Error));
    count = await CounterModel.countDocuments({});
    expect(count).toBe(1);
  });

  it('should not allow seq field go decrement below 0', async () => {
    await CounterModel.create({ model_name: 'test' });
    let doc = await CounterModel.find({ model_name: 'test' });
    expect(doc[0].seq).toBe(0);

    await CounterModel.findOneAndUpdate({ model_name: 'test' }, { $inc: { seq: -1 } });
    await CounterModel.findOneAndUpdate({ model_name: 'test' }, { $inc: { seq: -1 } });
    await CounterModel.findOneAndUpdate({ model_name: 'test' }, { $inc: { seq: -1 } });
    doc = await CounterModel.find({ model_name: 'test' });
    expect(doc[0].seq).toBe(0);
  });
});
