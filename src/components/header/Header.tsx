import { Feed } from '../feed/Feed'
import { Filter } from '../filter'
import { Search } from '../search'
import './Header.scss'

const Header = () => {
  //   const dispatch = useAppDispatch()
  //   const { articles, loading, error } = useAppSelector((state) => state.articles)

  //   useEffect(() => {
  //     dispatch(fetchArticles())
  //   }, [dispatch])
  //       const [searchQuery, setSearchQuery] = useState('')

  //       const handleSearch = (query: string) => {
  //     setSearchQuery(query)
  //     // You can add search logic here later
  //     console.log('Searching for:', query)
  //   }

  // Filter articles based on search query
  //   const filteredArticles = articles.filter(article =>
  //     searchQuery === '' ||
  //     article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     article.description?.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  return (
    <header className="header">
      <div className="header__search-container">
        <button className="header__logo">N</button>
        <Search />
        <Feed />
      </div>
      <div className="header__filter-container">
        <Filter onFilterChange={() => {}} initialFilters={() => {}} />
      </div>
    </header>
  )
}

export default Header
