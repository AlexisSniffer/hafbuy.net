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
import Link from 'next/link'
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

export default function SignupForm() {
  const router = useRouter()
  const [signupForm] = Form.useForm()
  const [errorSignup, setErrorSignup] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const onFinishLogin = async (values: { email: string; password: string }) => {
    setLoading(true)

    setLoading(false)
  }

  return (
    <ConfigProvider theme={theme}>
      <Title level={3}>Iniciar Sesión</Title>
      {errorSignup && (
        <>
          <Alert message={errorSignup} type="error" showIcon closable /> <br />
        </>
      )}
      <Form
        form={signupForm}
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
            onClick={signupForm.submit}
          >
            Registrarse
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}
