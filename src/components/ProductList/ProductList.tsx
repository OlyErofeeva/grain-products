import styles from './ProductList.module.scss'
import ProductCard from '../ProductCard/ProductCard'
import categoryImageMap from '../../utils/categoryImageMap'
import { Product } from '../../types/api'

type ProductListProps = {
  products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ul className={styles.root}>
      {products.map(item => (
        <li key={item.id}>
          <ProductCard
            imageSrc={categoryImageMap.get(item.categoryType)}
            categoryName={item.categoryName}
            productName={item.name}
            productDescription={item.description}
            price={item.price}
            discount={item.discount}
            isNew={item.isNew}
            isLimited={item.isLimited}
          />
        </li>
      ))}
    </ul>
  )
}

export default ProductList
