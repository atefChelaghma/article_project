import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ArticleCard from '../../src/components/ArticleCard/ArticleCard'
import type { Article } from '../../src/redux/features/articles/articlesSlice'

function buildArticle(partial: Partial<Article> = {}): Article {
  return {
    id: 'id-1',
    title: 'Sample Headline',
    description: 'A short description about the article content for testing.',
    url: 'https://example.com/article',
    urlToImage: null,
    publishedAt: '2025-10-16T15:50:31Z',
    author: 'Jane Doe',
    source: { id: 'source-1', name: 'Example Source' },
    content:
      'Some longer body content that would be used to estimate reading time.',
    ...partial,
  }
}

describe('ArticleCard', () => {
  it('renders title, author, source, date and read time', () => {
    render(<ArticleCard article={buildArticle()} />)
    expect(
      screen.getByRole('heading', { name: /sample headline/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/jane doe/i)).toBeInTheDocument()
    expect(screen.getByText(/example source/i)).toBeInTheDocument()
    const date = screen.getByText((content: string, node) => {
      if (!/\d{1,2}/.test(content)) return false
      return node !== null && node.classList.contains('article-card__date')
    })
    expect(date).toBeInTheDocument()
    expect(screen.getByText(/min read/i)).toBeInTheDocument()
  })

  it('falls back to Unknown author when author missing', () => {
    const art = buildArticle({ author: null })
    render(<ArticleCard article={art} />)
    expect(screen.getByText(/unknown author/i)).toBeInTheDocument()
  })
})
