import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'

import './Home.css'
import { fetchArticles } from '../../redux/features/articles/articlesSlice'
import ArticleCard from './ArticleCard'

const Home = () => {
  const dispatch = useAppDispatch()
  const { articles, loading, error } = useAppSelector((state) => state.articles)

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

  console.log(articles)

  if (loading) {
    return (
      <div className="home-container">
        <h1>News Sources</h1>
        <div className="loading-message">Loading articles...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="home-container">
        <h1>News Sources</h1>
        <div className="error-message">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="home-container">
      <h1>News Sources</h1>
      <div className="articles-grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Home
