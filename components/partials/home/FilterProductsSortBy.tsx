import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Alert, Col, List, Row, Skeleton, Typography } from 'antd'

import Container from '../../Container'
import ProductDefault from '../../products/ProductDefault'
import styles from '../../../styles/Home.module.scss'
import { qsCategoriesWithProducts } from '../../../store/queries/categories'
import { qsfilterProductsByCategory } from '../../../store/queries/products'

const { Title } = Typography
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const FilterProductsSortBy = () => {
  const [sortBy, setSortBy] = useState<string>('')

  const { data: categories, error: categoriesError } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/subcategories?${qsCategoriesWithProducts()}`,
    fetcher
  )

  const { data, error } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/products?${qsfilterProductsByCategory({
      pagination: 6,
      slug: sortBy,
    })}`,
    fetcher
  )

  useEffect(() => {
    setSortBy(categories?.data[0].attributes.slug)
  }, [categories])

  if (error) {
    return <Alert message="Error al cargar" type="error" />
  }

  if ((data?.data?.length ?? 0) === 0) {
    return <></>
  }

  return (
    <Container className={styles['section-filter']}>
      <Row gutter={[16, 16]}>
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 12, order: 1 }}
          lg={{ span: 6, order: 1 }}
          style={{ backgroundColor: '#fff', padding: '0 1rem' }}
        >
          <Title level={3}>Ordenar por</Title>
          {categories ? (
            <List
              size="small"
              grid={{
                gutter: 16,
                xs: 3,
                sm: 2,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 1,
              }}
              dataSource={categories?.data}
              renderItem={(item: any) => (
                <List.Item>
                  <Typography.Text
                    onClick={() => {
                      setSortBy(item.attributes.slug)
                    }}
                  >
                    {item.attributes.name}
                  </Typography.Text>
                </List.Item>
              )}
            ></List>
          ) : (
            <Skeleton />
          )}
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 12, order: 2 }}
          lg={{ span: 6, order: 2 }}
        >
          <div
            style={{
              padding: '2rem',
              display: 'block',
              width: '100%',
              minHeight: '200px',
              height: '100%',
              backgroundColor: '#ccc',
            }}
          >
            Espacio Publicitario
          </div>
        </Col>
        <Col
          xs={{ span: 24, order: 3 }}
          sm={{ span: 24, order: 3 }}
          lg={{ span: 12, order: 3 }}
        >
          <Row gutter={[16, 16]}>
            {data?.data.map((product: any) => {
              return (
                <Col
                  xs={{ span: 12 }}
                  sm={{ span: 8 }}
                  lg={{ span: 12 }}
                  xl={{ span: 8 }}
                  key={product.attributes.slug}
                >
                  <ProductDefault product={product}></ProductDefault>
                </Col>
              )
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default FilterProductsSortBy
