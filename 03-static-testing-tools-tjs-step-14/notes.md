# Notes

package.json
"lint": "eslint --ignore-path .gitignore --ext .js,.ts,.tsx .",
- ignore path .gitignore: uses gitignore file to also ignore linting

"prettier": "prettier --ignore-path .gitignore --write \"**/*.+(js|json)\"",
- ignores paths that are in gitignore
- write: allows pretter to write (update) the files in the regex

prettier.io/playground
- use to configure prettier rules with a REPL

VSCode settings for prettier
```
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
```

In eslintrc, "eslint-config-prettier"
- helps for eslint to work with prettier
- install as a dev dependency

package json
"check-format": "npm run prettier -- --list-different",
"validate": "npm-run-all --parallel check-types check-format lint build"
- runs all in parallel

TypeScript
- used in this project but only to check types
- not using ts compiler

lint-staged
- automatically formats all staged files on commit