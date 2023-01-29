import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { Layout, Carousel, Typography } from 'antd'

import Header from '../components/header/Header'
import Container from '../components/Container'
import { qsCategories } from '../store/queries/categories'
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
          <></>
        )}
        <Title level={5}>{category.name}</Title>
      </Link>
    </div>
  )
}

const HomePage = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategories()}`,
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

  if (error) {
    return <>Error {error}</>
  }

  return (
    <>
      <section style={{ background: '#eceff1', padding: '2rem 0' }}>
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
            {data ? (
              data.data.map((category: any) => {
                return (
                  <CategorySlider
                    key={category.attributes.slug}
                    name={category.attributes.name}
                    slug={category.attributes.slug}
                    image={category.attributes.thumbnail.data.attributes.url}
                  />
                )
              })
            ) : (
              <></>
            )}
          </Carousel>
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
