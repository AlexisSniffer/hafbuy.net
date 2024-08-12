import ProductDefault from '@/components/product/product-default'
import { qsCategory } from '@/queries/category'
import { qsProductsByCategory } from '@/queries/product'
import useFilterStore from '@/store/filterStore'
import styles from '@/styles/products-filter.module.scss'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
import {
  Col,
  ConfigProvider,
  List,
  Row,
  Skeleton,
  Space,
  ThemeConfig,
  Typography,
} from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import useSWR from 'swr'

const { Title, Text } = Typography

const theme: ThemeConfig = {
  components: {},
}

export default function ProductsFilterSortBy() {
  const router = useRouter()
  const { setCategories } = useFilterStore()
  const [filterCategories, setFilterCategories] = useState<string[]>([])

  const { data: products, error: errorProducts } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProductsByCategory({
      category: filterCategories,
    })}`,
    fetcher,
  )

  const { data: categories, error: errorCategories } = useSWR<
    Payload<Category[]>
  >(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategory}`, fetcher)

  return (
    <ConfigProvider theme={theme}>
      <Row className={styles['article']}>
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 12, order: 1 }}
          lg={{ span: 6, order: 1 }}
          style={{
            backgroundColor: '#fff',
            padding: '1.5rem',
          }}
        >
          <Title level={3}>Ordenar por</Title>
          {categories ? (
            <Space direction="vertical" size={'large'}>
              <List
                size="small"
                grid={{
                  gutter: 1,
                  xs: 3,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1,
                }}
                dataSource={categories?.data}
                renderItem={(category: Category) => (
                  <List.Item>
                    <Text
                      className={styles['category-links']}
                      onClick={() => {
                        setFilterCategories([category.attributes.slug])
                      }}
                    >
                      {category.attributes.name}
                    </Text>
                  </List.Item>
                )}
              ></List>
              <Text
                className={styles['view-all']}
                onClick={() => {
                  setCategories(filterCategories)
                  router.push('/shop')
                }}
              >
                ver más
              </Text>
            </Space>
          ) : (
            <Skeleton />
          )}
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 12, order: 2 }}
          lg={{ span: 6, order: 2 }}
        >
          <Image
            src={'/publicidad/Publicidad 3.jpg'}
            alt={'Publicidad'}
            width={0}
            height={0}
            sizes="100vw"
            style={{
              height: 'auto',
              width: '100%',
            }}
          />
        </Col>
        <Col
          xs={{ span: 24, order: 3 }}
          sm={{ span: 24, order: 3 }}
          lg={{ span: 12, order: 3 }}
        >
          {products ? (
            <Row>
              {products.data!.map((product: Product) => {
                return (
                  <Col
                    xs={{ span: 12 }}
                    sm={{ span: 8 }}
                    lg={{ span: 8 }}
                    key={product.attributes.slug}
                  >
                    <ProductDefault
                      id={product.id}
                      attributes={product.attributes}
                    />
                  </Col>
                )
              })}
            </Row>
          ) : (
            <div style={{ padding: '2rem' }}>
              <Skeleton />
            </div>
          )}
        </Col>
      </Row>
    </ConfigProvider>
  )
}
