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
    await expect(CounterModel.create({ model_name: 'test' })).rejects.toEqual(expect.any(Error));
    const count = await CounterModel.countDocuments({});
    expect(count).toBe(1);
  });

  it('should require a model_name', async () => {
    await expect(CounterModel.create({ seq: 3 })).rejects.toEqual(expect.any(Error));
  });
});
