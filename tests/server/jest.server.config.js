module.exports = {
  name: 'server',
  displayName: 'Server Tests',
  verbose: true,
  preset: '@shelf/jest-mongodb',
  reporters: [
    'default',
    ['jest-junit', {
      outputName: 'junit-server.xml',
      suiteName: 'jest-server',
      outputDirectory: './artifacts',
      classNameTemplate: 'jest-server',
    }],
  ],
};
