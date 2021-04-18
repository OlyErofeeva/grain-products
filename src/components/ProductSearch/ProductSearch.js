import { useState } from 'react'
import styles from './ProductSearch.module.scss'

const ProductSearch = ({ filter, updateFilter, productsReqStatus }) => {
  const [value, setValue] = useState('')

  const handleChange = evt => {
    setValue(evt.target.value)
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    if (value !== filter.search) {
      updateFilter({ search: value })
    }
  }

  return (
    <form className={styles.root} noValidate onSubmit={handleSubmit}>
      <input
        className={styles.searchInput}
        type="text"
        required
        placeholder="Search among products"
        value={value}
        onChange={handleChange}
        onBlur={handleSubmit}
        disabled={productsReqStatus === 'work'}
      />
    </form>
  )
}

export default ProductSearch
