import styles from './Main.module.scss'
import { useMediaQuery } from 'react-responsive'
import { useCategoryList } from '../ProductFilters/useCategoryList'

import Preloader from '../ui/Preloader/Preloader'
import SearchResultMessage from '../ui/SearchResultMessage/SearchResultMessage'
import ProductFilters from '../ProductFilters/ProductFilters'
import ProductList from '../ProductList/ProductList'

const Main = ({ isFiltersPanelOpen, products, filter, updateFilter, productsReqStatus, categoriesPresent }) => {
  const isMobile = useMediaQuery({ query: 'screen and (max-width: 414px)' })
  const { items: categoriesAll, status: categoryReqStatus } = useCategoryList()

  const renderProductSearchResult = () => {
    switch (true) {
      case productsReqStatus === 'work': {
        return <Preloader />
      }
      case productsReqStatus === 'error': {
        return (
          <SearchResultMessage
            title="Internal Server Error"
            description="Sorry, there were some technical issues while processing your request. Please try again"
          />
        )
      }
      case productsReqStatus === 'success' && products.length === 0: {
        return (
          <SearchResultMessage
            title="Nothing matched your search"
            description="Please try some different filters or keywords"
          />
        )
      }
      case productsReqStatus === 'success' && products.length > 0: {
        return <ProductList products={products} />
      }
      default: {
        return null
      }
    }
  }

  return (
    <main className={styles.root}>
      {(!isMobile || isFiltersPanelOpen) && (
        <ProductFilters
          filter={filter}
          updateFilter={updateFilter}
          categoriesPresent={categoriesPresent}
          categoriesAll={categoriesAll}
          categoryReqStatus={categoryReqStatus}
        />
      )}
      {renderProductSearchResult()}
    </main>
  )
}

export default Main
