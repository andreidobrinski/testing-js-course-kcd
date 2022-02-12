Changes since last video recording

- prefer `screen` for queries
  - instead of `const { getByText } = render()`
  - `import { screen } from '@testing-library/react` and `render()` with
    `const text = screen.getByText`
- prefer userEvent over fireEvent
  - `import userEvent from '@testing-library/react'`
- prefer `waitFor` over `wait`
- prefer `BrowserRouter` and `window.history.pushState` over
  `createMemoryHistory`
- prefer `MSW` for mocking HTTP requests

Debug

- destructure `debug` from the render method
- call `debug()` to see the entire DOM in the console
- pass an arg, `debug(elem)` to see just the `elem`

Rerender

- rerenders the same component
- can rerender new props
- renders to the exact same container as the original UI
- allows to test situations where props are updated

queryByRole

- will return null if element isn't rendered
- used for testing `expect(queryByRole('role)).toBeNull()`
- queries with get, like `getByRole` will throw an error if the element isn't
  rendered
