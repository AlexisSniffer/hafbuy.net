import { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import useSWR from 'swr'
import {
  Alert,
  Col,
  Row,
  Spin,
  Space,
  Collapse,
  Slider,
  Checkbox,
  Pagination,
  Divider,
} from 'antd'
import type { RootState } from '../store'
import { qsSearchProducts } from '../store/queries/products'
import ProductDefault from '../components/products/ProductDefault'
import {
  FilterCategories,
  FilterPrices,
  FilterBrand,
} from '../components/shop/Filters'

const { Panel } = Collapse

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ShopPage = () => {
  const filters = useSelector((state: RootState) => state.filters)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [q, setQ] = useState(qsSearchProducts(page, pageSize, filters.filter))

  // const router = useRouter()
  // const { query } = router

  const { data, error } = useSWR(
    `https://hafbuy-app-ps9eq.ondigitalocean.app/api/products?${q}`,
    fetcher
  )

  const setPagination = async (
    page: number,
    pageSize: number,
    filter: string
  ) => {
    setPage(page)
    setPageSize(pageSize)
    setQ(qsSearchProducts(page, pageSize, filter))
  }

  if (error) {
    return (
      <Alert
        type="error"
        description="Error: No se pudo obtener la infomación"
      ></Alert>
    )
  }

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Space direction="vertical" style={{ display: 'flex' }}>
          <FilterCategories />
          <FilterPrices />
          <FilterBrand />
        </Space>
      </Col>
      <Col span={18}>
        {!data ? (
          <Row justify={'center'}>
            <Col>
              <Spin size="large" />
            </Col>
          </Row>
        ) : (
          <>
            <Space direction="vertical">
              <Row gutter={[16, 16]}>
                {data.data.map((product: any) => {
                  return (
                    <Col span={6} key={product.attributes.slug}>
                      <ProductDefault product={product}></ProductDefault>
                    </Col>
                  )
                })}
              </Row>
              <Divider />
              <Row justify={'end'}>
                <Col flex={'auto'} />
                <Col>
                  <Pagination
                    defaultCurrent={page}
                    total={data.meta.pagination.total}
                    pageSize={pageSize}
                    onChange={(page, pageSize) => {
                      setPagination(page, pageSize, filters.filter)
                    }}
                  />
                </Col>
              </Row>
            </Space>
          </>
        )}
      </Col>
    </Row>
  )
}

export default ShopPage
