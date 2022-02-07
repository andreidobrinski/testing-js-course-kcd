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

- Add env files for jest.client, jest.server, jest.common etc

Mock styles for CSS Modules
- in jest config
```
moduleNameMapper: {
    '\\.css$': require.resolve('./style-mock.js')
}
```
- add `'\\.module\\.css$': 'identity-obj-proxy',` above the .css require to get classnames from css modules