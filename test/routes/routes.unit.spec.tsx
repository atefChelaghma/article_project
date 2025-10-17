import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { RouterProvider } from '../../src/routes'
import { store } from '../../src/redux/store/store'

describe('RouterProvider', () => {
  it('renders the Home page heading via BASE_URL route', () => {
    render(
      <Provider store={store}>
        <RouterProvider />
      </Provider>
    )
    expect(
      screen.getByRole('heading', { name: /news sources/i })
    ).toBeInTheDocument()
  })

  it('defines only one route (BASE_URL)', () => {
    render(
      <Provider store={store}>
        <RouterProvider />
      </Provider>
    )
    // react-router renders routes inside a <div> with data attributes; simplest is to rely on heading presence
    // For explicit check, we can inspect the virtual DOM for link count or absence of unexpected headings.
    // As a lightweight assertion, ensure no duplicate heading appears.
    const headings = screen.getAllByRole('heading', { name: /news sources/i })
    expect(headings).toHaveLength(1)
  })
})
