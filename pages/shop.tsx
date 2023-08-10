import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useSWR from 'swr'
import {
  Alert,
  Col,
  Row,
  Space,
  Pagination,
  Divider,
  Skeleton,
  Button,
  Drawer,
} from 'antd'

import type { RootState } from '../store'
import { setPage, setPageSize, setQuery } from '../store/searchProductsSlice'
import ProductDefault from '../components/products/ProductDefault'
import {
  FilterCategories,
  FilterPrices,
  FilterBrand,
} from '../components/shop/Filters'
import { FilterOutlined } from '@ant-design/icons'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ShopPage = () => {
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.filters)
  const [open, setOpen] = useState(false)

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${filters.query}`,
    fetcher
  )

  const showDrawer = () => {
    setOpen(!open)
  }

  if (error) {
    return (
      <Alert
        showIcon
        type="error"
        description="Error: No se pudo obtener la infomación, intentelo mas tarde."
      ></Alert>
    )
  }

  return (
    <Row gutter={16}>
      <Col xs={{ span: 24 }} lg={{ span: 0 }}>
        <Button icon={<FilterOutlined rev={undefined} />} onClick={showDrawer}>
          Filtros
        </Button>
        <Drawer
          title="Filtros"
          placement="left"
          closable={true}
          onClose={showDrawer}
          open={open}
          key="filters"
        >
          <Space direction="vertical" style={{ display: 'flex' }}>
            <FilterCategories />
            <FilterPrices />
          </Space>
        </Drawer>
        <br />
        <br />
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 8 }} xl={{ span: 6 }}>
        <Space direction="vertical" style={{ display: 'flex' }}>
          <FilterCategories />
          <FilterPrices />
          {/* TODO: añadir filtro de marcas<FilterBrand />  */}
        </Space>
      </Col>
      <Col xs={{ span: 24 }} lg={{ span: 16 }} xl={{ span: 18 }}>
        {!data ? (
          <Skeleton />
        ) : (
          <>
            {data.data.length > 0 ? (
              <div>
                <Row gutter={[16, 16]}>
                  {data.data.map((product: any) => {
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
                <Divider />
                <Row justify={'end'}>
                  <Col flex={'auto'} />
                  <Col>
                    <Pagination
                      defaultCurrent={filters.page}
                      total={data.meta.pagination.total}
                      pageSize={filters.pageSize}
                      onChange={(page, pageSize) => {
                        dispatch(setPage(page))
                        dispatch(setPageSize(pageSize))
                        dispatch(setQuery())

                        window.scrollTo({
                          top: 0,
                          behavior: 'smooth',
                        })
                      }}
                    />
                  </Col>
                </Row>
              </div>
            ) : (
              <Alert
                showIcon
                type="warning"
                description={`Tu búsqueda ${filters.filter} no consiguió resultados. Mira en otros productos en nuestra tienda.`}
              ></Alert>
            )}
          </>
        )}
      </Col>
    </Row>
  )
}

export default ShopPage
