import useCartStore from '@/store/cartStore'
import styles2 from '@/styles/cart.module.scss'
import styles from '@/styles/product.module.scss'
import { ProductCart } from '@/types/product'
import { money } from '@/utils/formatters'
import {
  CloseOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Input,
  Result,
  Row,
  Space,
  Table,
  ThemeConfig,
  Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
    Table: {
      headerBg: '',
      headerSplitColor: '',
    },
  },
}

export default function ShoppingCart() {
  const cartStore = useCartStore((state) => state.cart)
  const subtotalStore = useCartStore((state) => state.subtotal)
  const { edit, remove } = useCartStore()
  const { setStep } = useCartStore()

  if (!cartStore.length) {
    return (
      <ConfigProvider theme={theme}>
        <Result
          icon={<ShoppingCartOutlined />}
          subTitle="No se agregaron productos al carrito "
          extra={
            <Button type="primary" size="large">
              <Link href={'/shop'}>IR A COMPRAR</Link>
            </Button>
          }
        />
      </ConfigProvider>
    )
  }

  const handleDecrement = (product: ProductCart) => {
    product.qty = Math.max(product.qty - 1, 1)
    edit(product)
  }

  const handleIncrement = (product: ProductCart) => {
    product.qty = Math.min(product.qty + 1, 100)
    edit(product)
  }

  const Variation = ({ value, className }: any) => (
    <span style={{ backgroundColor: value }} className={styles['color']}>
      {className == 'color' ? '' : value}
    </span>
  )

  const columns: ColumnsType<ProductCart> = [
    {
      responsive: ['md'],
      render: (product: ProductCart) => (
        <div className={styles['remove']}>
          <Image
            src={product.attributes.images.data[0].attributes.url}
            alt={
              product.attributes.images.data[0].attributes.alternativeText ??
              product.attributes.slug
            }
            width={80}
            height={80}
          />
          <Button
            shape="circle"
            size="small"
            icon={<CloseOutlined />}
            onClick={() => remove(product)}
          ></Button>
        </div>
      ),
    },
    {
      title: <Text className={styles2['title-column']}>producto</Text>,
      key: 'name',
      responsive: ['md'],
      render: (product: ProductCart) => (
        <Link href={`/products/${product.attributes.slug}`}>
          <Text className={styles['name']}>
            {product.attributes.name}
            {product.variant ? (
              <Text className={styles['variant']}>
                {Object.entries(product.variant.variant).map(
                  ([key, value], index, array) => (
                    <React.Fragment key={key}>
                      <span>{key}</span> :{' '}
                      <Variation
                        value={value}
                        className={key === 'color' ? 'color' : ''}
                      />
                      {index < array.length - 1 && ', '}
                    </React.Fragment>
                  ),
                )}
              </Text>
            ) : (
              <></>
            )}
          </Text>
        </Link>
      ),
    },
    {
      title: <Text className={styles2['title-column']}>precio</Text>,
      key: 'price',
      responsive: ['md'],
      render: (product: ProductCart) => (
        <Text className={styles['price']}>{money.format(product.price)}</Text>
      ),
    },
    {
      title: <Text className={styles2['title-column']}>cantidad</Text>,
      key: 'qty',
      responsive: ['md'],
      render: (product: ProductCart) => (
        <Space.Compact>
          <Button
            size="large"
            htmlType="submit"
            icon={<MinusOutlined />}
            onClick={() => handleDecrement(product)}
          />
          <Input
            size="large"
            min={1}
            max={100}
            value={product.qty}
            className={styles['qty']}
          />
          <Button
            size="large"
            htmlType="submit"
            icon={<PlusOutlined />}
            onClick={() => handleIncrement(product)}
          />
        </Space.Compact>
      ),
    },
    {
      title: <Text className={styles2['title-column']}>subtotal</Text>,
      key: 'subtotal',
      responsive: ['md'],
      render: (product: ProductCart) => (
        <Text className={styles['subtotal']}>
          {money.format(product.price * product.qty)}
        </Text>
      ),
    },
  ]

  const columns2: ColumnsType<ProductCart> = [
    {
      render: (product: ProductCart) => (
        <Row gutter={[5, 5]}>
          <Col span={24}>
            <div className={styles['remove']}>
              <Image
                src={product.attributes.images.data[0].attributes.url}
                alt={
                  product.attributes.images.data[0].attributes
                    .alternativeText ?? product.attributes.slug
                }
                width={80}
                height={80}
              />
              <Button
                shape="circle"
                size="small"
                icon={<CloseOutlined />}
                onClick={() => remove(product)}
              ></Button>
            </div>
          </Col>
          <Col span={24}>
            <Link href={`/products/${product.attributes.slug}`}>
              <Text className={styles['name']}>
                {product.attributes.name}
                {product.variant ? (
                  <Text className={styles['variant']}>
                    {Object.entries(product.variant.variant).map(
                      ([key, value], index, array) => (
                        <React.Fragment key={key}>
                          <span>{key}</span> :{' '}
                          <Variation
                            value={value}
                            className={key === 'color' ? 'color' : ''}
                          />
                          {index < array.length - 1 && ', '}
                        </React.Fragment>
                      ),
                    )}
                  </Text>
                ) : (
                  <></>
                )}
              </Text>
            </Link>
          </Col>
          <Col span={24}>
            <Text className={styles['price']}>
              {money.format(product.price)}
            </Text>
          </Col>
          <Col span={24}>
            <Space.Compact>
              <Button
                size="large"
                htmlType="submit"
                icon={<MinusOutlined />}
                onClick={() => handleDecrement(product)}
              />
              <Input
                size="large"
                min={1}
                max={100}
                value={product.qty}
                className={styles['qty']}
              />
              <Button
                size="large"
                htmlType="submit"
                icon={<PlusOutlined />}
                onClick={() => handleIncrement(product)}
              />
            </Space.Compact>
          </Col>
          <Col span={24}>
            <Text className={styles['subtotal']}>
              {money.format(product.price * product.qty)}
            </Text>
          </Col>
        </Row>
      ),
    },
  ]

  return (
    <ConfigProvider theme={theme}>
      <Row gutter={16}>
        <Col xs={0} md={24} lg={16}>
          <Table
            dataSource={cartStore}
            columns={columns}
            className={`${styles['product']} ${styles['product-cart-shopping']}`}
            pagination={false}
          />
        </Col>
        <Col xs={24} md={0}>
          <Table
            dataSource={cartStore}
            columns={columns2}
            className={`${styles['product']} ${styles['product-cart-shopping']}`}
            pagination={false}
          />
        </Col>
        <Col xs={24} md={24} lg={8}>
          <Card title="TOTALES DEL CARRITO" className={styles2['totals']}>
            <Flex justify="space-between" align="center">
              <Text className={styles2['title']}>Subtotal</Text>
              <Text className={styles2['price']}>
                {money.format(subtotalStore)}
              </Text>
            </Flex>
            <Divider className={styles2['divider']} />
            <Flex justify="space-between" align="center">
              <Text className={styles2['title']}>ITBMS</Text>
              <Text className={styles2['price']}>
                {money.format(subtotalStore * 0.07)}
              </Text>
            </Flex>
            <Divider className={styles2['divider']} />
            <Flex justify="space-between" align="center">
              <Text className={styles2['title']}>Total</Text>
              <Text className={`${styles2['price']} ${styles2['total']}`}>
                {money.format(subtotalStore + subtotalStore * 0.07)}
              </Text>
            </Flex>
            <Button
              type="primary"
              size="large"
              block
              className={styles2['btn']}
              onClick={() => {
                setStep(1)
              }}
            >
              Pasar por la caja
            </Button>
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
