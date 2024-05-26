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
  Col,
  ConfigProvider,
  Flex,
  Modal,
  Rate,
  Row,
  Tag,
  ThemeConfig,
  Typography,
  notification,
} from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Countdown from '../common/countdown'
import ProductAddMessage from './components/product-add-message'
import ProductCarousel from './components/product-carousel'
import ProductCategories from './components/product-categories'
import ProductDetail from './components/product-detail'
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
    Notification: {
      paddingContentHorizontalLG: 10,
      paddingMD: 10,
    },
  },
}

const resolution: any = () => {
  if (window.innerWidth >= 480 && window.innerWidth < 576) return '98%'
  else if (window.innerWidth >= 576 && window.innerWidth < 768) return '90%'
  else if (window.innerWidth >= 768 && window.innerWidth < 992) return '80%'
  else if (window.innerWidth >= 992 && window.innerWidth < 1200) return '75%'
  else if (window.innerWidth >= 1200 && window.innerWidth < 1600) return '65%'
  else if (window.innerWidth >= 1600) return '65%'
  else return '100%'
}

export default function ProductDefault({ id, attributes }: Product) {
  const router = useRouter()
  const [widthModal, setWidthModal] = useState(resolution())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 4 },
  })
  const { add } = useCartStore()

  const handleResize = () => {
    if (window.innerWidth >= 480 && window.innerWidth < 576)
      setWidthModal('98%')
    else if (window.innerWidth >= 576 && window.innerWidth < 768)
      setWidthModal('90%')
    else if (window.innerWidth >= 768 && window.innerWidth < 992)
      setWidthModal('80%')
    else if (window.innerWidth >= 992 && window.innerWidth < 1200)
      setWidthModal('75%')
    else if (window.innerWidth >= 1200 && window.innerWidth < 1600)
      setWidthModal('65%')
    else if (window.innerWidth >= 1600) setWidthModal('65%')
    else setWidthModal('100%')
  }

  const showModal = () => {
    setIsModalOpen(!isModalOpen)
  }

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

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

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
          onClick={showModal}
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

      <Modal
        width={widthModal}
        centered={true}
        footer={null}
        open={isModalOpen}
        onOk={showModal}
        onCancel={showModal}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={10}>
            <ProductCarousel id={id} attributes={attributes} />
          </Col>
          <Col xs={24} md={14}>
            <ProductDetail id={id} attributes={attributes} />
          </Col>
        </Row>
      </Modal>
    </ConfigProvider>
  )
}
