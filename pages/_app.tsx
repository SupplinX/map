import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from 'axios'

// export const BASE_URL = 'https://api.supplinx.com'
export const BASE_URL = 'http://localhost:1338'

const queryClient = new QueryClient()

axios.defaults.baseURL = BASE_URL + '/api'

export default function App({ Component, pageProps }: AppProps) {
  return <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
}
