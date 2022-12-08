import React from 'react'
import { Layout } from 'antd'

import Header from '../components/header/Header'
import Container from '../components/Container'

const { Content, Footer } = Layout

const MainLayout = ({ children }: any) => {
  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <Content>
            <Container>{children}</Container>
          </Content>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    </>
  )
}

export default MainLayout
