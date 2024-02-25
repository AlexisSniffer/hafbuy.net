'use client'

import Logo from '@/components/common/logo'
import SocialIcons from '@/components/common/social-icons'
import Container from '@/components/utils/container'
import { qsCategoryHeader } from '@/queries/category'
import styles from '@/styles/header.module.scss'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import { fetcher } from '@/utils/fetcher'
import { MenuOutlined } from '@ant-design/icons'
import { Affix, Col, Row } from 'antd'
import { useState } from 'react'
import useSWR from 'swr'
import Account from './account'
import CartIcons from './cart-icons'
import CategoriesMenu from './categories-menu'
import Contact from './contact'
import DrawerMenu from './drawer-menu'
import HeaderInfo from './header-info'
import HeaderSearch from './header-search'
import Languages from './languages'
import MainMenu from './main-menu'
import TopMenu from './top-menu'

export default function RootHeader() {
  const [affix, setAffix] = useState<boolean>(false)
  const [open, setOpen] = useState(false)

  const { data: categories, error: errorCategories } = useSWR<
    Payload<Category[]>
  >(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategoryHeader}`,
    fetcher,
  )

  return (
    <>
      <header className={styles['header']}>
        <Container className={styles['top']}>
          <Row
            justify={'space-between'}
            align={'middle'}
            gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 0]}
          >
            <Col xs={0} sm={12} lg={8}>
              <HeaderInfo />
            </Col>
            <Col xs={24} sm={12} lg={16}>
              <Row
                justify={{ xs: 'space-between', sm: 'end' }}
                align={'middle'}
                gutter={{ xs: 8, sm: 16, md: 24 }}
              >
                <Col>
                  <Languages />
                </Col>
                <Col flex={'0 0 auto'} xs={{ span: 0 }} lg={24}>
                  <TopMenu />
                </Col>
                <Col>
                  <SocialIcons size="xs" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        {/* TODO: bug - Warning: findDOMNode is deprecated in StrictMode. findDOMNode was
          passed an instance of DomWrapper which is inside StrictMode.
        */}
        <Affix
          onChange={(affixed?: boolean) => {
            setAffix(affixed!)
          }}
        >
          <Container
            className={`${styles['middle']} ${affix ? styles.affix : null}`}
          >
            <Row
              align={'middle'}
              justify={'space-between'}
              gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 0]}
            >
              <Col>
                <Row align={'middle'} gutter={20}>
                  <Col lg={0}>
                    <MenuOutlined onClick={() => setOpen(!open)} />
                  </Col>
                  <Col>
                    <Logo />
                  </Col>
                </Row>
              </Col>
              <Col flex={'auto'} xs={0} lg={24}>
                <HeaderSearch data={categories?.data} meta={categories?.meta} />
              </Col>
              <Col flex={'0 0 auto'} xs={0} lg={24}>
                <Account />
              </Col>
              <Col>
                <CartIcons data={categories?.data} meta={categories?.meta} />
              </Col>
            </Row>
          </Container>
        </Affix>

        <Container className={styles['bottom']}>
          <Col xs={0} lg={24}>
            <Row
              justify={'space-between'}
              align={'middle'}
              gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 0]}
            >
              <Col>
                <CategoriesMenu
                  data={categories?.data}
                  meta={categories?.meta}
                />
              </Col>
              <Col flex={'auto'}>
                <Row justify={'space-between'} align={'middle'}>
                  <Col>
                    <MainMenu />
                  </Col>
                  <Col>
                    <Contact />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Container>
      </header>

      <DrawerMenu isOpen={open} onClose={() => setOpen(!open)} />
    </>
  )
}
