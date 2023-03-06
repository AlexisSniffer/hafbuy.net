import Link from 'next/link'
import useSWR from 'swr'
import { Alert, Col, List, Row, Typography } from 'antd'

import styles from '../../../styles/Home.module.scss'
import Container from '../../Container'
import ProductDefault from '../../products/ProductDefault'
import { qsfilterProductsByCategoryRoot } from '../../../store/queries/products'

const { Title } = Typography
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const selectCategory = (categories: any) => {
  const index = Math.floor(Math.random() * categories?.meta?.pagination?.total)
  return categories?.data[index]
}

const FilterProductsOne = ({ categories, categoriesError }: any) => {
  const category = selectCategory(categories)

  const { data, error } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/products?${qsfilterProductsByCategoryRoot({
      pagination: 6,
      slug: category?.attributes.slug,
    })}`,
    fetcher
  )

  if (error) {
    return <Alert message="Error al cargar" type="error" />
  }

  if (!category || (data?.data?.length ?? 0) === 0) {
    return <></>
  }

  return (
    <Container className={styles['section-filter']}>
      <article
        style={{
          padding: '1rem 2rem 2rem',
          backgroundColor: '#fff',
        }}
      >
        <Title level={3}>{category!.attributes.name}</Title>
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <div
              style={{
                padding: '2rem',
                display: 'block',
                width: '100%',
                minHeight: '150px',
                height: '100%',
                backgroundColor: '#ccc',
              }}
            >
              Espacio Publicitario
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <div
              style={{
                padding: '2rem',
                display: 'block',
                width: '100%',
                minHeight: '150px',
                height: '100%',
                backgroundColor: '#ccc',
              }}
            >
              Espacio Publicitario
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
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
              dataSource={category!.attributes.subcategories.data}
              renderItem={(item: any) => (
                <List.Item>
                  <Link href="/shop">{item.attributes.name}</Link>
                </List.Item>
              )}
            ></List>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {data?.data.map((product: any) => {
            return (
              <Col
                xs={{ span: 12 }}
                sm={{ span: 8 }}
                lg={{ span: 6 }}
                xl={{ span: 4 }}
                key={product.attributes.slug}
              >
                <ProductDefault product={product}></ProductDefault>
              </Col>
            )
          })}
        </Row>
      </article>
    </Container>
  )
}

export default FilterProductsOne
