import { Button, Col, Form, Input, Row, Typography, notification } from 'antd'
import Cookies from 'js-cookie'

import Container from '../components/Container'
import PageLayout from '../layouts/PageLayout'
import { useRouter } from 'next/router'

const { Title } = Typography

const LoginPage = () => {
  const router = useRouter()
  const [login] = Form.useForm()
  const [signUp] = Form.useForm()
  const [api, contextHolder] = notification.useNotification()

  const onFinishLogin = async (values: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: values.email,
          password: values.password,
        }),
      }
    )

    const data = await response.json()

    if (data.jwt) {
      Cookies.set('jwt', data.jwt)
      Cookies.set('user', data.user)
      router.push(`profile/${data.user.username}`)
    } else {
      api.error({
        message: `Error`,
        description: 'email o contraseña inválidos.',
        placement: 'bottomRight',
      })
    }
  }

  const onFinishSignUp = async (values: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.email,
          email: values.email,
          password: values.password,
          role: 1,
        }),
      }
    )

    const user = await response.json()

    response.status == 200
      ? api.success({
          message: `Usuario creado correctamente`,
          description: `usuario: ${user.user.username}`,
          placement: 'bottomRight',
        })
      : api.error({
          message: `Error`,
          description:
            'El usuario ya existe, o no se puedo crear, intentelo más tarde.',
          placement: 'bottomRight',
        })
  }

  return (
    <>
      {contextHolder}

      <Container>
        <Row gutter={[16, 16]}>
          <Col xs={12}>
            <Title level={3}>Iniciar Sesión</Title>
            <Form
              form={login}
              name="login"
              layout="vertical"
              onFinish={onFinishLogin}
              initialValues={{
                ['email']: '',
                ['password']: '',
              }}
            >
              <Form.Item
                name="email"
                label="Correo Electrónico"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'El correo electrónico es requerido',
                  },
                ]}
              >
                <Input placeholder="Ingrese su correo electrónico" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  { required: true, message: 'La contraseña es requerida' },
                ]}
              >
                <Input.Password placeholder="Ingrese su contraseña" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" block onClick={login.submit}>
                  Iniciar Sesión
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col xs={12} span={1}>
            <Title level={3}>Registro</Title>
            <Form
              form={signUp}
              name="signUp"
              layout="vertical"
              onFinish={onFinishSignUp}
              initialValues={{
                ['email']: '',
                ['password']: '',
              }}
            >
              <Form.Item
                name="email"
                label="Correo Electrónico"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: 'El correo electrónico es requerido',
                  },
                ]}
              >
                <Input placeholder="Ingrese su correo electrónico" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Contraseña"
                rules={[
                  { required: true, message: 'La contraseña es requerida' },
                ]}
              >
                <Input.Password placeholder="Ingrese su contraseña" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" block onClick={signUp.submit}>
                  Registrarse
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

LoginPage.getLayout = function getLayout(page: any) {
  return <PageLayout title="Mi Cuenta">{page}</PageLayout>
}

export default LoginPage
