Jest Setup

- `npm install -D jest`
- add `test: "jest"` to package.json
- add `__tests__` directory, Jest will check any directory with that name by default. `[file].test.js` works as well
- for CI, in package.json:
  - `"validate": "npm run lint && npm run test && npm run build"`
  - `"setup": "npm install && npm run validate"`
  - CI will run `setup` command