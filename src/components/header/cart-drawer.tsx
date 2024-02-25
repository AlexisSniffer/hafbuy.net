'use client'

import ProductCart from '@/components/product/product-cart'
import useCartStore from '@/store/cartStore'
import { money } from '@/utils/formatters'
import {
  Button,
  ConfigProvider,
  Divider,
  Drawer,
  Flex,
  ThemeConfig,
  Typography,
} from 'antd'
import { useRouter } from 'next/navigation'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
  },
}

export default function CartDrawer(props: CartDrawerProps) {
  const router = useRouter()
  const cartStore = useCartStore((state) => state.cart)
  const subTotalStore = useCartStore((state) => state.subtotal)
  const { setStep } = useCartStore()

  return (
    <ConfigProvider theme={theme}>
      <Drawer
        title="Carrito de Compra"
        placement="right"
        closable={true}
        onClose={props.onClose}
        open={props.isOpen}
      >
        {cartStore.length ? (
          <>
            <Flex vertical gap={20}>
              {cartStore.map((product) => {
                return <ProductCart key={product.id} product={product} />
              })}
            </Flex>
            <Divider />
            <Flex vertical gap={10}>
              <Flex justify="space-between">
                <Text strong>SUBTOTAL:</Text>
                <Text strong>{money.format(subTotalStore)}</Text>
              </Flex>
              <Button
                size="large"
                onClick={() => {
                  // TODO: cerrar modal al ir a /cart
                  setStep(0)
                  router.push('/cart')
                }}
              >
                VER
              </Button>
              <Button
                size="large"
                type="primary"
                onClick={() => {
                  setStep(1)
                  router.push('/cart')
                }}
              >
                VERIFICAR
              </Button>
            </Flex>
          </>
        ) : (
          <Text italic>No hay productos en el carrito.</Text>
        )}
      </Drawer>
    </ConfigProvider>
  )
}
