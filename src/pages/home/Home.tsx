import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'

import './Home.scss'
import { fetchArticles } from '../../redux/features/articles/articlesSlice'
import ArticleCard from '../../components/articleCard/ArticleCard'
import { type FilterState } from '../../components/filter'

const Home = () => {
  const dispatch = useAppDispatch()
  const { articles, loading, error } = useAppSelector((state) => state.articles)
  const [searchQuery] = useState('')
  const [filters] = useState<FilterState>({
    category: '',
    date: '',
    source: '',
  })

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

  // const handleSearch = (query: string) => {
  //   setSearchQuery(query)
  // }

  // const handleFilterChange = (newFilters: FilterState) => {
  //   setFilters(newFilters)
  // }

  // Filter articles based on search query and filters
  const filteredArticles = articles.filter((article) => {
    // Search filter
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter (you might need to add category field to your article type)
    const matchesCategory =
      filters.category === '' ||
      article.source?.name
        ?.toLowerCase()
        .includes(filters.category.toLowerCase())

    // Source filter
    const matchesSource =
      filters.source === '' || article.source?.id === filters.source

    // Date filter (you might need to implement date logic based on article.publishedAt)
    const matchesDate = filters.date === '' || true // Implement date filtering logic

    return matchesSearch && matchesCategory && matchesSource && matchesDate
  })

  // console.log removed for test cleanliness

  if (loading) {
    return (
      <div className="home">
        <h1 className="home__title">News Sources</h1>
        <div className="home__status home__status--loading">
          Loading articles...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="home">
        <h1 className="home__title">News Sources</h1>
        <div className="home__status home__status--error">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="home">
      <h1 className="home__title">News Sources</h1>
      <div className="home__controls"></div>
      <div className="home__grid">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Home
