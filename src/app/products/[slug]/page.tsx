'use client'

import ProductCarousel from '@/components/product/components/product-carousel'
import ProductDetail from '@/components/product/components/product-detail'
import Container from '@/components/utils/container'
import { qsProductsBySlug } from '@/queries/product'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
import { Alert, Col, Row, Skeleton } from 'antd'
import useSWR from 'swr'

export default function Product({ params }: { params: { slug: string } }) {
  const { data: product, error: errorProduct } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProductsBySlug(
      params.slug,
    )}`,
    fetcher,
  )

  if (errorProduct) {
    return (
      <Container>
        <Alert message="No existe el producto solicitado" type="error" />
      </Container>
    )
  }

  if (!product) {
    return (
      <Container>
        <Skeleton />
      </Container>
    )
  }

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={10}>
          <ProductCarousel
            id={product.data[0].id}
            attributes={product.data[0].attributes}
          />
        </Col>
        <Col xs={24} md={14}>
          <ProductDetail
            id={product.data[0].id}
            attributes={product.data[0].attributes}
          />
        </Col>
      </Row>
    </Container>
  )
}
