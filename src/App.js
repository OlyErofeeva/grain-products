import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useProductList } from './utils/useProductList'
import { BP_MOBILE } from './utils/breakpoints'

import Header from './components/Header/Header'
import Main from './components/Main/Main'

function App() {
  const isMobile = useMediaQuery({ query: `screen and (max-width: ${BP_MOBILE})` })
  const { items, categoriesPresent, status, filter, updateFilter } = useProductList()
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(false)
  const handleFilterButtonClick = () => {
    setIsFiltersPanelOpen(!isFiltersPanelOpen)
  }

  return (
    <>
      <Header
        onFilterButtonClick={handleFilterButtonClick}
        filter={filter}
        updateFilter={updateFilter}
        productsReqStatus={status}
        isMobile={isMobile}
      />
      <Main
        isFiltersPanelOpen={isFiltersPanelOpen}
        products={items}
        filter={filter}
        updateFilter={updateFilter}
        productsReqStatus={status}
        categoriesPresent={categoriesPresent}
        isMobile={isMobile}
      />
    </>
  )
}

export default App
