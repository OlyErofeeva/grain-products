import { useState } from 'react'
import { useProductList } from './utils/useProductList'

import Header from './components/Header/Header'
import Main from './components/Main/Main'

function App() {
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
      />
      <Main
        isFiltersPanelOpen={isFiltersPanelOpen}
        products={items}
        filter={filter}
        updateFilter={updateFilter}
        productsReqStatus={status}
        categoriesPresent={categoriesPresent}
      />
    </>
  )
}

export default App
