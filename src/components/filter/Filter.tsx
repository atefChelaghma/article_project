import React, { useState, useCallback } from 'react'
import {
  IconFilter,
  IconX,
  IconChevronDown,
  IconCalendar,
  IconTag,
  IconNews,
} from '@tabler/icons-react'
import './Filter.scss'

export interface FilterOption {
  value: string
  label: string
}

export interface FilterState {
  category: string
  date: string
  source: string
}

interface FilterProps {
  onFilterChange?: (filters: FilterState) => void
  categories?: FilterOption[]
  sources?: FilterOption[]
  className?: string
  initialFilters?: Partial<FilterState>
}

export const Filter: React.FC<FilterProps> = ({
  onFilterChange,
  categories = [
    { value: '', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'sports', label: 'Sports' },
    { value: 'health', label: 'Health' },
    { value: 'entertainment', label: 'Entertainment' },
  ],
  sources = [
    { value: '', label: 'All Sources' },
    { value: 'bbc-news', label: 'BBC News' },
    { value: 'cnn', label: 'CNN' },
    { value: 'reuters', label: 'Reuters' },
    { value: 'techcrunch', label: 'TechCrunch' },
    { value: 'the-guardian', label: 'The Guardian' },
  ],
  className = '',
  initialFilters = {},
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    date: '',
    source: '',
    ...initialFilters,
  })

  const handleFilterChange = useCallback(
    (filterType: keyof FilterState, value: string) => {
      const newFilters = { ...filters, [filterType]: value }
      setFilters(newFilters)
      onFilterChange?.(newFilters)
    },
    [filters, onFilterChange]
  )

  const openDrawer = useCallback(() => {
    setIsDrawerOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false)
  }, [])

  const clearAllFilters = useCallback(() => {
    const clearedFilters: FilterState = {
      category: '',
      date: '',
      source: '',
    }
    setFilters(clearedFilters)
    onFilterChange?.(clearedFilters)
  }, [onFilterChange])

  const hasActiveFilters = Object.values(filters).some((value) => value !== '')

  const dateOptions: FilterOption[] = [
    { value: '', label: 'Any time' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' },
  ]

  const FilterDropdown: React.FC<{
    icon: React.ReactNode
    label: string
    value: string
    options: FilterOption[]
    onChange: (value: string) => void
  }> = ({ icon, label, value, options, onChange }) => (
    <div className="filter__dropdown">
      <label className="filter__label">
        {icon}
        {label}
      </label>
      <select
        className="filter__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <IconChevronDown className="filter__chevron" size={16} />
    </div>
  )

  return (
    <>
      <div className={`filter ${className}`}>
        {/* Mobile Filter Button */}
        <button
          type="button"
          className="filter__mobile-btn"
          onClick={openDrawer}
          aria-label="Open filters"
        >
          <IconFilter size={20} />
          <span>Filters</span>
          {hasActiveFilters && <span className="filter__badge" />}
        </button>

        {/* Desktop Filter Controls */}
        <div className="filter__desktop-controls">
          <FilterDropdown
            icon={<IconTag size={18} />}
            label="Category"
            value={filters.category}
            options={categories}
            onChange={(value) => handleFilterChange('category', value)}
          />
          <FilterDropdown
            icon={<IconCalendar size={18} />}
            label="Date"
            value={filters.date}
            options={dateOptions}
            onChange={(value) => handleFilterChange('date', value)}
          />
          <FilterDropdown
            icon={<IconNews size={18} />}
            label="Source"
            value={filters.source}
            options={sources}
            onChange={(value) => handleFilterChange('source', value)}
          />
          {hasActiveFilters && (
            <button
              type="button"
              className="filter__clear-btn"
              onClick={clearAllFilters}
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div className="filter__overlay" onClick={closeDrawer}>
          <div className="filter__drawer" onClick={(e) => e.stopPropagation()}>
            <div className="filter__drawer-header">
              <h3 className="filter__drawer-title">Filters</h3>
              <button
                type="button"
                className="filter__close-btn"
                onClick={closeDrawer}
                aria-label="Close filters"
              >
                <IconX size={24} />
              </button>
            </div>

            <div className="filter__drawer-content">
              <div className="filter__drawer-section">
                <FilterDropdown
                  icon={<IconTag size={18} />}
                  label="Category"
                  value={filters.category}
                  options={categories}
                  onChange={(value) => handleFilterChange('category', value)}
                />
              </div>

              <div className="filter__drawer-section">
                <FilterDropdown
                  icon={<IconCalendar size={18} />}
                  label="Date"
                  value={filters.date}
                  options={dateOptions}
                  onChange={(value) => handleFilterChange('date', value)}
                />
              </div>

              <div className="filter__drawer-section">
                <FilterDropdown
                  icon={<IconNews size={18} />}
                  label="Source"
                  value={filters.source}
                  options={sources}
                  onChange={(value) => handleFilterChange('source', value)}
                />
              </div>
            </div>

            <div className="filter__drawer-footer">
              {hasActiveFilters && (
                <button
                  type="button"
                  className="filter__clear-btn filter__clear-btn--drawer"
                  onClick={clearAllFilters}
                >
                  Clear all filters
                </button>
              )}
              <button
                type="button"
                className="filter__apply-btn"
                onClick={closeDrawer}
              >
                Apply filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
