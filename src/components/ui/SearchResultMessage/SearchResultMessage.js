import styles from './SearchResultMessage.module.scss'

const SearchResultMessage = ({ title = '', description = '' }) => {
  return (
    <div className={styles.root}>
      {title && <p className={styles.title}>{title}</p>}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}

export default SearchResultMessage
