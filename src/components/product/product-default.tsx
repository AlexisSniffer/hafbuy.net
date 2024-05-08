import useCartStore from '@/store/cartStore'
import styles from '@/styles/product.module.scss'
import { Product, ProductCart } from '@/types/product'
import { productPrice } from '@/utils/product'
import {
  ArrowRightOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  ConfigProvider,
  Flex,
  Rate,
  Tag,
  ThemeConfig,
  Typography,
  notification,
} from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Countdown from '../common/countdown'
import ProductCategories from './components/product-categories'
import ProductPrices from './components/product-price'
import ProductAddMessage from './components/product-add-message'

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
    Notification: {
      paddingContentHorizontalLG: 10,
      paddingMD: 10,
    },
  },
}

export default function ProductDefault({ id, attributes }: Product) {
  const router = useRouter()
  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 4 },
  })
  const { add } = useCartStore()

  const addProduct = () => {
    let product: ProductCart = {
      id,
      attributes,
      qty: 1,
      price: productPrice({ id, attributes }),
    }

    api.open({
      message: null,
      description: <ProductAddMessage id={id} attributes={attributes} />,
      placement: 'bottomRight',
    })

    add(product)
  }

  const linkProduct = () => {
    router.push(`/products/${attributes.slug}`)
  }

  const cover = ({ id, attributes }: Product) => {
    return (
      <div className={styles['cover']}>
        {attributes.images.data ? (
          <Image
            src={
              attributes.images
                ? attributes.images.data[0].attributes.url
                : '/no-image.jpg'
            }
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
        <Button
          type="primary"
          //onClick={showModal}
          className={styles['quick-view']}
        >
          vista rápida
        </Button>
        <Button
          shape="circle"
          disabled={!(attributes.stock > 0)}
          icon={
            attributes.variants?.length ? (
              <ArrowRightOutlined />
            ) : (
              <ShoppingCartOutlined />
            )
          }
          onClick={attributes.variants?.length ? linkProduct : addProduct}
          className={styles['add']}
        />
        {attributes.isDiscount &&
        (!attributes.until ||
          (attributes.until && new Date(attributes.until) > new Date())) ? (
          <Tag className={styles['discount']}>
            -
            {Math.round(
              ((attributes.price - attributes.discount) / attributes.price) *
                100,
            )}
            %
          </Tag>
        ) : null}
        {attributes.isDiscount &&
        attributes.until &&
        new Date(attributes.until) > new Date() ? (
          <Tag className={styles['offer']}>
            <span>oferta termina en:</span>{' '}
            <Countdown targetDate={attributes.until} />
          </Tag>
        ) : null}
      </div>
    )
  }

  return (
    <ConfigProvider theme={theme}>
      {contextHolder}
      <Card
        hoverable
        cover={cover({ id: id, attributes: attributes })}
        className={`${styles['product']}`}
      >
        <Flex gap={10} justify="space-between">
          <ProductCategories id={id} attributes={attributes} />
          <HeartOutlined className={styles['wish']} />
        </Flex>
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
      </Card>
    </ConfigProvider>
  )
}
