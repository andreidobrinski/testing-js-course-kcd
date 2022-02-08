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