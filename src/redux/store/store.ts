import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import sourcesReducer from '../features/articles/sourcesSlice'
import articlesReducer from '../features/articles/articlesSlice'

export const store = configureStore({
  reducer: {
    sources: sourcesReducer,
    articles: articlesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: <TSelected>(
  selector: (state: RootState) => TSelected
) => TSelected = useSelector
