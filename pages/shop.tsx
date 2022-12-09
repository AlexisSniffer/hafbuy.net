import { useSelector, useDispatch } from 'react-redux'
import useSWR from 'swr'
import { Alert, Col, Row, Spin, Space, Pagination, Divider } from 'antd'

import type { RootState } from '../store'
import { setPage, setPageSize, setQuery } from '../store/searchProductsSlice'
import ProductDefault from '../components/products/ProductDefault'
import {
  FilterCategories,
  FilterPrices,
  FilterBrand,
} from '../components/shop/Filters'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ShopPage = () => {
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.filters)

  const { data, error } = useSWR(
    `https://hafbuy-app-ps9eq.ondigitalocean.app/api/products?${filters.query}`,
    fetcher
  )

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
      <Col span={6}>
        <Space direction="vertical" style={{ display: 'flex' }}>
          <FilterCategories />
          <FilterPrices />
          {/* TODO: añadir filtro de marcas<FilterBrand />  */}
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
            {data.data.length > 0 ? (
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
                      defaultCurrent={filters.page}
                      total={data.meta.pagination.total}
                      pageSize={filters.pageSize}
                      onChange={(page, pageSize) => {
                        dispatch(setPage(page))
                        dispatch(setPageSize(pageSize))
                        dispatch(setQuery())
                      }}
                    />
                  </Col>
                </Row>
              </Space>
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