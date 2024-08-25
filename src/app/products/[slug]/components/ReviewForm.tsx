'use client'

import { Product } from '@/types/product'
import { Button, Card, Form, Input, notification, Rate, Typography } from 'antd'
import { useSession } from 'next-auth/react'

const { Text } = Typography

export default function ReviewForm({ id }: Product) {
  const { data: session, status } = useSession()
  const [form] = Form.useForm()
  const [api, contextHolder] = notification.useNotification()

  const onFinish = async (values: {
    rating: number
    comment: string
    name: string
    email: string
  }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.user != null && {
            Authorization: `Bearer ${session?.user.token}`,
          }),
        },
        body: JSON.stringify({
          data: {
            rating: values.rating,
            comment: values.comment,
            name: values.name,
            email: values.email,
            product: id,
            user: session?.user != null ? session?.user.id : null,
          },
        }),
      },
    )

    if (response.ok) {
      api.success({
        message: `Enviada con éxito`,
        description: `Su reseña para el producto se ha creado exitosamente.`,
        placement: 'bottomRight',
      })

      form.resetFields()
    } else {
      api.error({
        message: `Error`,
        description:
          'Hubo un problema al enviar la reseña del producto. Por favor, inténtelo de nuevo más tarde.',
        placement: 'bottomRight',
      })
    }
  }

  return (
    <>
      {contextHolder}
      <Card
        style={{
          width: '100%',
          backgroundColor: '#f4f4f4',
          padding: '0.2rem',
          borderRadius: '3px',
        }}
      >
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ['rating']: 0,
            ['comment']: '',
            ['name']:
              session?.user != null
                ? `${session.user.name} ${session.user.lastname}`
                : '',
            ['email']: session?.user != null ? session.user.email : '',
          }}
        >
          <Form.Item
            name="rating"
            label="Clasificación"
            rules={[
              { required: true, message: 'Ingrese una clasificación' },
              {
                type: 'number',
                min: 1,
                message: 'Ingrese una clasificación',
              },
            ]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Comentario"
            rules={[
              {
                required: true,
                message: 'Ingrese un comentario',
              },
            ]}
          >
            <Input.TextArea showCount={true} maxLength={200} />
          </Form.Item>
          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: 'Ingrese su nombre' }]}
          >
            <Input maxLength={50} disabled={session?.user != null} />
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
            ]}
          >
            <Input maxLength={100} disabled={session?.user != null} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={form.submit}>
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
