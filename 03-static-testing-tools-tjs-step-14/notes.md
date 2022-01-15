# Notes

## package.json
"lint": "eslint --ignore-path .gitignore --ext .js,.ts,.tsx .",
- ignore path .gitignore: uses gitignore file to also ignore linting

"prettier": "prettier --ignore-path .gitignore --write \"**/*.+(js|json)\"",
- ignores paths that are in gitignore
- write: allows pretter to write (update) the files in the regex

prettier.io/playground
- use to configure prettier rules with a REPL