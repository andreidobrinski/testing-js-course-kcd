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

- Jest assertion `.toMatchInlineSnapshot` keeps the snapshot as part of the test file
- Keeps the snapshot inline, encourages dev to keep the snapshot smaller
- Must use this with prettier

Jest Emotion
- aka a snapshot serializer
- `npm install -D jest-emotion`
- in jest config: `snapshotSerializers: ['@emotion/jest/serializer'],`

Module Resolution
- to use shared modules in jest config
```
const path = require('path')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, '../src'),
    'shared',
    __dirname,
  ],
}
```
- `shared` is treated as a module directory
- import as if it's coming from node modules
- can also add `path.join(__dirname, '../test')`, which allows everything in the `test` folder to be imported as a node module as well
  - perfect place to store a custom `render` provider wrapper
- need to `npm install -D eslint-import-resolver-jest`
- in eslintrc:
  - ```
  {
      files: ['**/__tests__/**'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config.js'),
          },
        },
      },
    },
  ```
- in js/tsconfig:
  - ```
  "paths": {
      "*": ["src/*", "src/shared/*", "test/*"]
    }
  ```

Testing Library Expect Assertion Extension
- in jest config: `setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],`
- allows for more expect assertions, such as `.toHaveTextContent`
- allows for better error messages as a result

Jest Watch
- in package.json
```
"test:watch": "jest --watch"
```
- auto runs changed tests on save