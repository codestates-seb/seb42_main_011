module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ["*.{js,jsx}", "*.service.{js,jsx}"],
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'react/jsx-fragments': ['off'],
    'react/jsx-props-no-spreading': 'off',
  },
};
