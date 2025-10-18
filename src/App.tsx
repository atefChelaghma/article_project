import { Provider } from 'react-redux'
import { RouterProvider } from './routes'
import { store } from './redux/store/store'
import Header from './components/header/Header'

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <RouterProvider />
    </Provider>
  )
}

export default App
