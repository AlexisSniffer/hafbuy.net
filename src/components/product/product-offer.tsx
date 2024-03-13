import styles from '@/styles/product.module.scss'
import { Product } from '@/types/product'
import { ShoppingOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  ConfigProvider,
  Flex,
  Rate,
  Tag,
  ThemeConfig,
  Typography,
} from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import Countdown from '../common/countdown'
import ProductCategories from './components/product-categories'
import ProductPrices from './components/product-price'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Card: {
      padding: 8,
      paddingXXS: 8,
      paddingLG: 8,
      borderRadiusLG: 0,
    },
    Button: {
      borderRadius: 0,
    },
    Rate: {
      marginXS: 2,
    },
  },
}

function cover({ id, attributes }: Product) {
  return (
    <div className={styles['cover']}>
      {attributes.discount &&
      attributes.until &&
      new Date(attributes.until) > new Date() ? (
        <Tag className={styles['offer']}>
          <span>oferta termina en:</span>{' '}
          <Countdown targetDate={attributes.until} />
        </Tag>
      ) : null}
      {attributes.images.data ? (
        <Image
          src={attributes.images.data[0].attributes.url}
          alt={
            attributes.images.data[0].attributes.alternativeText ??
            attributes.slug
          }
          width={0}
          height={0}
          sizes="100vw"
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default function ProductOffer({ id, attributes }: Product) {
  return (
    <ConfigProvider theme={theme}>
      <Card
        hoverable
        cover={cover({ id: id, attributes: attributes })}
        style={{ height: '100%' }}
        className={`${styles['product']} ${styles['product-offer']}`}
      >
        <Flex vertical align="center" gap={20}>
          <Flex vertical align="center">
            <ProductCategories id={id} attributes={attributes} />
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
          <Button
            type="primary"
            size="large"
            icon={<ShoppingOutlined />}
            className={styles['add']}
          >
            añadir
          </Button>
        </Flex>
      </Card>
    </ConfigProvider>
  )
}
