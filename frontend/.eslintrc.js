module.exports = {
  plugins: ['prettier'],
  extends: [
    'next/core-web-vitals',
    'react-app',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-empty': 'error',
    'no-extra-semi': 'error',
    'no-irregular-whitespace': 'error',
    curly: 'error',
    'dot-notation': 'error',
    'no-empty-function': 'error',
    'no-multi-spaces': 'error',
  },
};
