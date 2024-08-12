import ProductDefault from '@/components/product/product-default'
import { qsProductsByCategory } from '@/queries/product'
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
  ThemeConfig,
  Typography,
} from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

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

export default function ProductsFilterCategory1({ id, attributes }: Category) {
  const router = useRouter()
  const { setCategories } = useFilterStore()

  const { data: products, error: errorProducts } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProductsByCategory({
      category: attributes.slug,
    })}`,
    fetcher,
  )

  return (
    <ConfigProvider theme={theme}>
      <Row className={styles['article']}>
        <Col
          span={24}
          style={{
            backgroundColor: '#fff',
            padding: '2rem',
          }}
        >
          <Row align={'middle'} gutter={40} style={{ marginBottom: '1rem' }}>
            <Col>
              <Title level={4} className={styles['title']}>
                {attributes.name}
              </Title>
            </Col>
          </Row>
          <Row className={styles['article']} gutter={[10, 10]}>
            <Col xs={24} md={12}>
              <Image
                src={'/publicidad/Publicidad 4.jpg'}
                alt={'Publicidad'}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '150px',
                }}
              />
            </Col>
            <Col xs={24} md={12}>
              <Image
                src={'/publicidad/Publicidad 5.jpg'}
                alt={'Publicidad'}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '150px',
                }}
              />
            </Col>
          </Row>
          <Row className={`${styles['categories']}`}>
            {attributes.categories.data.map((category: Category) => {
              return (
                <Col key={category.attributes.slug} xs={24} sm={12} lg={6}>
                  <Row>
                    <Text
                      className={styles['name']}
                      onClick={() => {
                        setCategories([category.attributes.slug])
                        router.push('/shop')
                      }}
                    >
                      {category.attributes.name}
                    </Text>
                  </Row>
                  <Row gutter={[0, 5]}>
                    {category.attributes.categories.data
                      .slice(0, 10)
                      .map((category2: Category) => {
                        return (
                          <Col key={category2.attributes.slug} xs={12}>
                            <Text
                              className={styles['name-sub']}
                              onClick={() => {
                                setCategories([category2.attributes.slug])
                                router.push('/shop')
                              }}
                            >
                              {category2.attributes.name}
                            </Text>
                          </Col>
                        )
                      })}
                  </Row>
                  <Row>
                    <Text
                      className={styles['view-all']}
                      onClick={() => {
                        setCategories([category.attributes.slug])
                        router.push('/shop')
                      }}
                    >
                      ver más
                    </Text>
                  </Row>
                </Col>
              )
            })}
          </Row>
        </Col>
        {products && products.data.length ? (
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
              {products!.data.slice(0, 6).map((product: Product) => {
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
        ) : (
          <></>
        )}
      </Row>
    </ConfigProvider>
  )
}
