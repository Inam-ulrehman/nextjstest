// import dynamic from 'next/dynamic'
import Footer from './footer/Footer'
import Header from './header/Header'
// const ComponentWithNoSSR = dynamic(() => import('./header/Header'), {
//   ssr: false,
// })
const Layout = ({ children }) => {
  return (
    <>
      {/* <ComponentWithNoSSR /> */}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
export default Layout
