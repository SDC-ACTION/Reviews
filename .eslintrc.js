const allowCamelCase = [
  'product_*', 'review_*', 'rating_*', 'model_name', 'created_at',
  'total_reviews',
];

module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
  ],
  rules: {
    camelcase: [
      'error', { allow: allowCamelCase },
    ],
    'react/prop-types': 0,
    'no-console': 'off',
    'linebreak-style': ['error', 'windows'],
    'no-underscore-dangle': ['error', { allow: ['__MONGO_URI__'] }],
  },
};
