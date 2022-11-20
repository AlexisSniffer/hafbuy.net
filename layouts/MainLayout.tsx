import { Layout } from 'antd'
import React from 'react'
import Header from '../components/Header'
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
