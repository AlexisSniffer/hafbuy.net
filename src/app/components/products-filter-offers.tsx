import ProductDefault from '@/components/product/product-default'
import ProductOffer from '@/components/product/product-offer'
import { qsProductUntil } from '@/queries/product'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
import { CalendarOutlined } from '@ant-design/icons'
import {
  Col,
  ConfigProvider,
  Flex,
  Row,
  Skeleton,
  ThemeConfig,
  Typography,
} from 'antd'
import useSWR from 'swr'

const { Title } = Typography

const theme: ThemeConfig = {
  components: {},
}

export default function ProductsFilterOffers() {
  const { data: products, error: errorProducts } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProductUntil}`,
    fetcher,
  )

  if (!products) {
    return <Skeleton />
  }

  return (
    <ConfigProvider theme={theme}>
      <Row>
        <Flex gap={10} align="center" style={{ margin: '0.5rem' }}>
          <CalendarOutlined style={{ fontSize: '1.5rem' }} />
          <Title level={3} style={{ margin: 0 }}>
            Ofertas Especiales
          </Title>
        </Flex>
      </Row>
      <Row>
        <Col xs={24} md={8}>
          <ProductOffer
            id={products.data[0].id}
            attributes={products.data[0].attributes}
          />
        </Col>
        <Col xs={24} md={16}>
          <Row>
            {products.data!.slice(1, 9).map((product: Product) => {
              return (
                <Col
                  xs={{ span: 12 }}
                  sm={{ span: 8 }}
                  md={{ span: 8 }}
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
          </Row>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
