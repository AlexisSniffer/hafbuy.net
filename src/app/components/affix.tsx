'use client'

import useCartStore from '@/store/cartStore'
import {
  AppstoreAddOutlined,
  HeartOutlined,
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Affix, Badge, Col, Row } from 'antd'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MobileAffix() {
  const [isMobile, setIsMobile] = useState(false)
  const [affix, setAffix] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const countStore = useCartStore((state) => state.count)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }

    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop

      setAffix(scrollPosition > 200)
    }

    checkMobile()
    handleScroll()

    window.addEventListener('resize', checkMobile)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!isMobile || !affix) return null

  return (
    <Affix offsetBottom={0}>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#fff',
          zIndex: 1000,
        }}
      >
        <Row justify="space-around" align="middle" style={{ height: '60px' }}>
          {[
            { icon: <HomeOutlined />, text: 'Inicio', key: 'home', href: '/' },
            {
              icon: <AppstoreAddOutlined />,
              text: 'Categorías',
              key: 'categories',
              href: '/shop',
            },
            {
              icon: <HeartOutlined />,
              text: 'Deseos',
              key: 'wishlist',
              href: '#',
            },
            {
              icon: <UserOutlined />,
              text: 'Cuenta',
              key: 'account',
              href: '/profile',
            },
            {
              icon: (
                <Badge count={countStore}>
                  <ShoppingOutlined style={{ fontSize: '1.7rem' }} />
                </Badge>
              ),
              text: 'Carrito',
              key: 'cart',
              href: '/cart',
            },
          ].map((item, index) => (
            <Col
              key={item.key}
              style={{
                flex: 1,
                textAlign: 'center',
                borderLeft: index > 0 ? '1px solid #e7e7e7' : 'none',
                height: '100%',
                borderTop: '1px solid #e7e7e7',
                padding: '0.2rem 0',
              }}
            >
              <Link href={item.href}>
                <div>
                  <div style={{ fontSize: '25px', color: '#222529' }}>
                    {item.icon}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    marginTop: '4px',
                    color: '#222529',
                  }}
                >
                  {item.text}
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </Affix>
  )
}
