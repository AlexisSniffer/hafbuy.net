import useCartStore from '@/store/cartStore'
import styles from '@/styles/product.module.scss'
import { ProductCart } from '@/types/product'
import { money } from '@/utils/formatters'
import { CloseOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Flex, ThemeConfig, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Rate: {
      marginXS: 2,
    },
  },
}

export default function ProductCart({ product }: { product: ProductCart }) {
  const { remove } = useCartStore()

  const Variation = ({ value, className }: any) => (
    <span style={{ backgroundColor: value }} className={styles['color']}>
      {className == 'color' ? '' : value}
    </span>
  )

  return (
    <ConfigProvider theme={theme}>
      <Flex
        justify="space-between"
        align="center"
        className={`${styles['product']} ${styles['product-cart']}`}
      >
        <Flex vertical>
          <Link href={`/products/${product.attributes.slug}`}>
            <Text className={styles['name']}>
              {product.attributes.name}
              {product.variant ? (
                <Text className={styles['variant']}>
                  {Object.entries(product.variant.variant).map(
                    ([key, value], index, array) => (
                      <React.Fragment key={key}>
                        <span>{key}</span> :{' '}
                        <Variation
                          value={value}
                          className={key === 'color' ? 'color' : ''}
                        />
                        {index < array.length - 1 && ', '}
                      </React.Fragment>
                    ),
                  )}
                </Text>
              ) : (
                <></>
              )}
            </Text>
          </Link>
          <Text className={styles['qty']}>
            {product.qty} <span>x</span> {money.format(product.price)}
          </Text>
        </Flex>
        <div className={styles['remove']}>
          <Image
            src={product.attributes.images.data[0].attributes.url}
            alt={
              product.attributes.images.data[0].attributes.alternativeText ??
              product.attributes.slug
            }
            width={78}
            height={78}
          />
          <Button
            shape="circle"
            size="small"
            icon={<CloseOutlined />}
            onClick={() => remove(product)}
          ></Button>
        </div>
      </Flex>
    </ConfigProvider>
  )
}
