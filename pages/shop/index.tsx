import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
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
} from 'antd'
import type { RootState } from '../../store'
import { setQ } from '../../store/searchSlice'
import { qsSearchProducts } from './../../store/queries/products'

const { Panel } = Collapse

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ShopPage = () => {
  const filters = useSelector((state: RootState) => state.filters)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  // const [q, setQ] = useState('')

  const dispatch = useDispatch()
  const router = useRouter()
  const { query } = router

  const { data, error } = useSWR(
    `https://hafbuy-app-ps9eq.ondigitalocean.app/api/products?${filters.q}`,
    fetcher
  )

  useEffect(() => {
    if (query['pagination[page]']) {
      let pageTemp =
        Number(query['pagination[page]']) >= 1
          ? Number(query['pagination[page]'])
          : 1
      setPage(pageTemp)
    }

    if (query['pagination[pageSize]']) {
      let pageSizeTemp =
        Number(query['pagination[pageSize]']) >= 1
          ? Number(query['pagination[pageSize]'])
          : 1
      setPageSize(pageSizeTemp)
    }

    dispatch(setQ(qsSearchProducts(page, pageSize, filters.filter)))
    router.replace(`?${filters.q}`)
  }, [filters.q])

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

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
        <p>{page}</p>
        <p>{pageSize}</p>
        <p>{data.data.length}</p>

        <ul>
          {data.data.map((product: any) => {
            return <li>{product.attributes.name}</li>
          })}
        </ul>

        <Pagination
          defaultCurrent={page}
          total={data.meta.pagination.total}
          pageSize={pageSize}
          onChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)

            dispatch(setQ(qsSearchProducts(page, pageSize, filters.filter)))
            router.replace(`?${filters.q}`)
          }}
        />
      </Col>
    </Row>
  )
}

export default ShopPage
