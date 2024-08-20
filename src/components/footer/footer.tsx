'use client'

import Container from '@/components/utils/container'
import { qsCategory } from '@/queries/category'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import { fetcher } from '@/utils/fetcher'
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Space,
  ThemeConfig,
  Typography,
} from 'antd'
import useSWR from 'swr'
import SocialIcons from '../common/social-icons'
import { MailOutlined } from '@ant-design/icons'
import styles from '@/styles/products-filter.module.scss'

const { Title, Text } = Typography

const theme: ThemeConfig = {
  components: {
    Form: {
      itemMarginBottom: 0,
      algorithm: true,
    },
    Input: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
    Button: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
  },
}

export default function RootFooter() {
  const [form] = Form.useForm()

  const { data: categories, error: errorCategories } = useSWR<
    Payload<Category[]>
  >(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategory}`, fetcher)

  return (
    <ConfigProvider theme={theme}>
      <footer>
        <Container
          style={{
            paddingTop: '3rem',
            paddingBottom: '3rem',
          }}
        >
          <Row align={'middle'}>
            <Col xs={24} md={12} lg={10}>
              <Flex gap={20}>
                <MailOutlined
                  style={{
                    fontSize: '3rem',
                  }}
                />
                <Flex vertical>
                  <Title level={4}>Suscríbete a nuestro boletín</Title>
                  <Text>
                    Obtenga toda la información más reciente sobre eventos,
                    ventas y ofertas.
                  </Text>
                </Flex>
              </Flex>
            </Col>
            <Col xs={24} md={12} lg={14}>
              <Form
                form={form}
                name="headerSearch"
                onFinish={() => {}}
                initialValues={{
                  ['email']: '',
                }}
              >
                <Form.Item name="email">
                  <Space.Compact style={{ width: '100%' }}>
                    <Input
                      placeholder="Ingresa tu correo electrónico"
                      size="large"
                    />
                    <Button type="primary" size="large">
                      ¡Suscribete Ahora!
                    </Button>
                  </Space.Compact>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col xs={24} md={12} lg={6}>
              <Space direction="vertical">
                <Title level={4}>SERVICIO AL CLIENTE</Title>
                <ul
                  style={{
                    listStyle: 'none',
                  }}
                >
                  <li
                    style={{
                      marginBottom: '1rem',
                    }}
                  >
                    Iniciar Sesión
                  </li>
                </ul>
              </Space>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Space direction="vertical">
                <Title level={4}>SOBRE NOSOTROS</Title>
                <ul
                  style={{
                    listStyle: 'none',
                  }}
                >
                  <li
                    style={{
                      marginBottom: '1rem',
                    }}
                  >
                    Sobre Nosotros
                  </li>
                </ul>
              </Space>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Space direction="vertical">
                <Title level={4}>MÁS INFORMACIÓN</Title>
                <ul
                  style={{
                    listStyle: 'none',
                  }}
                >
                  <li
                    style={{
                      marginBottom: '1rem',
                    }}
                  >
                    Términos y Condiciones
                  </li>
                  <li
                    style={{
                      marginBottom: '1rem',
                    }}
                  >
                    Políticas y Privacidad
                  </li>
                </ul>
              </Space>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Space direction="vertical">
                <Title level={4}>SOCIAL MEDIA</Title>
                <SocialIcons size="lg" />
              </Space>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col xs={24} md={16}>
              <Flex vertical gap={10}>
                {categories?.data.map((category: Category) => {
                  return (
                    <Flex
                      key={category.id}
                      gap={5}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Text key={category.attributes.slug} strong>
                        {category.attributes.name}:
                      </Text>
                      <Flex gap={5}>
                        {category.attributes.categories.data.map(
                          (category2: Category) => {
                            return (
                              <Text key={category2.id}>
                                {`${category2.attributes.name} | `}
                              </Text>
                            )
                          },
                        )}
                      </Flex>
                      <Text
                        className={styles['view-all']}
                        style={{
                          margin: 0,
                        }}
                        onClick={() => {
                          //setCategories([attributes.slug])
                          // router.push('/shop')
                        }}
                      >
                        ver más
                      </Text>
                    </Flex>
                  )
                })}
              </Flex>
            </Col>
          </Row>

          {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
          <Divider />
          <Row>
            <Col span={24}>
              <center>Hafbuy © 2024. All Rights Reserved</center>
            </Col>
          </Row>
        </Container>
      </footer>
    </ConfigProvider>
  )
}
