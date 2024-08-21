import useCartStore from '@/store/cartStore'
import styles from '@/styles/product.module.scss'
import { Product, ProductCart } from '@/types/product'
import { Variants } from '@/types/variants'
import { Variation } from '@/types/variation'
import { disableProduct, productPrice } from '@/utils/product'
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Form,
  InputNumber,
  Row,
  Space,
  Tag,
  ThemeConfig,
  Typography,
  notification,
} from 'antd'
import { useState } from 'react'
import ProductAddMessage from './product-add-message'
import ProductPrices from './product-price'
import ProductVariants from './product-variants'

const { Title, Paragraph, Text } = Typography

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 0,
    },
    Space: {
      borderRadius: 0,
    },
    Modal: {
      borderRadius: 0,
    },
  },
}

export default function ProductAdd({ id, attributes }: Product) {
  const [form] = Form.useForm()
  const { add } = useCartStore()
  const cartStore = useCartStore((state) => state.cart)
  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 4 },
  })

  const allVariantOptions = attributes.variants?.map((variant: Variants) => {
    const allOptions: any = {}

    variant.variant.map((variation: Variation) => {
      allOptions[variation.type?.data.attributes.type ?? ''] = variation.value
        .toLowerCase()
        .trim()
    })

    return {
      id: variant.id,
      price: variant.price,
      discount: variant.discount,
      isDiscount: variant.isDiscount,
      until: variant.until,
      stock: variant.stock,
      variant: allOptions,
    }
  })

  let optionsMap: any = new Map()
  allVariantOptions
    .map((e) => e.variant)
    .map((e) => {
      const keys = Object.keys(e)

      keys.forEach((key) => {
        if (!optionsMap.has(key)) {
          optionsMap.set(key, new Set())
        }

        optionsMap.get(key).add(e[key])
      })
    })

  let options = []
  for (const [key, value] of optionsMap) {
    options.push({
      type: key,
      values: value,
    })
  }

  const [selectedVariant, setSelectedVariant] = useState<Variants | undefined>()
  const [selectedOptions, setSelectedOptions] = useState({})

  const setOptions = (type: string, value: string) => {
    setSelectedOptions((prevState: any) => {
      return { ...prevState, [type]: value }
    })

    const selection = {
      ...selectedOptions,
      [type]: value,
    }

    setSelectedVariant(undefined)
    allVariantOptions.map((item) => {
      if (JSON.stringify(item.variant) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }
  ///////////////////////////////////////////////

  const onFinish = (values: any) => {
    if (validateStock({ id: id, stock: attributes.stock, qty: values.qty })) {
      api.open({
        message: null,
        type: 'warning',
        description: 'No hay la cantidad solicitada',
        placement: 'bottomRight',
      })

      return
    }

    let product: ProductCart = {
      id,
      attributes,
      qty: values.qty,
      price: productPrice({ id, attributes }, selectedVariant),
      ...(attributes.variants.length && selectedVariant
        ? { variant: selectedVariant }
        : null),
    }

    api.open({
      message: null,
      description: <ProductAddMessage id={id} attributes={attributes} />,
      placement: 'bottomRight',
    })

    add(product)
  }

  const validateStock = (attributes: {
    id: number
    stock: number
    qty: number
  }) => {
    if (selectedVariant) {
      const cartItem = cartStore.find(
        (item) =>
          item.id === attributes.id && item.variant?.id === selectedVariant.id,
      )

      return cartItem
        ? cartItem.qty + attributes.qty > selectedVariant.stock
        : false || !(selectedVariant.stock > 0)
    } else {
      const cartItem = cartStore.find((item) => item.id === attributes.id)

      return cartItem
        ? cartItem.qty + attributes.qty > attributes.stock
        : false || !(attributes.stock > 0)
    }
  }

  const disabledStock = (attributes: { id: number; stock: number }) => {
    if (selectedVariant) {
      const cartItem = cartStore.find(
        (item) =>
          item.id === attributes.id && item.variant?.id === selectedVariant.id,
      )

      return cartItem
        ? cartItem.qty >= selectedVariant.stock
        : false || !(selectedVariant.stock > 0)
    } else {
      const cartItem = cartStore.find((item) => item.id === attributes.id)

      return cartItem
        ? cartItem.qty >= attributes.stock
        : false || !(attributes.stock > 0)
    }
  }

  return (
    <ConfigProvider theme={theme}>
      {contextHolder}
      <Row>
        <Col span={24}>
          <Flex vertical gap={5}>
            {attributes.variants.length ? (
              <Space>
                <Text className={styles['detail']}>stock:</Text>
                {selectedVariant ? (
                  <Tag
                    className={`${styles['detail']} ${styles['detail-stock']} ${
                      selectedVariant.stock > 0
                        ? styles['detail-stock-available']
                        : styles['detail-stock-soldout']
                    }`}
                  >
                    {selectedVariant.stock > 0 ? 'disponible' : 'agotado'}
                  </Tag>
                ) : (
                  <Tag>Seleccione una variante</Tag>
                )}
              </Space>
            ) : (
              <></>
            )}
            {options.map(({ type, values }) => (
              <ProductVariants
                key={type}
                type={type}
                values={Array.from(values)}
                selectedOptions={selectedOptions}
                setOptions={setOptions}
              />
            ))}
          </Flex>
        </Col>
      </Row>
      <Divider style={{ marginTop: '0.5em', marginBottom: '0em' }} />
      <Row>
        <Col>
          {attributes.variants.length && selectedVariant ? (
            <ProductPrices
              price={selectedVariant.price}
              discount={{
                isDiscount: selectedVariant.isDiscount,
                discount: selectedVariant.discount,
                until: selectedVariant.until,
              }}
            />
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Form
            form={form}
            name="productDetailForm"
            initialValues={{
              ['qty']: 1,
            }}
            onFinish={onFinish}
          >
            <Flex gap={5}>
              <Form.Item
                name="qty"
                rules={[{ required: true }]}
                style={{ width: '100px', margin: 0 }}
              >
                <InputNumber
                  size="large"
                  style={{ width: '100px' }}
                  maxLength={16}
                  min={1}
                  max={
                    attributes.variants.length
                      ? selectedVariant?.stock
                      : attributes.stock
                  }
                  disabled={disabledStock({
                    id: id,
                    stock: attributes.stock,
                  })}
                />
              </Form.Item>
              <Button
                type="primary"
                size="large"
                onClick={form.submit}
                disabled={disabledStock({
                  id: id,
                  stock: attributes.stock,
                })}
              >
                Añadir a carrito
              </Button>
            </Flex>
          </Form>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
