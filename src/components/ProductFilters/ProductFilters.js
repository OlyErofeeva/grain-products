import styles from './ProductFilters.module.scss'

import FiltersIcon from '../svg/FilterIcon/FilterIcon'
import CategoryOption from '../ui/CategoryOption/CategoryOption'
import CustomCheckbox from '../ui/CustomCheckbox/CustomCheckbox'

const ProductFilters = ({ filter, updateFilter, categoriesPresent, categoriesAll, categoryReqStatus }) => {
  const handleFilterIsLimitedUpdate = () => updateFilter({ isLimited: !filter.isLimited })
  const handleFilterIsNewUpdate = () => updateFilter({ isNew: !filter.isNew })

  const handleFiltersCategoryReset = () => {
    updateFilter({ category: [] })
  }

  const handleFiltersCategoryUpdate = categoryId => {
    const selectedCategories = [...filter.category]
    const categoryIndex = selectedCategories.indexOf(categoryId)

    if (categoryIndex > -1) {
      selectedCategories.splice(categoryIndex, 1)
    } else {
      selectedCategories.push(categoryId)
    }

    updateFilter({ category: selectedCategories })
  }

  return (
    <section className={styles.root}>
      <div className={styles.titleWrapper}>
        <FiltersIcon />
        <h2 className={styles.title}>Filters</h2>
      </div>

      <div className={styles.filtersWrapper}>
        {categoryReqStatus === 'success' && (
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

              {categoriesAll.map(item => (
                <li className={styles.categoryItem} key={item.id}>
                  <CategoryOption
                    caption={item.name}
                    isSelected={filter.category.includes(item.id)}
                    onClick={() => handleFiltersCategoryUpdate(item.id)}
                    categoryId={item.id}
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
