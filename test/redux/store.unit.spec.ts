import { configureStore } from '@reduxjs/toolkit'
import sourcesReducer, {
  fetchSources,
} from '../../src/redux/features/articles/sourcesSlice'
import articlesReducer, {
  fetchArticles,
} from '../../src/redux/features/articles/articlesSlice'

// Build an isolated store instance for testing (avoid sharing app's singleton)
function buildStore() {
  return configureStore({
    reducer: {
      sources: sourcesReducer,
      articles: articlesReducer,
    },
  })
}

describe('Redux store integration', () => {
  it('has expected initial state slices', () => {
    const store = buildStore()
    const state = store.getState()
    expect(state.sources).toEqual({ sources: [], loading: false, error: null })
    expect(state.articles).toEqual({
      articles: [],
      loading: false,
      error: null,
      lastFetched: null,
    })
  })

  it('fetchSources populates sources', async () => {
    const store = buildStore()
    await store.dispatch(fetchSources())
    const { sources, loading, error } = store.getState().sources
    expect(loading).toBe(false)
    expect(error).toBeNull()
    expect(sources.length).toBeGreaterThan(0)
  })

  it('fetchArticles populates articles (mocked)', async () => {
    const store = buildStore()
    await store.dispatch(fetchArticles())
    const { articles, loading, error, lastFetched } = store.getState().articles
    expect(loading).toBe(false)
    expect(error).toBeNull()
    expect(articles.length).toBeGreaterThan(0)
    expect(typeof lastFetched).toBe('number')
  })
})
