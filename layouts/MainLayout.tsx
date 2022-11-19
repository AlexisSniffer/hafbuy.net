import { Layout } from 'antd'
import React from 'react'
import Header from '../components/Header'

const { Content, Footer } = Layout

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
