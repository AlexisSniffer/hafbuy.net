import Link from 'next/link'
import useSWR from 'swr'
import { useDispatch } from 'react-redux'
import { Alert, Col, List, Row, Typography } from 'antd'

import styles from '../../../styles/Home.module.scss'
import Container from '../../Container'
import ProductDefault from '../../products/ProductDefault'
import { qsfilterProductsByCategoryRoot } from '../../../store/queries/products'
import {
  addSubCategory,
  clearSubCategories,
  setPage,
  setPageSize,
  setQuery,
} from '../../../store/searchProductsSlice'

const { Title } = Typography
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const selectCategory = (categories: any) => {
  const index = Math.floor(Math.random() * categories?.meta?.pagination?.total)
  return categories?.data[index]
}

const FilterProductsTwo = ({ categories, categoriesError }: any) => {
  const dispatch = useDispatch()
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
        <Row>
          <Col span={12}>
            <List
              size="small"
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 4,
                xl: 6,
                xxl: 6,
              }}
              dataSource={category!.attributes.subcategories.data}
              renderItem={(item: any) => (
                <List.Item>
                  <Link
                    style={{ color: '#777' }}
                    href="/shop"
                    onClick={() => {
                      dispatch(clearSubCategories())
                      dispatch(addSubCategory(item.attributes.slug))
                      dispatch(setPage(1))
                      dispatch(setPageSize(10))
                      dispatch(setQuery())
                    }}
                  >
                    {item.attributes.name}
                  </Link>
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
        <br />
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }}>
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
        </Row>
      </article>
    </Container>
  )
}

export default FilterProductsTwo
