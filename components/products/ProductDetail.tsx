import React, { useState, useRef } from 'react'
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
} from 'antd'
import { CarouselRef } from 'antd/es/carousel'

import { addProduct } from '../../store/shoppingCartSlice'
import { ProductType } from './../../store/types/ProductType'
import { MediaType } from './../../store/types/MediaType'
import { money } from '../../utils/formatters'
import styles from '../../styles/ProductDetail.module.scss'
import Social from '../Social'

const ProductDetail = ({ product }: ProductType) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  let carouselRef = useRef<CarouselRef>()

  const onFinish = (values: any) => {
    const { qty } = values

    dispatch(
      addProduct({
        product: {
          name: product.attributes.name,
          slug: product.attributes.slug,
          qty: qty,
          price: product.attributes.price,
          subtotal: product.attributes.price * qty,
          image: product.attributes.images.data[0].attributes.url,
        },
      })
    )

    //TODO: verificar: error de react - form.resetFields()
  }

  return (
    <Row gutter={16}>
      <Col span={12}>
        {/* TODO:
          - seleccionar la foto
          - cambiar a Image next.js
        */}
        <Carousel autoplay draggable pauseOnHover ref={(ref) => carouselRef}>
          {product.attributes.images.data.map((image: MediaType) => {
            return (
              <img
                key={image.attributes.url}
                src={`https://hafbuy-app-ps9eq.ondigitalocean.app${image.attributes.url}`}
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
                    src={`https://hafbuy-app-ps9eq.ondigitalocean.app${image.attributes.url}`}
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

      <Col span={12}>
        <section className={styles['product-detail']}>
          <h1 className={styles['product-detail-title']}>
            {product.attributes.name}
          </h1>

          <Space>
            <Rate disabled style={{ fontSize: '1rem' }}></Rate> (0 Reseñas)
          </Space>

          <p className={styles['product-detail-price']}>
            {money.format(product.attributes.price)}
          </p>

          <p>{product.attributes.description}</p>

          <span className={styles['product-detail-categories']}>
            categorias:{' '}
            {product.attributes.categories.data.length > 0 ? (
              product.attributes.categories.data.map((category: any) => {
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

          <Divider />

          <Form
            form={form}
            name="productDetailForm"
            labelCol={{ span: 8 }}
            initialValues={{
              ['qty']: 1,
            }}
            onFinish={onFinish}
          >
            <Input.Group compact>
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
                />
              </Form.Item>
              <Button type="primary" onClick={form.submit}>
                Añadir a carrito
              </Button>
            </Input.Group>
          </Form>

          <Divider />

          <Social size="small" />

          <p>
            <span>
              <b>Tiempo de envío:</b> 48 horas
            </span>
          </p>
          <p>
            <span>
              <b>Costo de envío:</b> $30.00
            </span>
          </p>
        </section>
      </Col>
    </Row>
  )
}

export default ProductDetail
