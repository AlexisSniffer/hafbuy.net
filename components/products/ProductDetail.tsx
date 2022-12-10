import React, { useState } from 'react'
import { Button, Carousel, Col, Divider, Input, InputNumber, Row } from 'antd'

import { ProductType } from './../../store/types/ProductType'
import { MediaType } from './../../store/types/MediaType'
import Image from 'next/image'
import { money } from '../../utils/formatters'

const carouselRef = React.createRef()

const ProductDetail = ({ product }: ProductType) => {
  const [selectImage, setSelectImage] = useState(
    product.attributes.images.data[0].attributes.url
  )

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Carousel>
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
          <br />
          <Row gutter={[16, 16]}>
            {product.attributes.images.data.map((image: MediaType) => {
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
            })}
          </Row>
        </Col>
        <Col span={12}>
          <section className="product-detail product-detail-info">
            <h1 className="product-detail-info-title">
              {product.attributes.name}
            </h1>

            <span className="product-detail-info-price">
              {money.format(product.attributes.price)}
            </span>

            <p className="product-detail-info-description">
              {product.attributes.description}
            </p>

            <span className="category-list">
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

            <Input.Group compact>
              <InputNumber
                style={{ width: '100px' }}
                defaultValue={1}
                maxLength={16}
                min={1}
                max={20}
              />
              <Button type="primary">AÑADIR A CARRITO</Button>
            </Input.Group>

            <Divider />

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
    </>
  )
}

export default ProductDetail
