import useFilterStore from '@/store/filterStore'
import styles from '@/styles/product.module.scss'
import { Product } from '@/types/product'
import { Typography } from 'antd'
import { useRouter } from 'next/navigation'

const { Text } = Typography

export default function ProductCategories({ id, attributes }: Product) {
  const router = useRouter()
  const { setCategories } = useFilterStore()

  return (
    <div className={styles['categories']}>
      {attributes.categories?.data.length ? (
        attributes.categories?.data.map((category, index, array) => (
          <Text
            key={category.attributes.slug}
            className={styles['category']}
            onClick={() => {
              setCategories([category.attributes.slug])
              router.push('/shop')
            }}
          >
            {category.attributes.name}
            {index !== array.length - 1 ? ', ' : ''}
          </Text>
        ))
      ) : (
        <Text className={styles['category']}>SIN CATEGORIA</Text>
      )}
    </div>
  )
}
