import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../../src/App'

describe('App root', () => {
  test('renders Home title from routed component', () => {
    render(<App />)
    // The Home page H1 uses class home__title after BEM refactor
    expect(
      screen.getByRole('heading', { name: /news sources/i })
    ).toBeInTheDocument()
  })
})
