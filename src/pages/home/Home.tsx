import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/store'

import './Home.scss'
import { fetchArticles } from '../../redux/features/articles/articlesSlice'
import ArticleCard from '../../components/ArticleCard/ArticleCard'

const Home = () => {
  const dispatch = useAppDispatch()
  const { articles, loading, error } = useAppSelector((state) => state.articles)

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

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
      <div className="home__grid">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Home
