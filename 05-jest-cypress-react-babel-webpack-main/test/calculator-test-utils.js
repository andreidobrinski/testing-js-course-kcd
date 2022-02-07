import * as React from 'react'
import PropTypes from 'prop-types'
import {render as rtlRender} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ThemeProvider} from '@emotion/react'
import * as themes from '../src/themes'

// wraps RTL's render and allows for UI, theme, options to be passed as props
// import and use this render instead of RTL's render when providers are needed
function render(ui, {theme = themes.dark, ...options} = {}) {
  function Wrapper({children}) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }
  Wrapper.propTypes = {
    children: PropTypes.node,
  }

  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

export * from '@testing-library/react'
// override the built-in render with our own
export {render, userEvent}
