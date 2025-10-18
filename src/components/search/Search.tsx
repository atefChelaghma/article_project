import React, { useState, useCallback } from 'react'
import { IconSearch, IconX } from '@tabler/icons-react'
import './Search.scss'

interface SearchProps {
  onSearch?: (query: string) => void
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export const Search: React.FC<SearchProps> = ({
  onSearch,
  placeholder = 'Search articles...',
  value: controlledValue,
  onChange,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState('')

  const isControlled = controlledValue !== undefined
  const searchValue = isControlled ? controlledValue : internalValue

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value

      if (isControlled) {
        onChange?.(newValue)
      } else {
        setInternalValue(newValue)
      }
    },
    [isControlled, onChange]
  )

  const handleSearch = useCallback(() => {
    if (searchValue.trim()) {
      onSearch?.(searchValue.trim())
    }
  }, [searchValue, onSearch])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        handleSearch()
      }
    },
    [handleSearch]
  )

  const handleClear = useCallback(() => {
    if (isControlled) {
      onChange?.('')
    } else {
      setInternalValue('')
    }
    onSearch?.('')
  }, [isControlled, onChange, onSearch])

  const showClearButton = searchValue.length > 0

  return (
    <div className={`search ${className}`}>
      <div className="search__container">
        <div className="search__input-wrapper">
          <button
            type="button"
            className="search__search-btn"
            onClick={handleSearch}
            disabled={!searchValue.trim()}
            aria-label="Submit search"
          >
            <IconSearch
              className="search__icon search__icon--search"
              size={20}
            />
          </button>
          <input
            type="text"
            className="search__input"
            placeholder={placeholder}
            value={searchValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          {showClearButton && (
            <button
              type="button"
              className="search__clear-btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <IconX className="search__icon search__icon--clear" size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
