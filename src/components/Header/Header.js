import styles from './Header.module.scss'

import ProductSearch from '../ProductSearch/ProductSearch'
import FilterButton from '../ui/FilterButton/FilterButton'

const Header = ({ onFilterButtonClick, filter, updateFilter, productsReqStatus, isMobile }) => {
  return (
    <header className={styles.root}>
      <div className={styles.mainPanel}>
        <div className={styles.content}>
          <h1 className={styles.title}>Products</h1>
          {!isMobile && (
            <ProductSearch filter={filter} updateFilter={updateFilter} productsReqStatus={productsReqStatus} />
          )}
        </div>
      </div>
      {isMobile && (
        <div className={styles.additionalPanel}>
          <ProductSearch filter={filter} updateFilter={updateFilter} productsReqStatus={productsReqStatus} />
          <FilterButton classNameExt={styles.filtersButton} onClick={onFilterButtonClick} />
        </div>
      )}
    </header>
  )
}

export default Header
