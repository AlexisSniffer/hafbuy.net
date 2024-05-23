import {
  Button,
  ConfigProvider,
  Form,
  Input,
  ThemeConfig,
  Typography,
  notification,
} from 'antd'

const { Title } = Typography

const theme: ThemeConfig = {
  components: {
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

export default function LoginForm() {
  const [loginForm] = Form.useForm()
  const [api, contextHolder] = notification.useNotification()

  const onFinishLogin = async (values: any) => {
    /* const response = await fetch(
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
      },
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
    }*/
  }

  return (
    <ConfigProvider theme={theme}>
      {contextHolder}

      <Title level={3}>Iniciar Sesión</Title>
      <Form
        form={loginForm}
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
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[{ required: true, message: 'La contraseña es requerida' }]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block size="large" onClick={loginForm.submit}>
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}
