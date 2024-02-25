import { qsMaxPrice } from '@/queries/price'
import useFilterStore from '@/store/filterStore'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { fetcher } from '@/utils/fetcher'
import { ConfigProvider, Skeleton, Slider, ThemeConfig, Typography } from 'antd'
import { useEffect } from 'react'
import useSWR from 'swr'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Typography: {
      colorText: '#777',
    },
  },
}

export default function FilterPrice() {
  const pricesStore = useFilterStore((state) => state.prices)
  const { setPrices } = useFilterStore()

  const { data: products, error: errorProducts } = useSWR<Payload<Product[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsMaxPrice}`,
    fetcher,
  )

  useEffect(() => {
    setPrices([0, products?.data[0].attributes.price ?? 9999])
  }, [products, setPrices])

  if (!products) {
    return <Skeleton />
  }

  const onChange = (value: number[]) => {
    setPrices(value)
  }

  return (
    <ConfigProvider theme={theme}>
      <Slider
        range
        defaultValue={[0, products?.data[0].attributes.price]}
        min={0}
        max={products?.data[0].attributes.price}
        onChangeComplete={onChange}
      />
      <Text>
        Precio: ${pricesStore[0]} - ${pricesStore[1]}
      </Text>
    </ConfigProvider>
  )
}
