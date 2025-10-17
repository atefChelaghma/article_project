import articlesReducer, {
  fetchArticles,
  clearArticles,
} from '../../src/redux/features/articles/articlesSlice'
import { configureStore } from '@reduxjs/toolkit'

// Helper to create isolated store for slice tests
function makeStore() {
  return configureStore({
    reducer: { articles: articlesReducer },
  })
}

describe('articlesSlice', () => {
  test('initial state', () => {
    const store = makeStore()
    expect(store.getState().articles).toEqual({
      articles: [],
      loading: false,
      error: null,
      lastFetched: null,
    })
  })

  test('fetchArticles -> fulfilled populates articles', async () => {
    const store = makeStore()
    const actionPromise = store.dispatch(fetchArticles())
    // Immediately after dispatch, loading should be true
    expect(store.getState().articles.loading).toBe(true)
    await actionPromise
    const state = store.getState().articles
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
    expect(state.articles.length).toBeGreaterThan(0)
    expect(typeof state.lastFetched).toBe('number')
  })

  test('clearArticles resets articles and metadata', async () => {
    const store = makeStore()
    await store.dispatch(fetchArticles())
    store.dispatch(clearArticles())
    expect(store.getState().articles).toEqual({
      articles: [],
      loading: false, // stays false
      error: null,
      lastFetched: null,
    })
  })

  test('handles fetchArticles rejection gracefully', async () => {
    // Temporarily monkey patch readCache/writeCache scenario by simulating a thrown error.
    // We can mock the thunk by dispatching a rejected action directly.
    const store = makeStore()
    const rejectedAction = {
      type: fetchArticles.rejected.type,
      payload: 'Network error',
    }
    store.dispatch(rejectedAction)
    const state = store.getState().articles
    expect(state.loading).toBe(false)
    expect(state.error).toBe('Network error')
  })
})
