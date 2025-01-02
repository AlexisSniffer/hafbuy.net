'use client'

import ProductDefault from '@/components/product/product-default'
import Container from '@/components/utils/container'
import { qsProducts } from '@/queries/product'
import useFilterStore from '@/store/filterStore'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
import { FilterOutlined, HomeOutlined } from '@ant-design/icons'
import type { CollapseProps, PaginationProps, ThemeConfig } from 'antd'
import {
  Alert,
  Breadcrumb,
  Button,
  Col,
  Collapse,
  ConfigProvider,
  Divider,
  Drawer,
  Pagination,
  Row,
  Skeleton,
} from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import FilterBrand from './components/filter-brand'
import FilterCategory from './components/filter-category'
import FilterPrice from './components/filter-price'

const theme: ThemeConfig = {
  components: {
    Collapse: {
      borderRadiusLG: 0,
      headerBg: '#fff',
    },
    Pagination: {
      borderRadius: 0,
    },
    Select: {
      borderRadius: 0,
    },
  },
}

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'CATEGORIAS',
    children: <FilterCategory />,
  },
  {
    key: '2',
    label: 'PRECIO',
    children: <FilterPrice />,
  },
  {
    key: '3',
    label: 'MARCAS',
    children: <FilterBrand />,
  },
]

export default function Shop() {
  const filterStore = useFilterStore((state) => state.filter)
  const categoriesStore = useFilterStore((state) => state.categories)
  const pricesStore = useFilterStore((state) => state.prices)
  const brandsStore = useFilterStore((state) => state.brands)
  const viewsStore = useFilterStore((state) => state.views)
  const paginationStore = useFilterStore((state) => state.pagination)
  const { setPagination } = useFilterStore()
  const [open, setOpen] = useState(false)

  const { data: products, error: errorProducts } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProducts({
      filter: filterStore,
      categories: categoriesStore,
      prices: pricesStore,
      brands: brandsStore,
      views: viewsStore,
      pagination: paginationStore,
    })}`,
    fetcher,
  )

  const onChange: PaginationProps['onChange'] = (
    page: number,
    pageSize: number,
  ) => {
    setPagination({
      page,
      pageSize,
    })
  }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current: number,
    pageSize: number,
  ) => {
    setPagination({
      page: current,
      pageSize,
    })
  }

  return (
    <ConfigProvider theme={theme}>
      <Drawer
        placement={'left'}
        closable={false}
        onClose={() => setOpen(!open)}
        open={open}
        width={250}
        styles={{
          body: {
            padding: '10px',
          },
        }}
      >
        <Collapse
          activeKey={['1', '2', '3']}
          items={items}
          defaultActiveKey={['1']}
          expandIconPosition={'end'}
        />
      </Drawer>
      <Container>
        <Row gutter={24}>
          <Col span={24}>
            <Breadcrumb
              items={[
                {
                  title: (
                    <Link href={'/'}>
                      <HomeOutlined />
                    </Link>
                  ),
                },
                {
                  title: <span>Tienda</span>,
                },
              ]}
            />
            <Divider />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={0} lg={8} xl={6}>
            <Collapse
              activeKey={['1', '2', '3']}
              items={items}
              defaultActiveKey={['1']}
              expandIconPosition={'end'}
            />
          </Col>
          <Col xs={24} lg={16} xl={18}>
            <Row
              style={{
                backgroundColor: '#f4f4f4',
                marginBottom: '1rem',
              }}
            >
              <Col xs={24} lg={0} style={{ padding: '10px' }}>
                <Button
                  type="default"
                  size="small"
                  icon={<FilterOutlined />}
                  onClick={() => setOpen(!open)}
                >
                  Filtros
                </Button>
              </Col>
            </Row>
            {products ? (
              <>
                <Row>
                  {products?.data.length ? (
                    <>
                      {products?.data?.map((product: Product) => {
                        return (
                          <Col
                            xs={{ span: 12 }}
                            sm={{ span: 8 }}
                            lg={{ span: 6 }}
                            key={product.attributes.slug}
                          >
                            <ProductDefault
                              id={product.id}
                              attributes={product.attributes}
                            />
                          </Col>
                        )
                      })}
                    </>
                  ) : (
                    <Alert
                      message="No se encontraron productos que coincidan con su selección."
                      type="info"
                      showIcon
                    />
                  )}
                </Row>
                {products?.data.length ? (
                  <>
                    <Divider />
                    <Row gutter={16} justify={'end'}>
                      <Col>
                        <Pagination
                          defaultCurrent={1}
                          current={paginationStore.page}
                          pageSize={paginationStore.pageSize}
                          total={products?.meta?.pagination?.total}
                          showSizeChanger
                          pageSizeOptions={[12, 24, 36, 100]}
                          onChange={onChange}
                          onShowSizeChange={onShowSizeChange}
                        />
                      </Col>
                    </Row>
                  </>
                ) : null}
              </>
            ) : (
              <Skeleton />
            )}
          </Col>
        </Row>
      </Container>
    </ConfigProvider>
  )
}
