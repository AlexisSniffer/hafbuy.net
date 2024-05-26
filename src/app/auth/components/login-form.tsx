'use client'

import {
  Alert,
  Button,
  ConfigProvider,
  Form,
  Input,
  ThemeConfig,
  Typography,
} from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
  const router = useRouter()
  const [loginForm] = Form.useForm()
  const [errorLogin, setErrorLogin] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onFinishLogin = async (values: { email: string; password: string }) => {
    setLoading(true)

    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })

    if (response?.error) {
      setErrorLogin(response.error)
    } else {
      router.push('/profile')
    }

    setLoading(false)
  }

  return (
    <ConfigProvider theme={theme}>
      <Title level={3}>Iniciar Sesión</Title>
      {errorLogin && (
        <>
          <Alert message={errorLogin} type="error" showIcon closable /> <br />
        </>
      )}
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
          <Button
            type="primary"
            block
            size="large"
            loading={loading}
            onClick={loginForm.submit}
          >
            Iniciar Sesión
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" block size="large" onClick={() => {}}>
            Crear una cuenta
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}
