import { Provider } from 'react-redux'
import { RouterProvider } from './routes'
import { store } from './redux/store/store'

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider />
    </Provider>
  )
}

export default App
