import SocialIcons from '@/components/common/social-icons'
import ProductAdd from '@/components/product/components/product-add'
import ProductCategories from '@/components/product/components/product-categories'
import ProductPrices from '@/components/product/components/product-price'
import useShopStore from '@/store/shopStore'
import styles from '@/styles/product.module.scss'
import { Product } from '@/types/product'
import {
  ConfigProvider,
  Divider,
  Flex,
  Rate,
  Space,
  Tag,
  ThemeConfig,
  Typography,
} from 'antd'
import Link from 'next/link'
import { useEffect } from 'react'
import Countdown from '../../common/countdown'

const theme: ThemeConfig = {
  components: {
    Typography: {},
    Button: {
      borderRadius: 0,
    },
    Rate: {
      marginXS: 2,
    },
  },
}

const { Title, Paragraph, Text } = Typography

export default function ProductDetail({ id, attributes }: Product) {
  const { setViewProducts } = useShopStore()

  useEffect(() => {
    setViewProducts(id)
  }, [id, setViewProducts])

  return (
    <ConfigProvider theme={theme}>
      <Flex
        vertical
        gap={5}
        className={`${styles['product']} ${styles['product-detail']}`}
      >
        <Link href={`/products/${attributes.slug}`}>
          <Title level={1} className={styles['name']}>
            {attributes.name}
          </Title>
        </Link>
        <Rate
          disabled
          value={attributes.ratings}
          className={styles['rate']}
        ></Rate>
        <Divider style={{ marginTop: '0.5em', marginBottom: '0.5em' }} />
        <ProductPrices
          price={attributes.price}
          discount={{
            isDiscount: attributes.isDiscount,
            discount: attributes.discount,
            until: attributes.until,
          }}
          variants={attributes.variants}
        />
        {attributes.discount &&
        attributes.until &&
        new Date(attributes.until) > new Date() ? (
          <div>
            <Tag className={styles['offer']}>
              <span>oferta termina en:</span>{' '}
              <Countdown targetDate={attributes.until} />
            </Tag>
          </div>
        ) : (
          <></>
        )}
        <Paragraph className={styles['description']}>
          {attributes.description}
        </Paragraph>
        <Flex vertical>
          <Space>
            <Text className={styles['detail']}>categorias:</Text>
            <ProductCategories id={id} attributes={attributes} />
          </Space>
          <Space>
            <Text className={styles['detail']}>vendedor:</Text>
            <Text
              className={`${styles['detail']} ${styles['detail-vendor']}`}
            >{`${attributes.createdBy.firstname} ${attributes.createdBy.lastname}`}</Text>
          </Space>
          <Space>
            <Text className={styles['detail']}>tiempo de entrega:</Text>
            <Text
              className={`${styles['detail']} ${styles['detail-delivery']}`}
            >
              {attributes.deliveryTime?.data
                ? attributes.deliveryTime.data.attributes.time
                : 'N/A'}
            </Text>
          </Space>
          <Space>
            <Text className={styles['detail']}>stock:</Text>
            <Tag
              className={`${styles['detail']} ${styles['detail-stock']} ${
                attributes.stock > 0
                  ? styles['detail-stock-available']
                  : styles['detail-stock-soldout']
              }`}
            >
              {attributes.stock > 0 ? 'disponible' : 'agotado'}
            </Tag>
          </Space>
        </Flex>
        <ProductAdd id={id} attributes={attributes}></ProductAdd>
        <Divider style={{ marginTop: '0.5em', marginBottom: '0.5em' }} />
        <SocialIcons />
      </Flex>
    </ConfigProvider>
  )
}
