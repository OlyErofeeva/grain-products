import { ButtonHTMLAttributes } from 'react'
import styles from './CategoryOption.module.scss'

type CategoryOptionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  caption: string
  isSelected: boolean
  isDisabled: boolean
}

const CategoryOption: React.FC<CategoryOptionProps> = ({ caption, isSelected, isDisabled, onClick }) => {
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
