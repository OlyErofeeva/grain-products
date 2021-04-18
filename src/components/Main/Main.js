import styles from './Main.module.scss'
import { useMediaQuery } from 'react-responsive'

import ProductFilters from '../ProductFilters/ProductFilters'
import ProductList from '../ProductList/ProductList'

const Main = ({ isFiltersPanelOpen, products, filter, updateFilter }) => {
  const isMobile = useMediaQuery({ query: 'screen and (max-width: 414px)' })

  return (
    <main className={styles.root}>
      {(!isMobile || isFiltersPanelOpen) && <ProductFilters filter={filter} updateFilter={updateFilter} />}
      <ProductList products={products} />
    </main>
  )
}

export default Main
