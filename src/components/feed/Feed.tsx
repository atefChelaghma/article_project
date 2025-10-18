import { useState, useRef, useEffect } from 'react'
import { IconAdjustmentsHorizontal } from '@tabler/icons-react'
import { useAppSelector, useAppDispatch } from '../../redux/store/store'
import {
  toggleFavoriteCategory,
  toggleFavoriteAuthor,
  toggleFavoriteSource,
} from '../../redux/features/favorites/favoritesSlice'
import { Drawer } from '../drawer'
import './Feed.scss'

export const Feed = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const feedButtonRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch()

  const { categories, authors, sources } = useAppSelector(
    (state) => state.favorites
  )

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  const handleToggleFavoriteCategory = (category: string) => {
    dispatch(toggleFavoriteCategory(category))
  }

  const handleToggleFavoriteAuthor = (author: string) => {
    dispatch(toggleFavoriteAuthor(author))
  }

  const handleToggleFavoriteSource = (source: string) => {
    dispatch(toggleFavoriteSource(source))
  }

  // Manage body scroll lock
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add('drawer-open')
    } else {
      document.body.classList.remove('drawer-open')
    }

    return () => {
      document.body.classList.remove('drawer-open')
    }
  }, [isDrawerOpen])

  return (
    <div className="feed">
      <button
        ref={feedButtonRef}
        className={`feed__button ${isDrawerOpen ? 'feed__button--active' : ''}`}
        onClick={handleToggleDrawer}
        aria-expanded={isDrawerOpen}
        aria-label="Open feed preferences"
      >
        <IconAdjustmentsHorizontal size={16} />
        <span className="feed__button-text">Feed</span>
      </button>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        favoriteCategories={categories}
        favoriteAuthors={authors}
        favoriteSources={sources}
        onToggleFavoriteCategory={handleToggleFavoriteCategory}
        onToggleFavoriteAuthor={handleToggleFavoriteAuthor}
        onToggleFavoriteSource={handleToggleFavoriteSource}
      />
    </div>
  )
}
