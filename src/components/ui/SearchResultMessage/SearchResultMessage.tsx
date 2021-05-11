import styles from './SearchResultMessage.module.scss'

type SearchResultMessageProps = {
  title: string
  description?: string
}

const SearchResultMessage: React.FC<SearchResultMessageProps> = ({ title, description = '' }) => {
  return (
    <div className={styles.root}>
      {title && <p className={styles.title}>{title}</p>}
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}

export default SearchResultMessage
