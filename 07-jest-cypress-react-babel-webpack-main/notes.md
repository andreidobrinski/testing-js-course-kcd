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