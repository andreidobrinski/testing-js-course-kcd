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

Test Debugger
- in package.json
```
"test:debug": "node --inspect-brk ./node-modules/jest/bin/jest.js --runInBand --watch"
```
- `runInBand` runs test in the same node process. Jest runs them in parallel by default
- in the browser, go to `chrome://inspect`
- click inspect
- opens chrome devtools

Test Coverage
- `jest --coverage`
- useful for CI
- can be opened in the browser with: `open coverage/lcov-report/index.html`
- to choose what goes into the coverage report, in th jest config:
```
collectCoverageFrom: [
  '**/src/**/*.js',
  '!**/__tests__/**',
  '!**/__server_tests__/**',
  '!**/node_modules/**',
  ],
```
- add `coverage` to .gitignore

Babel Plugin Istanbul
- analyzes code coverage by instrumenting code
- doesn't actually run your code
- use `/* istanbul-ignore-next */` to ignore code from test coverage
- not recommended to use

Code Coverage Threshold
- in the jest config:
```
coverageThreshold: {
    global: {
      statements: 15,
      branches: 10,
      functions: 15,
      lines: 15,
    },
    './src/shared/utils.js': {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    },
  },
```
- numbers mean the percent coverage to set as the threshold
- utils can have their own coverage threshold, separate from the global

Code coverage with codecov
- in the travis.yml
```
after_script: npx codecov@3
```
- uploads the coverage folder to codecov
- shows a dashboard with coverage reports

Is CI CLI
- `npm install -D is-ci-cli`
- in the package.json:
```
"test": "is-ci \"test:coverage\" \"test:watch\"",
"test:coverage": "jest --coverage",
"test:watch": "jest --watch"
```
- allows you to use `npm t` to run the watch script locally and the coverage script on CI
- checks for env var CI: `CI=1`

Jest Config flag
- `jest --config test/server.js` to run the server test config
- can have shared common config as well as server-only config
- can combine test envs into one coverage report. In jest config:
```
projects: [
    './test/jest.lint.js',
    './test/jest.client.js',
    './test/jest.server.js',
    './server',
  ],
```
- no need for config flags in test scripts
- add a `displayName` to config files to show a label in the test run output

Jest Runner ESLint
- add jest.lint.js file
- add ignore path gitignore in jest-runner-eslint in package.json
- allows us to use run eslint through jest
- add lint to jest config projects

Watch specific projects in Jest
- `npm install -D jest-watch-select-projects`
- in jest config (common)
```
watchPlugins: [
  'jest-watch-typeahead/filename',
  'jest-watch-typeahead/testname',
  'jest-watch-select-projects',
],
```
- press `P` in the jest watch UI to choose which project