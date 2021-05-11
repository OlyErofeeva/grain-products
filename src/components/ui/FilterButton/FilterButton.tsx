import { ButtonHTMLAttributes } from 'react'
import styles from './FilterButton.module.scss'
import FilterIcon from '../../svg/FilterIcon/FilterIcon'

type FilterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  classNameExt?: string
}

const FilterButton: React.FC<FilterButtonProps> = ({ classNameExt, onClick }) => {
  return (
    <button className={`${styles.root} ${classNameExt}`} type="button" onClick={onClick}>
      <FilterIcon isLight />
    </button>
  )
}

export default FilterButton
