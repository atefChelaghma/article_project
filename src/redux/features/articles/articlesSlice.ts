import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// NewsAPI article shape (we store only needed fields)
export interface Article {
  id: string // generated locally (NewsAPI does not provide a stable id)
  title: string
  description: string | null
  url: string
  urlToImage?: string | null
  publishedAt: string
  author?: string | null
  source: {
    id?: string | null
    name: string
  }
  content?: string | null
}

interface ArticlesState {
  articles: Article[]
  loading: boolean
  error: string | null
  lastFetched: number | null
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
  lastFetched: null,
}

// Fetch top US headlines from NewsAPI
type NewsApiArticle = {
  source: { id: string | null; name: string }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

// --- Cache configuration ---
const CACHE_KEY = 'cache:top-headlines-us'
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

interface ArticlesCacheShape {
  timestamp: number
  articles: Article[]
}

function readCache(): Article[] | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed: ArticlesCacheShape = JSON.parse(raw)
    if (!parsed.timestamp || !Array.isArray(parsed.articles)) return null
    const age = Date.now() - parsed.timestamp
    if (age > CACHE_TTL_MS) return null
    return parsed.articles
  } catch {
    return null
  }
}

function writeCache(articles: Article[]): void {
  if (typeof window === 'undefined') return
  try {
    const payload: ArticlesCacheShape = { timestamp: Date.now(), articles }
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload))
  } catch {
    // Silently ignore quota / serialization errors
  }
}

export const fetchArticles = createAsyncThunk<
  Article[],
  void,
  { rejectValue: string }
