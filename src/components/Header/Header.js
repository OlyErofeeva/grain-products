import styles from './Header.module.scss'
import { useMediaQuery } from 'react-responsive'

import ProductSearch from '../ProductSearch/ProductSearch'

const Header = () => {
  const isMobile = useMediaQuery({ query: 'screen and (max-width: 414px)' })

  return (
    <header className={styles.root}>
      <div className={styles.content}>
        <h1 className={styles.title}>Products</h1>
        {!isMobile && <ProductSearch />}
      </div>
    </header>
  )
}

export default Header
