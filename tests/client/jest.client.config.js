module.exports = {
  name: 'client',
  displayName: 'Client Tests',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  verbose: true,
  reporters: [
    'default',
    ['jest-junit', {
      outputName: 'junit-client.xml',
      suiteName: 'jest-client',
      outputDirectory: './artifacts',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}',
    }],
  ],
};
