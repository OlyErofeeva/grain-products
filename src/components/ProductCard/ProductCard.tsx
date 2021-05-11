import styles from './ProductCard.module.scss'

type ProductCardProps = {
  imageSrc?: string
  categoryName: string
  productName: string
  productDescription: string
  price: number
  discount: number | null
  isNew: boolean
  isLimited: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  categoryName,
  productName,
  productDescription,
  price,
  discount,
  isNew,
  isLimited,
}) => {
  // render a placeholder if there's no imgSrc provided
  const renderImage = () => {
    if (imageSrc) {
      return <img className={styles.image} src={imageSrc} alt={categoryName} />
    }
    return <div className={styles.imagePlaceholder}>No image available</div>
  }

  return (
    <a className={styles.root} href="/" target="_self">
      <article className={styles.content}>
        {renderImage()}
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
    </a>
  )
}

export default ProductCard
