Jest Setup

- `npm install -D jest`
- add `test: "jest"` to package.json
- add `__tests__` directory, Jest will check any directory with that name by default. `[file].test.js` works as well
- for CI, in package.json:
  - `"validate": "npm run lint && npm run test && npm run build"`
  - `"setup": "npm install && npm run validate"`
  - CI will run `setup` command

- Jest does not support `import` statements by default
- add the following to babelrc
  - `const isTest = String(process.env.NODE_ENV) === 'test'`
  - `['@babel/preset-env', {modules: isTest ? 'commonjs' : false}],`
- jest picks up .babelrc automatically