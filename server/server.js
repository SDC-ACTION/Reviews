require('../database');
const app = require('./app.js');

const isProd = process.env.NODE_ENV === 'production';
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

if (isProd) {
  setTimeout(() => {
    // eslint-disable-next-line global-require
    require('../database/seed/seedRandomData.js');
  }, 5000);
}
