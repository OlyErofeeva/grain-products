import { useState } from 'react'
import styles from './ProductSearch.module.scss'
import { Filter, FilterChange } from '../../types/api'
import RequestStatus from '../../utils/requestStatuses'

type ProductSearchProps = {
  filter: Filter
  updateFilter: (filter?: FilterChange) => void
  productsReqStatus: RequestStatus
}

const ProductSearch: React.FC<ProductSearchProps> = ({ filter, updateFilter, productsReqStatus }) => {
  const [value, setValue] = useState('')

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)
  }

  const handleSubmit = (evt: React.FormEvent) => {
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
        disabled={productsReqStatus === RequestStatus.WORK}
      />
    </form>
  )
}

export default ProductSearch
