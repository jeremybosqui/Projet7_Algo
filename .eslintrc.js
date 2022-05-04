module.exports = { // eslint-disable-line
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "eqeqeq": "off",
    "curly": "error",
    "indent": ["warn", 2, { "SwitchCase": 1 }],
    "multiline-ternary": ["warn", "always-multiline"]
  }
}
