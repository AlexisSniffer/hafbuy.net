import styles from '@/styles/product.module.scss'
import { Product } from '@/types/product'
import { ConfigProvider, Flex, Rate, ThemeConfig, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import ProductPrices from './components/product-price'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Rate: {
      marginXS: 2,
    },
  },
}

export default function ProductExtra({ id, attributes }: Product) {
  return (
    <ConfigProvider theme={theme}>
      <Flex gap={10} align="center">
        <Image
          src={
            'http://localhost:1337' + attributes.images.data[0].attributes.url
          }
          alt={
            attributes.images.data[0].attributes.alternativeText ??
            attributes.slug
          }
          width={80}
          height={80}
        />
        <Flex
          vertical
          gap={2}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          className={`${styles['product']} ${styles['product-extra']}`}
        >
          <Link href={`/products/${attributes.slug}`}>
            <Text className={styles['name']}>{attributes.name}</Text>
          </Link>
          <Rate
            disabled
            value={attributes.ratings}
            className={styles['rate']}
          ></Rate>
          <ProductPrices
            price={attributes.price}
            discount={{
              isDiscount: attributes.isDiscount,
              discount: attributes.discount,
              until: attributes.until,
            }}
            variants={attributes.variants}
          />
        </Flex>
      </Flex>
    </ConfigProvider>
  )
}
