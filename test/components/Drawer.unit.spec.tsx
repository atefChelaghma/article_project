import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '../../src/redux/features/favorites/favoritesSlice'
import { Drawer } from '../../src/components/drawer/Drawer'
import '@testing-library/jest-dom'

const mockStore = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
})

const defaultProps = {
  isOpen: true,
  onClose: jest.fn(),
  favoriteCategories: ['technology', 'business'],
  favoriteAuthors: ['John Doe'],
  favoriteSources: ['CNN'],
  onToggleFavoriteCategory: jest.fn(),
  onToggleFavoriteAuthor: jest.fn(),
  onToggleFavoriteSource: jest.fn(),
}

const renderDrawer = (props = {}) => {
  return render(
    <Provider store={mockStore}>
      <Drawer {...defaultProps} {...props} />
    </Provider>
  )
}

describe('Drawer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders drawer with correct title', () => {
    renderDrawer()
    expect(screen.getByText('Feed Preferences')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn()
    renderDrawer({ onClose })

    const closeButton = screen.getByLabelText('Close drawer')
    fireEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('displays favorite categories section', () => {
    renderDrawer()
    expect(screen.getByText('Favorite Categories')).toBeInTheDocument()
  })

  it('displays favorite authors section', () => {
    renderDrawer()
    expect(screen.getByText('Favorite Authors')).toBeInTheDocument()
  })

  it('displays favorite sources section', () => {
    renderDrawer()
    expect(screen.getByText('Favorite Sources')).toBeInTheDocument()
  })

  it('shows active categories with heart icons', () => {
    renderDrawer()

    const technologyButton = screen.getByText('Technology').closest('button')
    expect(technologyButton).toHaveClass('drawer__item--active')

    const businessButton = screen.getByText('Business').closest('button')
    expect(businessButton).toHaveClass('drawer__item--active')
  })

  it('calls onToggleFavoriteCategory when category is clicked', () => {
    const onToggleFavoriteCategory = jest.fn()
    renderDrawer({ onToggleFavoriteCategory })

    const generalButton = screen.getByText('General').closest('button')
    fireEvent.click(generalButton!)

    expect(onToggleFavoriteCategory).toHaveBeenCalledWith('general')
  })

  it('calls onToggleFavoriteAuthor when author is clicked', () => {
    const onToggleFavoriteAuthor = jest.fn()
    renderDrawer({ onToggleFavoriteAuthor })

    const authorButton = screen.getByText('Jennifer Scholtes').closest('button')
    fireEvent.click(authorButton!)

    expect(onToggleFavoriteAuthor).toHaveBeenCalledWith('Jennifer Scholtes')
  })

  it('calls onToggleFavoriteSource when source is clicked', () => {
    const onToggleFavoriteSource = jest.fn()
    renderDrawer({ onToggleFavoriteSource })

    const sourceButton = screen.getByText('Politico').closest('button')
    fireEvent.click(sourceButton!)

    expect(onToggleFavoriteSource).toHaveBeenCalledWith('Politico')
  })

  it('closes drawer when overlay is clicked', () => {
    const onClose = jest.fn()
    renderDrawer({ onClose })

    const overlay = screen
      .getByRole('button', { name: 'Close drawer' })
      .closest('.drawer__overlay')
    if (overlay) {
      fireEvent.click(overlay)
      expect(onClose).toHaveBeenCalledTimes(1)
    }
  })

  it('does not render when isOpen is false', () => {
    renderDrawer({ isOpen: false })
    expect(screen.queryByText('Feed Preferences')).not.toBeInTheDocument()
  })

  it('displays desktop menu content', () => {
    renderDrawer()
    expect(screen.getByText('Feed Menu')).toBeInTheDocument()
    expect(screen.getByText('Categories (2)')).toBeInTheDocument()
    expect(screen.getByText('Authors (1)')).toBeInTheDocument()
    expect(screen.getByText('Sources (1)')).toBeInTheDocument()
  })

  it('shows empty state for desktop menu when no favorites', () => {
    renderDrawer({
      favoriteCategories: [],
      favoriteAuthors: [],
      favoriteSources: [],
    })

    const emptyMessages = screen.getAllByText('No favorites selected')
    expect(emptyMessages).toHaveLength(3)
  })
})
