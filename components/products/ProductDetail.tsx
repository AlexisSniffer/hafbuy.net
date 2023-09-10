import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import {
  Button,
  Carousel,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Rate,
  Row,
  Space,
  Typography,
} from 'antd'
import { CarouselRef } from 'antd/es/carousel'

import { addProduct } from '../../store/shoppingCartSlice'
import { ProductType } from './../../store/types/ProductType'
import { MediaType } from './../../store/types/MediaType'
import { money } from '../../utils/formatters'
import styles from '../../styles/ProductDetail.module.scss'
import Social from '../Social'
import ProductVariants from './ProductVariants'
import { valMinMax } from '../../utils/valMinMax'

const { Title } = Typography

const ProductDetail = ({ product }: ProductType) => {
  const allVariantOptions = product.attributes.variants?.map((variant) => {
    const allOptions: any = {}

    variant.variant.map((item: any) => {
      allOptions[item.type] = item.value.toLowerCase().trim()
    })

    return {
      id: variant.id,
      price: variant.price,
      discount: variant.discount,
      isDiscount: variant.isDiscount,
      until: variant.until,
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
  const defaultValues: any = {}
  for (const [key, value] of optionsMap) {
    defaultValues[key] = value.values().next().value

    options.push({
      type: key,
      values: value,
    })
  }

  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [selectedVariant, setSelectedVariant] = useState<any | null>(
    allVariantOptions[0]
  )
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)

  const setOptions = (type: string, value: string) => {
    setSelectedOptions((prevState: any) => {
      return { ...prevState, [type]: value }
    })

    const selection = {
      ...selectedOptions,
      [type]: value,
    }

    setSelectedVariant(null)
    allVariantOptions.map((item) => {
      if (JSON.stringify(item.variant) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }

  useEffect(() => {}, [])

  const onFinish = (values: any) => {
    const { qty } = values

    let price: number
    let name: string
    let slug: string
    let detail: string = ''

    if (product.attributes.variants.length > 0) {
      const nameVariant = Object.entries(selectedVariant.variant)
        .map(([key, value]) => `${key}: ${value}`)
        .toString()

      name = `${product.attributes.name} [${nameVariant}]`
      slug = `${product.attributes.slug}-[${nameVariant}]`
      price = selectedVariant.isDiscount
        ? selectedVariant.discount
        : selectedVariant.price
      detail = `[${nameVariant}]`
    } else {
      name = product.attributes.name
      slug = product.attributes.slug
      price = product.attributes.isDiscount
        ? product.attributes.discount
        : product.attributes.price
    }

    dispatch(
      addProduct({
        product: {
          id: product.id,
          name: name,
          slug: slug,
          qty: qty,
          price: price,
          subtotal: price * qty,
          image: product.attributes.images.data[0].attributes.url,
          detail: detail,
        },
      })
    )
  }

  const carouselRef = useRef<CarouselRef>(null)
  const goTo = (slide: any) => {
    carouselRef.current?.goTo(slide, false)
  }

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12}>
        <Carousel ref={carouselRef} autoplay draggable pauseOnHover dots>
          {product.attributes.images.data.map((image: MediaType) => {
            return (
              <img
                key={image.attributes.url}
                src={image.attributes.url}
                alt={image.attributes.alternativeText}
                width={'100%'}
                height={'auto'}
              />
            )
          })}
        </Carousel>
        <Row gutter={[8, 8]}>
          {product.attributes.images.data.map(
            (image: MediaType, index: number) => {
              return (
                <Col span={6} key={image.attributes.url}>
                  <img
                    onClick={() => goTo(index)}
                    src={image.attributes.url}
                    alt={image.attributes.alternativeText}
                    width={'100%'}
                    height={'auto'}
                  />
                </Col>
              )
            }
          )}
        </Row>
      </Col>

      <Col xs={24} md={12}>
        <section className={styles['product-detail']}>
          <Space direction="vertical">
            <Link href={`/products/${product.attributes.slug}`}>
              <Title level={1} className={styles['product-detail-title']}>
                {product.attributes.name}
              </Title>
            </Link>

            <Space>
              <Rate
                value={product.attributes.ratings}
                disabled
                style={{ fontSize: '1rem' }}
              ></Rate>{' '}
              (0 Reseñas)
            </Space>
            <p className={styles['product-detail-price']}>
              {product.attributes.variants.length > 0 ? (
                valMinMax(
                  product.attributes.variants.map((variant) => {
                    let price: number
                    price = variant.isDiscount
                      ? variant.discount
                      : variant.price
                    return price
                  })
                )
              ) : (
                <>
                  {product.attributes.isDiscount ? (
                    <Space>
                      <span>{money.format(product.attributes.discount)}</span>
                      <span
                        className={`${styles['product-detail-price']} ${styles['is-discount']}`}
                      >
                        {money.format(product.attributes.price)}
                      </span>
                    </Space>
                  ) : (
                    <span>{money.format(product.attributes.price)}</span>
                  )}
                </>
              )}
            </p>
          </Space>

          <p>{product.attributes.description}</p>

          <p>
            <span className={styles['product-detail-categories']}>
              categorias:{' '}
              {product.attributes.subcategories.data.length > 0 ? (
                product.attributes.subcategories.data.map((category: any) => {
                  return (
                    <a
                      key={category.attributes.slug}
                      onClick={(e) => e.preventDefault()}
                    >{`${category.attributes.name}`}</a>
                  )
                })
              ) : (
                <a>sin categoria</a>
              )}
            </span>
          </p>

          <p>
            {`VENDEDOR: ${product.attributes.createdBy.firstname} ${product.attributes.createdBy.lastname}`}
          </p>

          <p>{`TIEMPO DE ENTREGA: ${product.attributes.deliveryTime ?? ''}`}</p>

          {product.attributes.variants.length > 0 ? (
            <Space direction="vertical">
              {options.map(({ type, values }) => (
                <ProductVariants
                  key={type}
                  type={type}
                  values={Array.from(values)}
                  selectedOptions={selectedOptions}
                  setOptions={setOptions}
                />
              ))}
            </Space>
          ) : (
            <></>
          )}

          <Divider />

          <Space direction="vertical">
            {product.attributes.variants.length > 0 &&
            selectedVariant != null ? (
              <div className={styles['product-detail-price']}>
                {selectedVariant.isDiscount ? (
                  <Space>
                    <span>{money.format(selectedVariant.discount)}</span>
                    <span
                      className={`${styles['product-detail-price']} ${styles['is-discount']}`}
                    >
                      {money.format(selectedVariant.price)}
                    </span>
                  </Space>
                ) : (
                  <span>{money.format(selectedVariant.price)}</span>
                )}
              </div>
            ) : null}

            <Form
              form={form}
              name="productDetailForm"
              labelCol={{ span: 8 }}
              initialValues={{
                ['qty']: 1,
              }}
              onFinish={onFinish}
            >
              <Space.Compact>
                <Form.Item
                  name="qty"
                  rules={[{ required: true }]}
                  style={{ width: '100px', margin: 0 }}
                >
                  <InputNumber
                    style={{ width: '100px' }}
                    maxLength={16}
                    min={1}
                    max={20}
                    disabled={
                      product.attributes.variants.length > 0
                        ? selectedVariant == null
                        : false
                    }
                  />
                </Form.Item>
                <Button
                  type="primary"
                  onClick={form.submit}
                  disabled={
                    product.attributes.variants.length > 0
                      ? selectedVariant == null
                      : false
                  }
                >
                  Añadir a carrito
                </Button>
              </Space.Compact>
            </Form>
          </Space>

          <Divider />

          <Social size="small" />
        </section>
      </Col>
    </Row>
  )
}

export default ProductDetail
