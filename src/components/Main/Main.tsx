import styles from './Main.module.scss'
import { useCategoryList } from '../../utils/useCategoryList'
import { Filter, FilterChange, Product } from '../../types/api'
import RequestStatus from '../../utils/requestStatuses'

import Preloader from '../ui/Preloader/Preloader'
import SearchResultMessage from '../ui/SearchResultMessage/SearchResultMessage'
import ProductFilters from '../ProductFilters/ProductFilters'
import ProductList from '../ProductList/ProductList'

type MainProps = {
  isFiltersPanelOpen: boolean
  products: Product[]
  filter: Filter
  updateFilter: (filter?: FilterChange) => void
  productsReqStatus: RequestStatus
  categoriesPresent: Set<string>
  isMobile: boolean
}

const Main: React.FC<MainProps> = ({
  isFiltersPanelOpen,
  products,
  filter,
  updateFilter,
  productsReqStatus,
  categoriesPresent,
  isMobile,
}) => {
  const { items: categoriesAll, status: categoryReqStatus } = useCategoryList()

  const renderProductSearchResult = () => {
    switch (true) {
      case productsReqStatus === RequestStatus.WORK: {
        return <Preloader />
      }
      case productsReqStatus === RequestStatus.ERROR: {
        return (
          <SearchResultMessage
            title="Internal Server Error"
            description="Sorry, there were some technical issues while processing your request. Please try again"
          />
        )
      }
      case productsReqStatus === RequestStatus.SUCCESS && products.length === 0: {
        return (
          <SearchResultMessage
            title="Nothing matched your search"
            description="Please try some different filters or keywords"
          />
        )
      }
      case productsReqStatus === RequestStatus.SUCCESS && products.length > 0: {
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
