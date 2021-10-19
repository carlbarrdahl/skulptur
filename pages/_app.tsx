import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Provider as MultiauthProvider } from "@ceramicstudio/multiauth"

import { ChakraProvider } from "@chakra-ui/react"
import Layout from "../components/Layout"
import { useState } from "react"

import "../styles/globals.css"
import CeramicProvider from "../providers/ceramic"

import { InjectedConnector } from "@ceramicstudio/multiauth"
import type { PartialConnectorConfig } from "@ceramicstudio/multiauth"

export const connectors: Array<PartialConnectorConfig> = [
  {
    key: "injected",
    connector: new InjectedConnector({}),
  },
]

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  )
  return (
    <MultiauthProvider providers={[{ key: "ethereum", connectors }]}>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <CeramicProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </CeramicProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </MultiauthProvider>
  )
}

export default MyApp
