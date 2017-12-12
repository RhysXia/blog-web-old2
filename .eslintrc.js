module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'eslint:recommended',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  globals: {}
}
