import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { Layout, Carousel, Typography, Col, Row, Skeleton, List } from 'antd'
import { HourglassOutlined } from '@ant-design/icons'

import Header from '../components/header/Header'
import Container from '../components/Container'
import ProductDefault from '../components/products/ProductDefault'
import {
  qsCategories,
  qsCategoriesWithProducts,
} from '../store/queries/categories'
import {
  qsFilterUntil,
  qsfilterProductsByCategory,
} from '../store/queries/products'
import styles from '../styles/Home.module.scss'

interface Category {
  name: string
  slug: string
  image: string
}

const { Content, Footer } = Layout
const { Title } = Typography
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const CategorySlider = (category: Category) => {
  return (
    <div>
      <Link href={'/'} className={styles['category-slider']}>
        {category.image ? (
          <figure>
            <Image
              alt="category"
              src={category.image}
              width={128}
              height={128}
            />
          </figure>
        ) : (
          <div className={styles['category-slider']}>
            <figure>
              <div className={styles['category-slider-no-image']}></div>
            </figure>
          </div>
        )}
        <Title level={5}>{category.name}</Title>
      </Link>
    </div>
  )
}

const HomePage = () => {
  const [sortBy, setSortBy] = useState<string>('')

  const { data: CategoriesData, error: CategoriesError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategories()}`,
    fetcher
  )

  const { data: filterUntil, error: filterUntilError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsFilterUntil()}`,
    fetcher
  )

  const {
    data: CategoriesWithProductsData,
    error: CategoriesWithProductsError,
  } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/subcategories?${qsCategoriesWithProducts()}`,
    fetcher
  )

  useEffect(() => {
    setSortBy(CategoriesWithProductsData?.data[0].attributes.slug)
  }, [CategoriesWithProductsData])

  const {
    data: filterProductsByCategory,
    error: filterProductsByCategoryError,
  } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/products?${qsfilterProductsByCategory({
      pagination: 12,
      slug: sortBy,
    })}`,
    fetcher
  )

  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '350px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }

  const onChange = (currentSlide: number) => {
    console.log(currentSlide)
  }

  return (
    <>
      <section className={styles['section-sliders']}>
        <Container>
          <Carousel afterChange={onChange}>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
          <Carousel
            style={{ marginTop: '1rem' }}
            afterChange={onChange}
            slidesToShow={8}
            draggable={true}
            infinite={true}
            dots={false}
            responsive={[
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                },
              },
              {
                breakpoint: 576,
                settings: {
                  slidesToShow: 3,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 4,
                },
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 6,
                },
              },
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 7,
                },
              },
            ]}
          >
            {CategoriesData ? (
              CategoriesData.data.map((category: any) => {
                return (
                  <CategorySlider
                    key={category.attributes.slug}
                    name={category.attributes.name}
                    slug={category.attributes.slug}
                    image={
                      category.attributes.thumbnail.data != null
                        ? category.attributes.thumbnail.data.attributes.url
                        : null
                    }
                  />
                )
              })
            ) : (
              <Skeleton />
            )}
          </Carousel>
        </Container>
      </section>

      {!filterUntilError && filterUntil && filterUntil.data.length > 0 ? (
        <section className={styles['section-filter section-filter-until']}>
          <Container>
            <Title level={3}>
              <HourglassOutlined style={{ marginRight: '0.5rem' }} />
              Ofertas Especiales
            </Title>
            <article>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <ProductDefault
                    product={filterUntil.data[0]}
                  ></ProductDefault>
                </Col>
                <Col span={16}>
                  <Row gutter={[16, 16]}>
                    {filterUntil.data.slice(1, 9).map((product: any) => {
                      return (
                        <Col span={6} key={product.attributes.slug}>
                          <ProductDefault product={product}></ProductDefault>
                        </Col>
                      )
                    })}
                  </Row>
                </Col>
              </Row>
            </article>
          </Container>
        </section>
      ) : (
        <></>
      )}

      <section className={styles['section-filter']}>
        <Container>
          <Row>
            <Col span={6}>
              <Title level={3}>Ordenar por</Title>
              <List
                size="small"
                dataSource={CategoriesWithProductsData?.data}
                renderItem={(item: any) => (
                  <List.Item>
                    <Typography.Text
                      onClick={() => {
                        setSortBy(item.attributes.slug)
                      }}
                    >
                      {item.attributes.name}
                    </Typography.Text>
                  </List.Item>
                )}
              ></List>
            </Col>
            <Col span={6}>Espacio publicitario</Col>
            <Col span={12}>
              <Row gutter={[16, 16]}>
                {filterProductsByCategory?.data.map((product: any) => {
                  return (
                    <Col span={8} key={product.attributes.slug}>
                      <ProductDefault product={product}></ProductDefault>
                    </Col>
                  )
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

HomePage.getLayout = function getLayout(page: any) {
  return (
    <Layout>
      <Header />
      <Layout>
        <Content>{page}</Content>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  )
}

export default HomePage
