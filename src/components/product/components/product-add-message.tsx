import useCartStore from '@/store/cartStore'
import styles from '@/styles/product.module.scss'
import { Product } from '@/types/product'
import { Button, ConfigProvider, Flex, ThemeConfig, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 0,
    },
  },
}

const { Text } = Typography

export default function ProductAddMessage({ id, attributes }: Product) {
  const router = useRouter()
  const { setStep } = useCartStore()

  return (
    <ConfigProvider theme={theme}>
      <Flex
        vertical
        className={`${styles['product']} ${styles['product-add-message']}`}
      >
        <Flex align="center" gap={10}>
          <Image
            src={attributes.images.data[0].attributes.url}
            alt={
              attributes.images.data[0].attributes.alternativeText ??
              attributes.slug
            }
            width={60}
            height={60}
          />
          <Flex vertical>
            <Text className={styles['name']}>{attributes.name}</Text>
            <Text className={styles['add-message']}>
              se ha agregado a tu carrito!
            </Text>
          </Flex>
        </Flex>
        <Flex gap={10}>
          <Button
            block
            onClick={() => {
              setStep(0)
              router.push('/cart')
            }}
          >
            VER
          </Button>
          <Button
            block
            type="primary"
            onClick={() => {
              setStep(1)
              router.push('/cart')
            }}
          >
            VERIFICAR
          </Button>
        </Flex>
      </Flex>
    </ConfigProvider>
  )
}
