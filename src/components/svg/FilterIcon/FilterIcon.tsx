import styles from './FilterIcon.module.scss'

type FilterIconProps = {
  isLight?: boolean
}

const FilterIcon: React.FC<FilterIconProps> = ({ isLight }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        className={isLight ? `${styles.light}` : `${styles.accent}`}
        d="M17 21L19 21L19 15L17 15L17 21ZM5 21L7 21L7 11L5 11L5 21ZM21 11L19 11L19 3L17 3L17 11L15 11L15 13L21 13L21 11ZM9 17L11 17L11 21L13 21L13 17L15 17L15 15L9 15L9 17ZM13 3L11 3L11 13L13 13L13 3ZM9 9L9 7L7 7L7 3L5 3L5 7L3 7L3 9L9 9Z"
      />
    </svg>
  )
}

export default FilterIcon
