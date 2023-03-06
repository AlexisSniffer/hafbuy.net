import useSWR from 'swr'
import { Col, Layout, Row } from 'antd'

import styles from '../styles/Home.module.scss'
import Header from '../components/header/Header'
import Container from '../components/Container'
import CoverSlider from '../components/partials/home/CoverSlider'
import CategoriesSlider from '../components/partials/home/CategoriesSlider'
import FilterProductsUntil from '../components/partials/home/FilterProductsUntil'
import FilterProductsSortBy from '../components/partials/home/FilterProductsSortBy'
import { qsCategories } from '../store/queries/categories'
import FilterProductsOne from '../components/partials/home/FilterProductsOne'
import FilterProductsTwo from '../components/partials/home/FilterProductsTwo'

const { Content, Footer } = Layout
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const HomePage = () => {
  const { data: categories, error: categoriesError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategories()}`,
    fetcher
  )

  return (
    <>
      <Container className={styles['section-sliders']}>
        <CoverSlider />
        <CategoriesSlider data={categories} error={categoriesError} />
      </Container>

      <FilterProductsUntil />
      <FilterProductsSortBy />
      <FilterProductsOne
        categories={categories}
        categoriesError={categoriesError}
      />
      <FilterProductsTwo
        categories={categories}
        categoriesError={categoriesError}
      />
    </>
  )
}

HomePage.getLayout = function getLayout(page: any) {
  return (
    <Layout>
      <Header />
      <Content style={{ paddingBottom: 0 }}>{page}</Content>
      <Footer>Hafbuy. © 2023. All Rights Reserved</Footer>
    </Layout>
  )
}

export default HomePage
