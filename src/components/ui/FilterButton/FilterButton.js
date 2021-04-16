import styles from './FilterButton.module.scss'
import FilterIcon from '../../svg/FilterIcon/FilterIcon'

const FilterButton = ({ classNameExt, onClick }) => {
  return (
    <button className={`${styles.root} ${classNameExt}`} type="button" onClick={onClick}>
      <FilterIcon isLight />
    </button>
  )
}

export default FilterButton
