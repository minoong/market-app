import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/reset'
import theme from '../styles/theme'
import Gnb from '@components/common/Gnb'

function MyApp({ Component, pageProps }: AppProps) {
 console.log('djfladjskl')
 return (
  <ThemeProvider theme={theme}>
   <GlobalStyle />
   <Gnb />
   <Component {...pageProps} />
  </ThemeProvider>
 )
}

export default MyApp
