import styles from './ProductFilters.module.scss'
import RequestStatus from '../../utils/requestStatuses'
import { Filter, FilterChange, Category } from '../../types/api'

import FiltersIcon from '../svg/FilterIcon/FilterIcon'
import CategoryOption from '../ui/CategoryOption/CategoryOption'
import CustomCheckbox from '../ui/CustomCheckbox/CustomCheckbox'

type ProductFiltersProps = {
  filter: Filter
  updateFilter: (filter?: FilterChange) => void
  categoriesPresent: Set<string>
  categoriesAll: Category[]
  categoryReqStatus: RequestStatus
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filter,
  updateFilter,
  categoriesPresent,
  categoriesAll,
  categoryReqStatus,
}) => {
  const handleFilterIsLimitedUpdate = () => updateFilter({ isLimited: !filter.isLimited })
  const handleFilterIsNewUpdate = () => updateFilter({ isNew: !filter.isNew })

  const handleFiltersCategoryReset = () => {
    // no need to call updateFilter if there's already an empty array of categories
    if (filter.category.length !== 0) {
      updateFilter({ category: [] })
    }
  }

  const handleFiltersCategoryUpdate = (categoryId: string) => {
    const selectedCategories = [...filter.category]
    const categoryIndex = selectedCategories.indexOf(categoryId)

    if (categoryIndex > -1) {
      selectedCategories.splice(categoryIndex, 1)
    } else {
      selectedCategories.push(categoryId)
    }

    updateFilter({ category: selectedCategories })
  }

  /* 
    sorts an array of categories: 
    disabled categories go to the end of the array,
    so they will be displayed after all the others
  */
  const sortCategories = () => {
    const categoriesAvailable: Category[] = []
    const categoriesDisabled: Category[] = []

    categoriesAll.forEach(item => {
      if (categoriesPresent.has(item.id)) {
        categoriesAvailable.push(item)
      } else {
        categoriesDisabled.push(item)
      }
    })

    return categoriesAvailable.concat(categoriesDisabled)
  }

  return (
    <section className={styles.root}>
      <div className={styles.titleWrapper}>
        <FiltersIcon />
        <h2 className={styles.title}>Filters</h2>
      </div>

      <div className={styles.filtersWrapper}>
        {categoryReqStatus === RequestStatus.SUCCESS && (
          <fieldset className={styles.filtersFieldset}>
            <legend className={styles.legend}>Category</legend>
            <ul className={styles.categoryList}>
              <li className={styles.categoryItem}>
                <CategoryOption
                  caption="All"
                  isSelected={filter.category.length === 0}
                  onClick={handleFiltersCategoryReset}
                />
              </li>

              {sortCategories().map(item => (
                <li className={styles.categoryItem} key={item.id}>
                  <CategoryOption
                    caption={item.name}
                    isSelected={filter.category.includes(item.id)}
                    onClick={() => handleFiltersCategoryUpdate(item.id)}
                    isDisabled={categoriesPresent.size > 0 && !categoriesPresent.has(item.id)}
                  />
                </li>
              ))}
            </ul>
          </fieldset>
        )}

        <fieldset className={styles.filtersFieldset}>
          <legend className={styles.legend}>Status</legend>
          <CustomCheckbox
            labelText="Limited"
            classNameExt={styles.statusCheckbox}
            isChecked={filter.isLimited}
            onChange={handleFilterIsLimitedUpdate}
          />

          <CustomCheckbox
            labelText="New"
            classNameExt={styles.statusCheckbox}
            isChecked={filter.isNew}
            onChange={handleFilterIsNewUpdate}
          />
        </fieldset>
      </div>
    </section>
  )
}

export default ProductFilters
