import ProductDefault from '@/components/product/product-default'
import useCartStore from '@/store/cartStore'
import styles from '@/styles/products-filter.module.scss'
import { Product } from '@/types/product'
import {
  Carousel,
  Col,
  ConfigProvider,
  Flex,
  Row,
  ThemeConfig,
  Typography,
} from 'antd'
import { useRouter } from 'next/navigation'

const { Title, Text } = Typography

const theme: ThemeConfig = {
  components: {},
}

const responsive = [
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 576,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 992,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 4,
    },
  },
  {
    breakpoint: 9999,
    settings: {
      slidesToShow: 6,
    },
  },
]

export default function ProductsFilterSelected() {
  const router = useRouter()
  const cartStore = useCartStore((state) => state.cart)

  return (
    <ConfigProvider theme={theme}>
      {cartStore.length ? (
        <>
          <Row>
            <Col xs={24}>
              <Flex justify="space-between">
                <Title level={3} className={styles['title']}>
                  Productos Seleccionados
                </Title>
                <Text
                  className={styles['view-all']}
                  onClick={() => {
                    router.push('/shop')
                  }}
                >
                  Ver Todo
                </Text>
              </Flex>
            </Col>
          </Row>
          <Row className={styles['article']}>
            <Col
              xs={24}
              style={{
                backgroundColor: '#e7e7e7',
              }}
            >
              <Carousel
                slidesToShow={6}
                draggable={true}
                infinite={false}
                dots={false}
                autoplay={true}
                responsive={responsive}
              >
                {cartStore!.slice(0, 10).map((product: Product) => {
                  return (
                    <ProductDefault
                      key={product.id}
                      id={product.id}
                      attributes={product.attributes}
                    />
                  )
                })}
              </Carousel>
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
    </ConfigProvider>
  )
}
