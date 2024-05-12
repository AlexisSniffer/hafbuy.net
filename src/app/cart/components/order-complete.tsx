'use client'

import useCartStore from '@/store/cartStore'
import { Button, ConfigProvider, Result, ThemeConfig, Typography } from 'antd'

const theme: ThemeConfig = {
  components: {},
}

export default function OrderComplete() {
  const orderStore = useCartStore((state) => state.order)

  return (
    <ConfigProvider theme={theme}>
      <Result
        status="success"
        title="¡Gracias por su compra! "
        extra={[
          <Button key={''} type="primary">
            Orden de Compra: {orderStore}
          </Button>,
        ]}
      />
    </ConfigProvider>
  )
}
