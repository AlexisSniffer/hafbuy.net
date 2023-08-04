import React from 'react'
import { Layout, Typography } from 'antd'

import HeaderMain from '../components/header/Header'
import Container from '../components/Container'
import Footer from '../components/footer/Footer'

const { Content, Header } = Layout
const { Title } = Typography

const PageLayout = ({ children, title }: any) => {
  return (
    <>
      <Layout>
        <HeaderMain />
        <Layout>
          <Content>
            <Header
              style={{
                padding: '2rem 0',
                color: '#222529',
                backgroundColor: '#e5e3df',
                textAlign: 'center',
                height: 'auto',
              }}
            >
              <Container>
                <Title level={1}>{title}</Title>
              </Container>
            </Header>
            <Container>{children}</Container>
          </Content>
        </Layout>
        <Footer />
      </Layout>
    </>
  )
}

export default PageLayout
