import useSWR from 'swr'
import { Typography, Col, Row, Alert, Skeleton } from 'antd'
import { HourglassOutlined } from '@ant-design/icons'

import Container from '../../Container'
import ProductDefault from '../../products/ProductDefault'
import styles from '../../../styles/Home.module.scss'
import { qsFilterUntil } from '../../../store/queries/products'

const { Title } = Typography
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const FilterProductsUntil = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsFilterUntil()}`,
    fetcher
  )

  if (error) {
    return <Alert message="Error al cargar" type="error" />
  }

  if ((data?.data?.length ?? 0) === 0) {
    return <></>
  }

  return (
    <Container
      className={
        styles['section-filter'] + ' ' + styles['section-filter-until']
      }
    >
      <Title level={3}>
        <HourglassOutlined style={{ marginRight: '0.5rem' }} />
        Ofertas Especiales
      </Title>
      {data ? (
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} md={{ span: 8 }}>
            <ProductDefault product={data!.data[0]}></ProductDefault>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 16 }}>
            <Row gutter={[16, 16]}>
              {data!.data.slice(1, 9).map((product: any) => {
                return (
                  <Col
                    xs={{ span: 12 }}
                    sm={{ span: 8 }}
                    xl={{ span: 6 }}
                    key={product.attributes.slug}
                  >
                    <ProductDefault product={product}></ProductDefault>
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Row>
      ) : (
        <Skeleton />
      )}
    </Container>
  )
}

export default FilterProductsUntil
