'use client'

import Container from '@/components/utils/container'
import { qsCategory } from '@/queries/category'
import { qsHomePage } from '@/queries/pages'
import styles from '@/styles/products-filter.module.scss'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import { fetcher } from '@/utils/fetcher'
import { randomCategory } from '@/utils/random'
import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import CarouselMain from './components/carousel'
import CategoriesSlider from './components/categories-slider'
import FeaturedBrands from './components/featured-brands'
import ProductsFilterCategory1 from './components/products-filter-category1'
import ProductsFilterCategory2 from './components/products-filter-category2'
import ProductsFilterCategory3 from './components/products-filter-category3'
import ProductsFilterOffers from './components/products-filter-offers'
import ProductsFilterSelected from './components/products-filter-selected'
import ProductsFilterSortBy from './components/products-filter-sortby'
import ProductsFilterViewed from './components/products-filter-viewed'
import Services from './components/services'
import Image from 'next/image'

export default function Home() {
  const [random1, setRandom1] = useState<number>(0)
  const [random2, setRandom2] = useState<number>(0)
  const [random3, setRandom3] = useState<number>(0)

  const { data: categories, error: errorCategories } = useSWR<
    Payload<Category[]>
  >(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategory}`, fetcher)

  useEffect(() => {
    setInterval(() => {
      setRandom1(randomCategory(categories?.meta?.pagination?.total ?? 0))
      setRandom2(randomCategory(categories?.meta?.pagination?.total ?? 0))
      setRandom3(randomCategory(categories?.meta?.pagination?.total ?? 0))
    }, 60000)
  }, [categories])

  return (
    <>
      <Container className={styles['section-gray']}>
        <CarouselMain />
        <br />
        <br />
        <CategoriesSlider categories={categories} />
      </Container>

      <Container className={styles['section-white']}>
        <Services />
        <ProductsFilterOffers />
      </Container>

      <Container className={styles['section-gray']}>
        <ProductsFilterSortBy />
        {categories ? (
          <>
            <ProductsFilterCategory1
              id={categories?.data[random1].id}
              attributes={categories?.data[random1].attributes}
            />
            <ProductsFilterCategory2
              id={categories?.data[random2].id}
              attributes={categories?.data[random2].attributes}
            />
            <ProductsFilterCategory3
              id={categories?.data[random3].id}
              attributes={categories?.data[random3].attributes}
            />
          </>
        ) : (
          <></>
        )}
        <FeaturedBrands />
        <ProductsFilterSelected />

        <Row className={styles['article']}>
          <Col xs={24}>
            <Image
              src={'/publicidad/Publicidad 8.jpg'}
              alt={'Publicidad'}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </Col>
        </Row>

        <ProductsFilterViewed />
      </Container>
    </>
  )
}
