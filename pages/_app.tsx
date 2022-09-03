import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/reset'
import theme from '../styles/theme'
import Gnb from '@components/common/Gnb'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { wrapper } from '@features/store'
import client from '../apollo-client'
import { ApolloProvider } from '@apollo/client'

function MyApp({ Component, pageProps }: AppProps) {
 const [queryClient] = useState(() => new QueryClient())

 return (
  <ApolloProvider client={client}>
   <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>
     <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Gnb />
      <Component {...pageProps} />
     </ThemeProvider>
    </Hydrate>
   </QueryClientProvider>
  </ApolloProvider>
 )
}

export default wrapper.withRedux(MyApp)
