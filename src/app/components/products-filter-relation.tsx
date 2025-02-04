import ProductDefault from '@/components/product/product-default'
import { qsProductsByCategory } from '@/queries/product'
import useCartStore from '@/store/cartStore'
import styles from '@/styles/products-filter.module.scss'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
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
import useSWR from 'swr'

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

type ProductsFilterRelationProps = {
  slug: string
}

export default function ProductsFilterRelation({
  slug,
}: ProductsFilterRelationProps) {
  const router = useRouter()

  const { data: products, error: errorProducts } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProductsByCategory({
      category: slug,
    })}`,
    fetcher,
  )

  return (
    <ConfigProvider theme={theme}>
      {products?.data.length ? (
        <>
          <Row>
            <Col xs={24}>
              <Flex justify="space-between">
                <Title level={3} className={styles['title']}>
                  Productos Relacionados
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
                {products?.data!.slice(0, 10).map((product: Product) => {
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
