import 'normalize.css'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import store from '@/store'
import Layout from '@/components/layout'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
// import { Analytics } from '@vercel/analytics/react'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <Provider store={store}>
      <Layout>
        {getLayout(<Component {...pageProps} />)}
        {/* <Analytics debug={false} /> */}
      </Layout>
      <ToastContainer />
    </Provider>
  )
}
