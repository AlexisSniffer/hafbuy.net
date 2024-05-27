'use client'

import { UserOutlined } from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Row,
  ThemeConfig,
  Typography,
} from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const { Title } = Typography
const requiredMessage = 'Campo requerido'

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
    Input: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
    Card: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
  },
}

export default function AccountDetailProfile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onFinish = async (values: any) => {
    setLoading(true)
    setLoading(false)
    setError(JSON.stringify(session))
    router.push('#accountDetail')

    // /api/auth/change-password
    // /api/users/:id
  }

  const validateCurrentPassword = async (rule: any, value: any) => {
    if (!value) {
      return Promise.resolve()
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: session!.user!.email,
            password: value,
          }),
        },
      )

      const data = await response.json()

      if (response.ok && data.jwt) {
        return Promise.resolve()
      } else {
        return Promise.reject('La contraseña actual no es válida.')
      }
    } catch (error) {
      return Promise.reject('La contraseña actual no es válida.')
    }
  }

  return (
    <ConfigProvider theme={theme}>
      <Row style={{ marginBottom: '2rem' }}>
        <Col xs={24}>
          <Flex align="center" gap={5}>
            <UserOutlined style={{ fontSize: '2rem', color: '#d3d3d4' }} />
            <Title id="accountDetail" level={3} style={{ margin: 0 }}>
              Detalle de la Cuenta
            </Title>
          </Flex>
        </Col>
      </Row>
      <Row style={{ marginBottom: '2rem' }}>
        <Col xs={24}>
          {error && (
            <>
              <Alert
                message={error}
                type="error"
                showIcon
                closable
                onClose={() => {
                  setError(null)
                }}
              />
              <br />
            </>
          )}
          <Form
            form={form}
            name="cheackoutForm"
            layout={'vertical'}
            onFinish={onFinish}
            initialValues={{
              ['name']: '',
              ['lastname']: '',
              ['displayName']: null,
              ['email']: '',
              ['passwordCurrent']: null,
              ['passwordNew']: null,
              ['passwordValidate']: null,
            }}
          >
            <Flex gap={16} justify="space-between">
              <Form.Item
                label="Nombre"
                name="name"
                rules={[{ required: true, message: requiredMessage }]}
                style={{ width: '100%' }}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Apellido"
                name="lastname"
                rules={[{ required: true, message: requiredMessage }]}
                style={{ width: '100%' }}
              >
                <Input size="large" />
              </Form.Item>
            </Flex>
            <Form.Item
              label="Nombre para mostrar"
              name="displayName"
              rules={[{ required: true, message: requiredMessage }]}
              style={{ width: '100%' }}
              extra={
                'Así será como se mostrará tu nombre en la sección de cuenta y en reseña.'
              }
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Correo electrónico"
              rules={[{ required: true, message: requiredMessage }]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item>
              <Card style={{ width: '100%' }} title={'Cambio de Contraseña'}>
                <Form.Item
                  name="passwordCurrent"
                  label="Contraseña Actual"
                  rules={[
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
                    },
                    { validator: validateCurrentPassword },
                  ]}
                  extra={
                    'Contraseña actual (deje en blanco para no modificarla)'
                  }
                >
                  <Input.Password size="large" minLength={8} />
                </Form.Item>
                <Form.Item
                  name="passwordNew"
                  label="Contraseña Actual"
                  rules={[
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (getFieldValue('passwordCurrent') && !value) {
                          return Promise.reject(new Error(requiredMessage))
                        }

                        return Promise.resolve()
                      },
                    }),
                  ]}
                  extra={
                    'Nueva contraseña (deje en blanco para no modificarla)'
                  }
                >
                  <Input.Password size="large" minLength={8} />
                </Form.Item>
                <Form.Item
                  name="passwordValidate"
                  label="Confirma Nueva Contraseña"
                  rules={[
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'La contraseña debe tener al menos 8 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const passwordCurrent = getFieldValue('passwordCurrent')
                        const passwordNew = getFieldValue('passwordNew')
                        if (!passwordCurrent) {
                          return Promise.resolve()
                        }
                        if (value === passwordNew) {
                          return Promise.resolve()
                        }
                        return Promise.reject(
                          new Error('Las contraseñas no coinciden'),
                        )
                      },
                    }),
                  ]}
                >
                  <Input.Password size="large" minLength={8} />
                </Form.Item>
              </Card>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                loading={loading}
                onClick={form.submit}
              >
                Guardar Cambios
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
