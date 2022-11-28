import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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
  FloatButton,
} from 'antd'
import type { RootState } from '../../store'
import { qsSearchProducts } from './../../store/queries/products'
import Image from 'next/image'
import Link from 'next/link'

const { Panel } = Collapse
const { Meta } = Card

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ShopPage = () => {
  const filters = useSelector((state: RootState) => state.filters)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [q, setQ] = useState('')

  const router = useRouter()
  const { query } = router

  const { data, error } = useSWR(
    `https://hafbuy-app-ps9eq.ondigitalocean.app/api/products?${q}`,
    fetcher
  )

  useEffect(() => {
    const page =
      Number(query['pagination[page]']) >= 1
        ? Number(query['pagination[page]'])
        : 1

    const pageSize =
      Number(query['pagination[pageSize]']) >= 1
        ? Number(query['pagination[pageSize]'])
        : 10

    setPagination(page, pageSize)
  }, [query])

  const setPagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)

    console.log('Primer Q')
    console.log(q)

    setQ(qsSearchProducts(page, pageSize, filters.filter))

    console.log('Segundo Q')
    console.log(q)

    /*if (q != qsSearchProducts(page, pageSize, filters.filter)) {
      
      router.replace(`?${q}`)
    }*/
  }

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
        {/* <p>{page}</p>
        <p>{pageSize}</p>
        <p>{data.data.length}</p>
 */}
        <Row gutter={[16, 16]}>
          {data.data.map((product: any) => {
            return (
              <Col span={6}>
                <Card
                  className="product-default"
                  cover={
                    <img
                      /* 
                      TODO: completar validación de imagenes
                      src={`https://hafbuy-app-ps9eq.ondigitalocean.app${product.attributes.images.data[0].attributes.formats.small.url}`} */
                      src="https://hafbuy-app-ps9eq.ondigitalocean.app/uploads/large_2022_32442_1531b9bb48.webp"
                      alt={''}
                      width={'100%'}
                      height={'100%'}
                    />
                  }
                >
                  <span className="category-list">
                    {product.attributes.categories != null &&
                    product.attributes.categories.data.length > 0 ? (
                      product.attributes.categories.data.map(
                        (category: any) => {
                          return (
                            <a
                              onClick={(e) => e.preventDefault()}
                            >{`${category.attributes.name}`}</a>
                          )
                        }
                      )
                    ) : (
                      <a>sin categoria</a>
                    )}
                  </span>
                  <h3 className="product-title">{product.attributes.name}</h3>
                  <Rate />
                  <span className="product-price">$9.00 - 10.50$</span>
                </Card>
              </Col>
            )
          })}
        </Row>

        <Pagination
          defaultCurrent={page}
          total={data.meta.pagination.total}
          pageSize={pageSize}
          onChange={(page, pageSize) => {
            setPagination(page, pageSize)
          }}
        />
      </Col>
    </Row>
  )
}

export default ShopPage
