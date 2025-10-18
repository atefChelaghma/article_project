import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Search } from '../../src/components/search/Search'

describe('Search Component', () => {
  const mockOnSearch = jest.fn()
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders with default placeholder', () => {
    render(<Search />)

    const input = screen.getByPlaceholderText('Search articles...')
    expect(input).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(<Search placeholder="Custom placeholder" />)

    const input = screen.getByPlaceholderText('Custom placeholder')
    expect(input).toBeInTheDocument()
  })

  it('displays search icon button', () => {
    render(<Search />)

    const searchButton = screen.getByRole('button', { name: /submit search/i })
    const searchIcon = document.querySelector('.search__icon--search')

    expect(searchButton).toBeInTheDocument()
    expect(searchIcon).toBeInTheDocument()
  })

  it('handles controlled input correctly', async () => {
    const user = userEvent.setup()
    render(
      <Search
        value="test value"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    )

    const input = screen.getByDisplayValue('test value')
    expect(input).toBeInTheDocument()

    // Type a single character to test onChange is called
    await user.type(input, 'x')
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('handles uncontrolled input correctly', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search articles...')

    await user.type(input, 'test query')
    expect(input).toHaveValue('test query')
  })

  it('calls onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search articles...')

    await user.type(input, 'test query')
    await user.keyboard('{Enter}')

    expect(mockOnSearch).toHaveBeenCalledWith('test query')
  })

  it('calls onSearch when search icon button is clicked', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search articles...')
    const searchButton = screen.getByRole('button', { name: /submit search/i })

    await user.type(input, 'test query')
    await user.click(searchButton)

    expect(mockOnSearch).toHaveBeenCalledWith('test query')
  })

  it('shows clear button when input has value', async () => {
    const user = userEvent.setup()
    render(<Search />)

    const input = screen.getByPlaceholderText('Search articles...')

    // Initially no clear button
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()

    // Type something
    await user.type(input, 'test')

    // Clear button should appear
    const clearButton = screen.getByLabelText('Clear search')
    expect(clearButton).toBeInTheDocument()
  })

  it('clears input when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search articles...')

    // Type something
    await user.type(input, 'test query')
    expect(input).toHaveValue('test query')

    // Click clear button
    const clearButton = screen.getByLabelText('Clear search')
    await user.click(clearButton)

    expect(input).toHaveValue('')
    expect(mockOnSearch).toHaveBeenCalledWith('')
  })

  it('disables search button when input is empty', () => {
    render(<Search />)

    const searchButton = screen.getByRole('button', { name: /submit search/i })
    expect(searchButton).toBeDisabled()
  })

  it('enables search button when input has value', async () => {
    const user = userEvent.setup()
    render(<Search />)

    const input = screen.getByPlaceholderText('Search articles...')
    const searchButton = screen.getByRole('button', { name: /submit search/i })

    await user.type(input, 'test')
    expect(searchButton).toBeEnabled()
  })

  it('does not call onSearch with empty or whitespace-only query', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search articles...')
    const searchButton = screen.getByRole('button', { name: /submit search/i })

    // Try with spaces only
    await user.type(input, '   ')
    await user.click(searchButton)

    expect(mockOnSearch).not.toHaveBeenCalled()
  })

  it('trims whitespace from search query', async () => {
    const user = userEvent.setup()
    render(<Search onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Search articles...')
    const searchButton = screen.getByRole('button', { name: /submit search/i })

    await user.type(input, '  test query  ')
    await user.click(searchButton)

    expect(mockOnSearch).toHaveBeenCalledWith('test query')
  })
})
