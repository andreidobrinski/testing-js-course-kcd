ESLint
- `npm install -D eslint-plugin-cypress`
- add .eslintrc
- add to .gitignore:
```
cypress/videos
cypress/screenshots
```

Cypress.json
- `"baseUrl": "http://localhost:8080",`
  - allows you to do a `cy.visit('/')` instead of the full url each time
- `"integrationFolder": "cypress/e2e",`
  - allows keeping tests in e2e folder
```
"viewportHeight": 900,
"viewportWidth": 400
```
- viewport is configurable

Cypress Testing Library
- install `@testing-library/cypress/add-commands`
- this adds `findByText` and other testing library commands
- cant use `getBy` as it is synchronous
- can pass regex to queries

Cypress Scripts
- `"test:e2e": "is-ci \"test:e2e:run\" \"test:e2e:dev\"",`
  - uses is-ci to run different scripts depending on env
```
"cy:run": "cypress run",
"cy:open": "cypress open",
"test:e2e": "is-ci \"test:e2e:run\" \"test:e2e:dev\"",
"pretest:e2e:run": "npm run build",
"test:e2e:run": "start-server-and-test start http://localhost:8080 cy:run",
"test:e2e:dev": "start-server-and-test dev http://localhost:8080 cy:open",
```
- pretest automatically runs before test
- add cypress to CI (travis.yml)

Cypress Debug
- `.then(thing => { debugger; return thing })`
- `.debug()`
- `.pause()` (resume in the cypress window)
- in the app code:
```
if (window.Cypress) {
  debugger;
  window.theme = theme;
  window.setTheme = setTheme;
  // above exposes the functions/variables in the browser console
}
```

Cypress Simulate HTTP requests
```
cy.server().route({
  method: 'POST',
  url: 'url-here'
  status: 500,
  response: {}
})
```

Cypress API calls
```
const user = buildUser()
cy.request({
  url: 'url',
  method: 'POST',
  body: user,
})
```

Cypress Devtools
- install React devtools extension in cyress browser
- in index.html add:
```
<script>
  if (window.Cypress) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK =
      window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK
  }
</script>
```