>('articles/fetchArticles', async (_: void, { rejectWithValue }) => {
  // 1. Try cache first
  const cached = readCache()
  if (cached && cached.length) {
    return cached
  }

  // --- MOCKED RESPONSE: Commented out real API call below ---
  // const apiKey = import.meta.env.VITE_NEWS_API_KEY
  // if (!apiKey) {
  //   return rejectWithValue('Missing NewsAPI key (VITE_NEWS_API_KEY)')
  // }
  // const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`

  const mockArticlesRaw: NewsApiArticle[] = [
    {
      source: { id: 'politico', name: 'Politico' },
      author: 'Jennifer Scholtes, Jordain Carney',
      title:
        'Senate rejects funding patch for 10th time amid shutdown stalemate - Politico',
      description:
        'Senate Majority Leader John Thune said he hopes new movement on regular funding bills can lead to “an offramp.”',
      url: 'https://www.politico.com/live-updates/2025/10/16/congress/senate-rejects-funding-patch-for-10th-time-amid-shutdown-stalemate-00611277',
      urlToImage:
        'https://www.politico.com/dims4/default/ebe43b4/2147483647/resize/1200x/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2F81%2F26%2F159b3061490994467873ca4f3e75%2Fu-s-congress-20068.jpg',
      publishedAt: '2025-10-16T15:50:31Z',
      content: null,
    },
    {
      source: { id: null, name: 'BBC News' },
      author: 'https://www.facebook.com/bbcnews',
      title: "'I am speaking to President Putin now,' Trump says - BBC",
      description:
        'The US president says: "The conversation is ongoing, a lengthy one, and I will report the contents, as will President Putin, at its conclusion."',
      url: 'https://www.bbc.com/news/live/cy85d9613zxt',
      urlToImage:
        'https://ichef.bbci.co.uk/ace/branded_news/1200/cpsprodpb/2ac6/live/36078f40-aaab-11f0-8051-295629adf78e.jpg',
      publishedAt: '2025-10-16T15:46:49Z',
      content:
        "Bernd Debusmann JrReporting from the White House After a relatively quiet morning here at the White House, it's suddenly buzzing with activity...",
    },
    {
      source: { id: 'bloomberg', name: 'Bloomberg' },
      author: 'Monica Raymunt, Christina Kyriasoglou, William Wilkes',
      title:
        'Carmakers Push to Secure Chips as China Trade Spat Escalates - Bloomberg.com',
      description:
        'Automakers are bracing for fresh potential chip disruption, with China’s retaliatory export controls on an obscure Dutch supplier threatening to set off a chain reaction that could halt production lines.',
      url: 'https://www.bloomberg.com/news/articles/2025-10-16/carmakers-push-to-secure-chips-as-china-trade-spat-escalates',
      urlToImage:
        'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/isGLYH8NqjTM/v1/1200x800.jpg',
      publishedAt: '2025-10-16T14:46:47Z',
      content: 'Automakers are bracing for fresh potential chip disruption...',
    },
    {
      source: { id: null, name: '9to5Mac' },
      author: 'Ryan Christoffel',
      title:
        'M5 MacBook Pro vs M4 MacBook Pro: What’s actually changed? - 9to5Mac',
      description:
        'M5 MacBook Pro vs M4 MacBook Pro: What’s actually changed with the new model? Not a lot. Here are four differences.',
      url: 'https://9to5mac.com/2025/10/16/m5-macbook-pro-vs-m4-macbook-pro-whats-actually-changed/',
      urlToImage:
        'https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2025/10/macbook-pro-m5-vs-m4.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1',
      publishedAt: '2025-10-16T14:32:00Z',
      content: 'Apple launched a trio of new M5 products this week...',
    },
    {
      source: { id: 'associated-press', name: 'Associated Press' },
      author: 'John Leicester, Jeffrey Schaeffer',
      title:
        'Embattled French Prime Minister Sébastien Lecornu survives no-confidence votes in Parliament - AP News',
      description:
        "French Prime Minister Sébastien Lecornu has survived two votes of no-confidence that could have toppled his fragile new government. The National Assembly's decision Thursday clears the way for Lecornu to focus on a significant challenge: passing a 2026 budget…",
      url: 'https://apnews.com/article/france-politics-sebastien-lecornu-parliament-e3297b41977f46aca1cb0d18b919724a',
      urlToImage:
        'https://dims.apnews.com/dims4/default/de56abe/2147483647/strip/true/crop/2679x1507+0+140/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F8f%2Fd6%2Ffc10700f1cde9a25cfc353408113%2Fabc33e7a0868457897051e00c68e67f6',
      publishedAt: '2025-10-16T14:19:00Z',
      content:
        'PARIS (AP) French Prime Minister Sébastien Lecornu survived two votes...',
    },
    {
      source: { id: 'cnn', name: 'CNN' },
      author: 'Bill Kirkos, Andy Rose',
      title:
        'Federal judge demands answers from Trump admin on following order to avoid violent encounters with Chicago protesters - CNN',
      description:
        'A judge in Illinois said she has “serious concerns” over whether federal law enforcement agents are following her order to avoid violent encounters with protesters and journalists in Chicago.',
      url: 'https://www.cnn.com/2025/10/16/us/illinois-judge-trump-chicago-protesters',
      urlToImage:
        'https://media.cnn.com/api/v1/images/stellar/prod/2025-10-14t200541z-1992415785-rc2ubha48vlc-rtrmadp-3-usa-trump-chicago.jpg?c=16x9&q=w_800,c_fill',
      publishedAt: '2025-10-16T14:08:29Z',
      content: 'A judge in Illinois said she has serious concerns...',
    },
  ]

  try {
    // Real network logic replaced with local mock mapping
    const mapped: Article[] = mockArticlesRaw.map((a, idx) => ({
      id: a.url || String(idx),
      title: a.title,
      description: a.description,
      url: a.url,
      urlToImage: a.urlToImage,
      publishedAt: a.publishedAt,
      author: a.author,
      source: {
        id: a.source?.id ?? null,
        name: a.source?.name ?? 'Unknown',
      },
      content: a.content ?? null,
    }))

    // Persist to cache
    writeCache(mapped)

    return mapped
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : 'Network error while fetching articles'
    return rejectWithValue(message)
  }
})

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    // Simple manual clear if needed
    clearArticles(state) {
      state.articles = []
      state.lastFetched = null
      state.error = null
    },
    clearArticlesCache() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CACHE_KEY)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false
        state.articles = action.payload
        state.lastFetched = Date.now()
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearArticles } = articlesSlice.actions
export default articlesSlice.reducer
