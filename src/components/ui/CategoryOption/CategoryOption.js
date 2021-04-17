import styles from './CategoryOption.module.scss'

const CategoryOption = ({ caption, isSelected, isDisabled, onClick }) => {
  return (
    <button
      className={`${styles.root} ${isSelected ? styles.root_selected : styles.root_default}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {caption}
    </button>
  )
}

export default CategoryOption
