import ProductDefault from '@/components/product/product-default'
import ProductExtra from '@/components/product/product-extra'
import { qsProductUntil, qsProductsByCategory } from '@/queries/product'
import useFilterStore from '@/store/filterStore'
import styles from '@/styles/products-filter.module.scss'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
import {
  Carousel,
  Col,
  ConfigProvider,
  Row,
  Skeleton,
  Space,
  Tabs,
  ThemeConfig,
  Typography,
} from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import CarouselMain from './carousel'

const { Title, Text } = Typography

const theme: ThemeConfig = {
  components: {
    Tabs: {
      itemSelectedColor: '#3050ff',
      colorBorderSecondary: 'none',
      inkBarColor: 'none',
    },
  },
}

function ProductFilter({ data }: Payload<Product[]>) {
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
        slidesToShow: 3,
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
        slidesToShow: 4,
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
        slidesToShow: 4,
      },
    },
  ]

  if (!data) {
    return <Skeleton />
  }

  return (
    <Row>
      <Col span={24}>
        <Carousel
          slidesToShow={6}
          draggable={true}
          infinite={false}
          dots={false}
          autoplay={true}
          responsive={responsive}
        >
          {data.map((product: Product) => {
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
  )
}

export default function ProductsFilterCategory3({ id, attributes }: Category) {
  const router = useRouter()
  const { setCategories } = useFilterStore()

  const { data: products, error: errorProducts } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProductsByCategory({
      category: attributes.slug,
    })}`,
    fetcher,
  )

  const { data: productsUntil, error: errorProductsUntil } = useSWR<
    Payload<Product[]>
  >(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProductUntil}`,
    fetcher,
  )

  return (
    <ConfigProvider theme={theme}>
      <Row className={styles['article']}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} xl={{ span: 18 }}>
          <Row>
            <Col
              xs={24}
              style={{
                backgroundColor: '#fff',
                padding: '2rem',
              }}
            >
              <Row
                align={'middle'}
                gutter={40}
                style={{ marginBottom: '1rem' }}
              >
                <Col>
                  <Title level={4} className={styles['title']}>
                    {attributes.name}
                  </Title>
                </Col>
                <Col>
                  <Space size={'large'}>
                    {attributes.categories.data.map((category: Category) => {
                      return (
                        <Text
                          key={category.attributes.slug}
                          className={styles['category-links']}
                          onClick={() => {
                            setCategories([category.attributes.slug])
                            router.push('/shop')
                          }}
                        >
                          {category.attributes.name}
                        </Text>
                      )
                    })}
                    <Text
                      className={styles['view-all']}
                      onClick={() => {
                        setCategories([attributes.slug])
                        router.push('/shop')
                      }}
                    >
                      ver más
                    </Text>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col xs={24}>
                  <CarouselMain name={'advertising7'} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col
              xs={24}
              style={{
                backgroundColor: '#fff',
              }}
            >
              <Tabs
                defaultActiveKey="1"
                className={styles['filters-tabs']}
                items={[
                  {
                    key: '1',
                    label: 'Lo más vendido',
                    children: products?.data ? (
                      <ProductFilter data={products?.data} />
                    ) : (
                      <></>
                    ),
                  },
                  {
                    key: '2',
                    label: 'Nuevos',
                    children: products?.data ? (
                      <ProductFilter data={products?.data} />
                    ) : (
                      <></>
                    ),
                  },
                  {
                    key: '3',
                    label: 'Mejores calificaciones',
                    children: products?.data ? (
                      <ProductFilter data={products?.data} />
                    ) : (
                      <></>
                    ),
                  },
                ]}
                onChange={() => {}}
              />
            </Col>
          </Row>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          xl={{ span: 6 }}
          style={{
            backgroundColor: '#fff',
            padding: '2rem 1rem',
            borderLeft: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          <Title level={5}>Ofertas Especiales</Title>
          <Row gutter={[16, 20]}>
            {productsUntil?.data!.slice(0, 6).map((product: Product) => {
              return (
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 8 }}
                  xl={{ span: 24 }}
                  key={product.attributes.slug}
                >
                  <ProductExtra
                    id={product.id}
                    attributes={product.attributes}
                  />
                </Col>
              )
            })}
            <Col span={24}>
              <Text
                className={styles['view-all']}
                onClick={() => {
                  setCategories([attributes.slug])
                  router.push('/shop')
                }}
              >
                ver más
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
