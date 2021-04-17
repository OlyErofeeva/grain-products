import styles from './ProductCard.module.scss'

const ProductCard = ({
  imageSrc,
  categoryName = '',
  productName = '',
  productDescription = '',
  price,
  discount,
  isNew,
  isLimited,
}) => {
  return (
    <article className={styles.root}>
      <img className={styles.image} src={imageSrc} alt={categoryName} />
      <div className={styles.infoContainer}>
        <p className={styles.category}>{categoryName}</p>
        <h3 className={styles.title}>{productName}</h3>
        <p className={styles.description}>{productDescription}</p>
        <div className={styles.priceContainer}>
          <p className={styles.price}>${price}</p>
          {discount && <p className={styles.discount}>Discount ${discount} per bag</p>}
        </div>
      </div>
      <ul className={styles.statusBadges}>
        {isNew && <li className={`${styles.statusBadge} ${styles.statusBadge_new}`}>New</li>}
        {isLimited && <li className={`${styles.statusBadge} ${styles.statusBadge_limited}`}>Limited</li>}
      </ul>
    </article>
  )
}

export default ProductCard
