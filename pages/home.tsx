import { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Layout } from 'antd'

import styles from '../styles/Home.module.scss'
import Header from '../components/header/Header'
import Container from '../components/Container'
import CoverSlider from '../components/partials/home/CoverSlider'
import CategoriesSlider from '../components/partials/home/CategoriesSlider'
import FilterProductsUntil from '../components/partials/home/FilterProductsUntil'
import FilterProductsSortBy from '../components/partials/home/FilterProductsSortBy'

const { Content, Footer } = Layout
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const HomePage = () => {
  return (
    <>
      <Container className={styles['section-sliders']}>
        <CoverSlider />
        <CategoriesSlider />
      </Container>

      <FilterProductsUntil />
      <FilterProductsSortBy />

      <section>
        <Container>
          {/* {setInterval(() => {
            return (
              <pre>
                {Math.floor(
                  Math.random() * CategoriesData?.meta.pagination.total
                )}
              </pre>
            )
          }, 100)} */}
        </Container>
      </section>
    </>
  )
}

HomePage.getLayout = function getLayout(page: any) {
  return (
    <Layout>
      <Header />
      <Content>{page}</Content>
      <Footer>footer</Footer>
    </Layout>
  )
}

export default HomePage
