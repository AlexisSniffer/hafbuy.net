'use client'

import {
  Alert,
  Button,
  ConfigProvider,
  Form,
  Input,
  ThemeConfig,
  Typography,
  notification,
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
  const [api, contextHolder] = notification.useNotification()

  const onFinishLogin = async (values: {
    username: string
    email: string
    password: string
  }) => {
    setLoading(true)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          role: 1,
        }),
      },
    )

    const user = await response.json()

    if (response.status == 200) {
      api.success({
        message: `Usuario creado correctamente`,
        description: `usuario: ${user.user.username}`,
        placement: 'bottomRight',
      })

      router.push('/auth/login')
    } else {
      setErrorSignup(
        'El usuario ya existe, o no se puede crear, intentelo más tarde.',
      )
    }

    setLoading(false)
  }

  return (
    <ConfigProvider theme={theme}>
      {contextHolder}

      <Title level={3}>Registrarse</Title>
      {errorSignup && (
        <>
          <Alert
            message={errorSignup}
            type="error"
            showIcon
            closable
            onClose={() => {
              setErrorSignup(null)
            }}
          />{' '}
          <br />
        </>
      )}
      <Form
        form={signupForm}
        name="login"
        layout="vertical"
        onFinish={onFinishLogin}
        initialValues={{
          ['username']: '',
          ['email']: '',
          ['password']: '',
        }}
      >
        <Form.Item
          name="username"
          label="Usuario"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'El usuario es requerido',
            },
            {
              pattern: /^(?!_)(?!.*_$)(?!.*__)[a-zA-Z0-9_]{5,15}$/,
              message:
                'El nombre de usuario debe tener entre 5 y 15 caracteres y solo puede contener letras, números y guiones bajos. No puede comenzar ni terminar con un guion bajo.',
            },
          ]}
        >
          <Input size="large" minLength={5} maxLength={15} showCount />
        </Form.Item>
        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'El correo electrónico es requerido',
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Por favor ingresa un correo electrónico válido.',
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            { required: true, message: 'La contraseña es requerida' },
            {
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                'La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
            },
          ]}
        >
          <Input.Password size="large" minLength={8} />
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
