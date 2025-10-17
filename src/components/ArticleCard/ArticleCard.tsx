import React from 'react'
import type { ArticleCardProps } from './types'
import type { Article } from '../../redux/features/articles/articlesSlice'
import './ArticleCard.css'

// Estimate reading time using content or description (200 wpm baseline)
function estimateReadMinutes(article: Article): number {
  const text = [article.content, article.description].filter(Boolean).join(' ')
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return 1
  return Math.max(1, Math.round(words.length / 200))
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const readMins = estimateReadMinutes(article)
  const dateStr = new Date(article.publishedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })

  return (
    <article
      className="article-card"
      aria-labelledby={`art-title-${article.id}`}
    >
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="article-card__image-wrapper"
        aria-label={article.title}
      >
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="article-card__image"
            loading="lazy"
          />
        ) : (
          <div
            className="article-card__image article-card__image--placeholder"
            aria-hidden="true"
          />
        )}
      </a>
      <div className="article-card__body">
        <h3 id={`art-title-${article.id}`} className="article-card__title">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>
        {article.description && (
          <p className="article-card__description">{article.description}</p>
        )}
        <div className="article-card__meta" aria-label="Article metadata">
          <span
            className="article-card__author"
            title={article.author || 'Unknown author'}
          >
            {article.author || 'Unknown author'}
          </span>
          <span className="article-card__bullet" aria-hidden="true">
            •
          </span>
          <span className="article-card__source" title={article.source.name}>
            {article.source.name}
          </span>
          <span className="article-card__bullet" aria-hidden="true">
            •
          </span>
          <span className="article-card__date" title={article.publishedAt}>
            {dateStr}
          </span>
          <span className="article-card__bullet" aria-hidden="true">
            •
          </span>
          <span
            className="article-card__readtime"
            aria-label={`Estimated read time ${readMins} minutes`}
          >
            {readMins} min read
          </span>
        </div>
      </div>
    </article>
  )
}

export default ArticleCard
