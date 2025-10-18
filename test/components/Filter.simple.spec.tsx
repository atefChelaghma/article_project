import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Filter } from '../../src/components/filter/Filter'

describe('Filter Component', () => {
  const mockOnFilterChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders filter button', () => {
    render(<Filter onFilterChange={mockOnFilterChange} />)

    const filterButton = screen.getByRole('button', { name: /open filters/i })
    expect(filterButton).toBeDefined()
  })

  it('shows active filter badge when filters are applied', () => {
    render(
      <Filter
        onFilterChange={mockOnFilterChange}
        initialFilters={{ category: 'technology', date: '', source: '' }}
      />
    )

    const badge = document.querySelector('.filter__badge')
    expect(badge).toBeTruthy()
  })

  it('opens drawer when filter button is clicked', async () => {
    const user = userEvent.setup()
    render(<Filter onFilterChange={mockOnFilterChange} />)

    const filterButton = screen.getByRole('button', { name: /open filters/i })
    await user.click(filterButton)

    const drawerTitle = screen.getByText('Filters')
    expect(drawerTitle).toBeDefined()
  })

  it('closes drawer when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<Filter onFilterChange={mockOnFilterChange} />)

    // Open drawer
    const filterButton = screen.getByRole('button', { name: /open filters/i })
    await user.click(filterButton)

    // Close drawer
    const closeButton = screen.getByRole('button', { name: /close filters/i })
    await user.click(closeButton)

    const drawerTitle = screen.queryByText('Filters')
    expect(drawerTitle).toBeNull()
  })

  it('calls onFilterChange callback when provided', async () => {
    const user = userEvent.setup()
    render(<Filter onFilterChange={mockOnFilterChange} />)

    // Open drawer
    const filterButton = screen.getByRole('button', { name: /open filters/i })
    await user.click(filterButton)

    // Find first category select (in drawer) and change it
    const categorySelects = screen.getAllByDisplayValue('All Categories')
    const categorySelect = categorySelects[0] // Use first one (in drawer)
    await user.selectOptions(categorySelect, 'technology')

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      category: 'technology',
      date: '',
      source: '',
    })
  })

  it('renders with custom className', () => {
    const { container } = render(
      <Filter onFilterChange={mockOnFilterChange} className="custom-filter" />
    )

    const filterElement = container.querySelector('.filter.custom-filter')
    expect(filterElement).toBeTruthy()
  })
})
