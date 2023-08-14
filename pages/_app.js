import '../styles/globals.css'
import { Layout } from "../Components/Layout"
import { Provider } from 'react-redux'
import store from "../redux/store"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ToastContainer theme='dark'/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
