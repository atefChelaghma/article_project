import { IconX, IconHeart, IconUser, IconBuilding } from '@tabler/icons-react'
import './Drawer.scss'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  favoriteCategories: string[]
  favoriteAuthors: string[]
  favoriteSources: string[]
  onToggleFavoriteCategory: (category: string) => void
  onToggleFavoriteAuthor: (author: string) => void
  onToggleFavoriteSource: (source: string) => void
}

export const Drawer = ({
  isOpen,
  onClose,
  favoriteCategories,
  favoriteAuthors,
  favoriteSources,
  onToggleFavoriteCategory,
  onToggleFavoriteAuthor,
  onToggleFavoriteSource,
}: DrawerProps) => {
  const allCategories = [
    'general',
    'business',
    'technology',
    'entertainment',
    'health',
    'science',
    'sports',
  ]

  const allAuthors = [
    'Jennifer Scholtes',
    'Jordain Carney',
    'John Leicester',
    'Jeffrey Schaeffer',
    'Bill Kirkos',
    'Andy Rose',
  ]

  const allSources = [
    'Politico',
    'Associated Press',
    'CNN',
    'BBC News',
    'ABC News',
    'Reuters',
  ]

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="drawer__overlay" onClick={handleOverlayClick}>
          <div className={`drawer ${isOpen ? 'drawer--open' : ''}`}>
            {/* Header */}
            <div className="drawer__header">
              <h2 className="drawer__title">Feed Preferences</h2>
              <button
                className="drawer__close-button"
                onClick={onClose}
                aria-label="Close drawer"
              >
                <IconX size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="drawer__content">
              {/* Favorite Categories */}
              <div className="drawer__section">
                <div className="drawer__section-header">
                  <IconHeart size={16} />
                  <h3>Favorite Categories</h3>
                </div>
                <div className="drawer__list">
                  {allCategories.map((category) => (
                    <button
                      key={category}
                      className={`drawer__item ${
                        favoriteCategories.includes(category)
                          ? 'drawer__item--active'
                          : ''
                      }`}
                      onClick={() => onToggleFavoriteCategory(category)}
                    >
                      <span className="drawer__item-text">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                      {favoriteCategories.includes(category) && (
                        <IconHeart size={14} className="drawer__item-icon" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Favorite Authors */}
              <div className="drawer__section">
                <div className="drawer__section-header">
                  <IconUser size={16} />
                  <h3>Favorite Authors</h3>
                </div>
                <div className="drawer__list">
                  {allAuthors.map((author) => (
                    <button
                      key={author}
                      className={`drawer__item ${
                        favoriteAuthors.includes(author)
                          ? 'drawer__item--active'
                          : ''
                      }`}
                      onClick={() => onToggleFavoriteAuthor(author)}
                    >
                      <span className="drawer__item-text">{author}</span>
                      {favoriteAuthors.includes(author) && (
                        <IconHeart size={14} className="drawer__item-icon" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Favorite Sources */}
              <div className="drawer__section">
                <div className="drawer__section-header">
                  <IconBuilding size={16} />
                  <h3>Favorite Sources</h3>
                </div>
                <div className="drawer__list">
                  {allSources.map((source) => (
                    <button
                      key={source}
                      className={`drawer__item ${
                        favoriteSources.includes(source)
                          ? 'drawer__item--active'
                          : ''
                      }`}
                      onClick={() => onToggleFavoriteSource(source)}
                    >
                      <span className="drawer__item-text">{source}</span>
                      {favoriteSources.includes(source) && (
                        <IconHeart size={14} className="drawer__item-icon" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Overlay */}
      {isOpen && (
        <div
          className="drawer__desktop-overlay"
          onClick={handleOverlayClick}
        ></div>
      )}

      {/* Desktop Menu */}
      <div
        className={`drawer__desktop ${isOpen ? 'drawer__desktop--open' : ''}`}
      >
        <div className="drawer__desktop-content">
          {/* Desktop Header */}
          <div className="drawer__desktop-header">
            <h3 className="drawer__desktop-title">Feed Preferences</h3>
            <button
              className="drawer__desktop-close-button"
              onClick={onClose}
              aria-label="Close drawer"
            >
              <IconX size={20} />
            </button>
          </div>

          {/* Desktop Categories */}
          <div className="drawer__desktop-section">
            <div className="drawer__section-header drawer__section-header--desktop">
              <IconHeart size={14} />
              <h4>Categories</h4>
            </div>
            <div className="drawer__desktop-list">
              {allCategories.map((category) => (
                <button
                  key={category}
                  className={`drawer__desktop-item ${
                    favoriteCategories.includes(category)
                      ? 'drawer__desktop-item--active'
                      : ''
                  }`}
                  onClick={() => onToggleFavoriteCategory(category)}
                >
                  <span className="drawer__desktop-item-text">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                  {favoriteCategories.includes(category) && (
                    <IconHeart
                      size={12}
                      className="drawer__desktop-item-icon"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Authors */}
          <div className="drawer__desktop-section">
            <div className="drawer__section-header drawer__section-header--desktop">
              <IconUser size={14} />
              <h4>Authors</h4>
            </div>
            <div className="drawer__desktop-list">
              {allAuthors.map((author) => (
                <button
                  key={author}
                  className={`drawer__desktop-item ${
                    favoriteAuthors.includes(author)
                      ? 'drawer__desktop-item--active'
                      : ''
                  }`}
                  onClick={() => onToggleFavoriteAuthor(author)}
                >
                  <span className="drawer__desktop-item-text">{author}</span>
                  {favoriteAuthors.includes(author) && (
                    <IconHeart
                      size={12}
                      className="drawer__desktop-item-icon"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Sources */}
          <div className="drawer__desktop-section">
            <div className="drawer__section-header drawer__section-header--desktop">
              <IconBuilding size={14} />
              <h4>Sources</h4>
            </div>
            <div className="drawer__desktop-list">
              {allSources.map((source) => (
                <button
                  key={source}
                  className={`drawer__desktop-item ${
                    favoriteSources.includes(source)
                      ? 'drawer__desktop-item--active'
                      : ''
                  }`}
                  onClick={() => onToggleFavoriteSource(source)}
                >
                  <span className="drawer__desktop-item-text">{source}</span>
                  {favoriteSources.includes(source) && (
                    <IconHeart
                      size={12}
                      className="drawer__desktop-item-icon"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
