'use client'

import Container from '@/components/utils/container'
import { qsCategory } from '@/queries/category'
import useFilterStore from '@/store/filterStore'
import styles from '@/styles/products-filter.module.scss'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import { fetcher } from '@/utils/fetcher'
import { MailOutlined } from '@ant-design/icons'
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
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import SocialIcons from '../common/social-icons'

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
  const router = useRouter()
  const [form] = Form.useForm()
  const { setCategories } = useFilterStore()

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
          <Row align={'middle'} gutter={[10, 10]}>
            <Col xs={24} md={12} lg={8}>
              <Flex gap={20}>
                <MailOutlined
                  style={{
                    fontSize: '3rem',
                  }}
                />
                <Flex vertical>
                  <Title level={4} style={{ margin: 0 }}>
                    Suscríbete a nuestro boletín
                  </Title>
                  <Text>
                    Obtenga toda la información más reciente sobre eventos,
                    ventas y ofertas.
                  </Text>
                </Flex>
              </Flex>
            </Col>
            <Col xs={24} md={12} lg={16}>
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
                      ¡Suscribete!
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
                <Title level={5} style={{ fontWeight: 'bold' }}>
                  SERVICIO AL CLIENTE
                </Title>
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
                <Title level={5} style={{ fontWeight: 'bold' }}>
                  SOBRE NOSOTROS
                </Title>
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
                <Title level={5} style={{ fontWeight: 'bold' }}>
                  MÁS INFORMACIÓN
                </Title>
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
                <Title level={5} style={{ fontWeight: 'bold' }}>
                  SOCIAL MEDIA
                </Title>
                <SocialIcons size="lg" />
              </Space>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col xs={24} md={18}>
              <Flex vertical gap={10}>
                {categories?.data.map((category: Category) => {
                  return (
                    <Flex
                      key={category.id}
                      gap={5}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <Flex gap={5} wrap>
                        {category.attributes.categories.data
                          .slice(0, 10)
                          .map((category2: Category, index, array) => {
                            return (
                              <>
                                {index == 0 ? (
                                  <Text key={category.attributes.slug} strong>
                                    {category.attributes.name}:
                                  </Text>
                                ) : (
                                  <></>
                                )}
                                <Text
                                  key={category2.id}
                                  style={{
                                    color: '#777',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => {
                                    setCategories([category2.attributes.slug])
                                    router.push('/shop')
                                  }}
                                >
                                  {`${category2.attributes.name}`}
                                </Text>
                                <Text
                                  key={category2.id}
                                  style={{
                                    color: '#777',
                                  }}
                                  onClick={() => {
                                    setCategories([category2.attributes.slug])
                                    router.push('/shop')
                                  }}
                                >
                                  |
                                </Text>
                                {index == array.length - 1 ? (
                                  <Text
                                    className={styles['view-all']}
                                    style={{
                                      margin: 0,
                                      cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                      setCategories([category.attributes.slug])
                                      router.push('/shop')
                                    }}
                                  >
                                    ver más
                                  </Text>
                                ) : (
                                  <></>
                                )}
                              </>
                            )
                          })}
                      </Flex>
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
