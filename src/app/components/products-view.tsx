import ProductDefault from '@/components/product/product-default'
import { qsProducts } from '@/queries/product'
import useShopStore from '@/store/shopStore'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
import {
  Carousel,
  Col,
  ConfigProvider,
  Row,
  Skeleton,
  ThemeConfig,
  Typography,
} from 'antd'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import styles from '@/styles/products-filter.module.scss'
import useFilterStore from '@/store/filterStore'

const theme: ThemeConfig = {
  components: {
    Card: {
      borderRadiusLG: 0,
    },
  },
}

const { Text, Title } = Typography

export default function ProductsView() {
  const router = useRouter()
  const { viewProducts } = useShopStore()
  const { setViews, setFilter, setCategories, setPrices, setBrands } =
    useFilterStore()

  const responsive = [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
    {
      breakpoint: 9999,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6,
      },
    },
  ]

  const { data: products, error: errorProducts } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProducts({
      views: viewProducts,
    })}`,
    fetcher,
  )

  if (!products) {
    return <Skeleton />
  }

  return (
    <ConfigProvider theme={theme}>
      {viewProducts.length ? (
        <>
          <Row justify={'space-between'}>
            <Col>
              <Title level={3}>Productos Recientemente Vistos</Title>
            </Col>
            <Col>
              <Text
                className={styles['view-all']}
                onClick={() => {
                  setViews(viewProducts)
                  setFilter('')
                  setCategories([])
                  setPrices([])
                  setBrands([])
                  router.push('/shop')
                }}
              >
                ver más
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Carousel
                draggable={true}
                infinite={false}
                dots={false}
                autoplay={true}
                responsive={responsive}
              >
                {products?.data?.map((product: Product) => {
                  return (
                    <div key={product.attributes.slug}>
                      <ProductDefault
                        id={product.id}
                        attributes={product.attributes}
                      />
                    </div>
                  )
                })}
              </Carousel>
            </Col>
          </Row>
        </>
      ) : null}
    </ConfigProvider>
  )
}
