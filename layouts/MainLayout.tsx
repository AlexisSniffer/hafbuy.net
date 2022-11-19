import { Layout } from 'antd'
import { Content, Footer } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import React from 'react'
import Header from '../components/Header'

export default function MainLayout({ children }: any) {
  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <Content>main content</Content>
        </Layout>
        <Footer>footer</Footer>
      </Layout>

      {children}
    </>
  )
}
