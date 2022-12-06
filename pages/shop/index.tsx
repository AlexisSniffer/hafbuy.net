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
  Card,
  Rate,
} from 'antd'
import type { RootState } from '../../store'
import { qsSearchProducts } from './../../store/queries/products'
import Image from 'next/image'
import Link from 'next/link'
import ProductDefault from '../../components/products/ProductDefault'

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

  if (error)
    return (
      <Alert
        type="error"
        description="Error: No se pudo obtener la infomación"
      ></Alert>
    )
  if (!data) return <Spin size="large" />

  return (
    <Row gutter={16}>
      <Col span={6}>
        <br />
        <Space direction="vertical" style={{ display: 'flex' }}>
          <Collapse
            defaultActiveKey={['1']}
            expandIconPosition="end"
            onChange={() => {}}
          >
            <Panel header="Categorias" key="1">
              <Space direction="vertical">
                <Checkbox>Moda</Checkbox>
                <Checkbox>Electrónica</Checkbox>
                <Checkbox>Videojuegos</Checkbox>
              </Space>
            </Panel>
          </Collapse>
          <Collapse
            defaultActiveKey={['1']}
            expandIconPosition="end"
            onChange={() => {}}
          >
            <Panel header="Precio" key="1">
              <Slider range defaultValue={[0, 100]} min={0} max={500} />
            </Panel>
          </Collapse>
          <Collapse
            defaultActiveKey={['1']}
            expandIconPosition="end"
            onChange={() => {}}
          >
            <Panel header="Marcas" key="1">
              <Space direction="vertical">
                <Checkbox>Nike</Checkbox>
                <Checkbox>Adidas</Checkbox>
                <Checkbox>Converse</Checkbox>
              </Space>
            </Panel>
          </Collapse>
        </Space>
      </Col>
      <Col span={18}>
        <br />

        <Row gutter={[16, 16]}>
          {data.data.map((product: any) => {
            return (
              <Col span={6} key={product.attributes.slug}>
                <ProductDefault product={product}></ProductDefault>
              </Col>
            )
          })}
        </Row>

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
  )
}

export default ShopPage
