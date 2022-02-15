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

a11y testing

```
import 'jest-axe/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'

const { container } = render(<Form />)
const results = await axe(container)
expect(results).toHaveNoViolations()
```

Mocking API calls

- when mocking an API call, always make sure to
- test that the mocked fn was called with the correct arg
- test that the mock was only called once

MSW

- mocks window.fetch or API call
- preferable to mocking out the API component from your codebase, as that would
  still leave some code untested
- mocking with MSW:

```
import {rest} from 'msw'
import {setupServer} from 'msw/node'

// intercepts and mocks http request
const server = setupServer(
  rest.post('/greeting', (req, res, ctx) => {
    return res(ctx.json({data: {greeting: `Hello ${req.body.subject}`}}))
  }),
)
```
