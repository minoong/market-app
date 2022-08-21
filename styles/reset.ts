import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body {
    height: 100vh;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

`

export default GlobalStyle
