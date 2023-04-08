import '@/styles/globals.css'
import { Provider } from 'react-redux'
import store from '@/store'
import Layout from '@/components/layout'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useSampleData } from '@/features/samples/swr'
import { NextUIProvider } from '@nextui-org/react'
import { Theme } from '@/styles/theme'
// import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  const sample = useSampleData({ page: 1, limit: 10 })
  return (
    <Provider store={store}>
      <NextUIProvider theme={Theme}>
        <Layout>
          {getLayout(<Component {...pageProps} />)}
          {/* <Analytics debug={false} /> */}
        </Layout>
      </NextUIProvider>
      <ToastContainer />
    </Provider>
  )
}
