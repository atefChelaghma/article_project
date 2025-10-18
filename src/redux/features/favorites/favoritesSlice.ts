import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface FavoritesState {
  categories: string[]
  authors: string[]
  sources: string[]
}

const initialState: FavoritesState = {
  categories: [],
  authors: [],
  sources: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavoriteCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload
      const index = state.categories.indexOf(category)
      if (index === -1) {
        state.categories.push(category)
      } else {
        state.categories.splice(index, 1)
      }
    },
    toggleFavoriteAuthor: (state, action: PayloadAction<string>) => {
      const author = action.payload
      const index = state.authors.indexOf(author)
      if (index === -1) {
        state.authors.push(author)
      } else {
        state.authors.splice(index, 1)
      }
    },
    toggleFavoriteSource: (state, action: PayloadAction<string>) => {
      const source = action.payload
      const index = state.sources.indexOf(source)
      if (index === -1) {
        state.sources.push(source)
      } else {
        state.sources.splice(index, 1)
      }
    },
    clearAllFavorites: (state) => {
      state.categories = []
      state.authors = []
      state.sources = []
    },
  },
})

export const {
  toggleFavoriteCategory,
  toggleFavoriteAuthor,
  toggleFavoriteSource,
  clearAllFavorites,
} = favoritesSlice.actions

export default favoritesSlice.reducer
