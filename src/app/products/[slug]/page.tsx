'use client'

import ProductCarousel from '@/components/product/components/product-carousel'
import ProductDetail from '@/components/product/components/product-detail'
import Container from '@/components/utils/container'
import { qsProductsBySlug } from '@/queries/product'
import useViewStore from '@/store/viewStore'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
import { HomeOutlined } from '@ant-design/icons'
import { Alert, Breadcrumb, Col, Divider, Row, Skeleton } from 'antd'
import Link from 'next/link'
import { useEffect } from 'react'
import useSWR from 'swr'
import Reviews from './components/Reviews'
import { useParams } from 'next/navigation'
import ProductsFilterSelected from '@/app/components/products-filter-selected'
import ProductsFilterRelation from '@/app/components/products-filter-relation'

export default function ProductPage() {
  const { add } = useViewStore()
  const params = useParams<{ slug: string }>()

  const { data: product, error: errorProduct } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsProductsBySlug(params.slug)}`,
    fetcher,
  )

  useEffect(() => {
    if (product) add(product.data[0])
  }, [product])

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
      <Row>
        <Col xs={24}>
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
                title: <Link href={'/shop'}>Tienda</Link>,
              },
              {
                title: product.data[0].attributes.name,
              },
            ]}
          />
          <Divider />
        </Col>
      </Row>
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
      <br />
      <br />
      <br />
      <Row>
        <Col span={24}>
          <Reviews
            id={product.data[0].id}
            attributes={product.data[0].attributes}
          />
        </Col>
      </Row>

      <ProductsFilterRelation
        slug={
          product.data[0].attributes.categories?.data[0].attributes.category
            ?.data.attributes.slug!
        }
      />
      <ProductsFilterSelected />
    </Container>
  )
}
