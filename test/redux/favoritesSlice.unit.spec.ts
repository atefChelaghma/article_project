import favoritesReducer, {
  toggleFavoriteCategory,
  toggleFavoriteAuthor,
  toggleFavoriteSource,
  clearAllFavorites,
} from '../../src/redux/features/favorites/favoritesSlice'

describe('favoritesSlice', () => {
  const initialState = {
    categories: [],
    authors: [],
    sources: [],
  }

  it('should return the initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    )
  })

  describe('toggleFavoriteCategory', () => {
    it('should add a category to favorites', () => {
      const actual = favoritesReducer(
        initialState,
        toggleFavoriteCategory('technology')
      )
      expect(actual.categories).toEqual(['technology'])
    })

    it('should remove a category from favorites if already present', () => {
      const stateWithCategory = { ...initialState, categories: ['technology'] }
      const actual = favoritesReducer(
        stateWithCategory,
        toggleFavoriteCategory('technology')
      )
      expect(actual.categories).toEqual([])
    })

    it('should handle multiple categories', () => {
      const stateWithCategory = { ...initialState, categories: ['technology'] }
      const actual = favoritesReducer(
        stateWithCategory,
        toggleFavoriteCategory('business')
      )
      expect(actual.categories).toEqual(['technology', 'business'])
    })
  })

  describe('toggleFavoriteAuthor', () => {
    it('should add an author to favorites', () => {
      const actual = favoritesReducer(
        initialState,
        toggleFavoriteAuthor('John Doe')
      )
      expect(actual.authors).toEqual(['John Doe'])
    })

    it('should remove an author from favorites if already present', () => {
      const stateWithAuthor = { ...initialState, authors: ['John Doe'] }
      const actual = favoritesReducer(
        stateWithAuthor,
        toggleFavoriteAuthor('John Doe')
      )
      expect(actual.authors).toEqual([])
    })

    it('should handle multiple authors', () => {
      const stateWithAuthor = { ...initialState, authors: ['John Doe'] }
      const actual = favoritesReducer(
        stateWithAuthor,
        toggleFavoriteAuthor('Jane Smith')
      )
      expect(actual.authors).toEqual(['John Doe', 'Jane Smith'])
    })
  })

  describe('toggleFavoriteSource', () => {
    it('should add a source to favorites', () => {
      const actual = favoritesReducer(initialState, toggleFavoriteSource('CNN'))
      expect(actual.sources).toEqual(['CNN'])
    })

    it('should remove a source from favorites if already present', () => {
      const stateWithSource = { ...initialState, sources: ['CNN'] }
      const actual = favoritesReducer(
        stateWithSource,
        toggleFavoriteSource('CNN')
      )
      expect(actual.sources).toEqual([])
    })

    it('should handle multiple sources', () => {
      const stateWithSource = { ...initialState, sources: ['CNN'] }
      const actual = favoritesReducer(
        stateWithSource,
        toggleFavoriteSource('BBC')
      )
      expect(actual.sources).toEqual(['CNN', 'BBC'])
    })
  })

  describe('clearAllFavorites', () => {
    it('should clear all favorites', () => {
      const stateWithFavorites = {
        categories: ['technology', 'business'],
        authors: ['John Doe', 'Jane Smith'],
        sources: ['CNN', 'BBC'],
      }
      const actual = favoritesReducer(stateWithFavorites, clearAllFavorites())
      expect(actual).toEqual(initialState)
    })
  })
})
