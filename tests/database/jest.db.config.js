module.exports = {
  name: 'database',
  displayName: 'Database Tests',
  verbose: true,
  preset: '@shelf/jest-mongodb',
  reporters: [
    'default',
    ['jest-junit', {
      outputName: 'junit-db.xml',
      suiteName: 'jest-db',
      outputDirectory: './artifacts',
      classNameTemplate: 'jest-db',
    }],
  ],
};
