import styles from './ProductSearch.module.scss'

// TODO: input should be disabled while loading
// TODO: probably need to add a name property for the form tag
// TODO: form submit handler (on Enter, on pause)
// TODO: input value onChange handler

const ProductSearch = () => {
  return (
    <form className={styles.root} noValidate>
      <input className={styles.searchInput} placeholder="Search among products" type="text" required />
    </form>
  )
}

export default ProductSearch
