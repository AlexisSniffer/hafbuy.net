import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Card, Modal, Rate, Space } from 'antd'
import Link from 'next/link'

import ProductDetail from './ProductDetail'
import { addProduct } from '../../store/shoppingCartSlice'
import { ProductType } from './../../store/types/ProductType'
import styles from '../../styles/ProductDefault.module.scss'
import { ArrowRightOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { money } from '../../utils/formatters'
import { valMinMax } from '../../utils/valMinMax'

export default function ProductDefault({ product }: ProductType) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()

  const showModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleAdd = () => {
    dispatch(
      addProduct({
        product: {
          id: product.id,
          name: product.attributes.name,
          slug: product.attributes.slug,
          qty: 1,
          price: product.attributes.price,
          subtotal: product.attributes.price * 1,
          image: product.attributes.images.data[0].attributes.url,
        },
      })
    )
  }

  return (
    <Card
      className={styles['product-default']}
      cover={
        <picture className={styles['product-default-cover']}>
          <img
            src={product.attributes.images.data[0].attributes.url}
            alt={product.attributes.images.data[0].attributes.alternativeText}
            width={'100%'}
            height={'100%'}
          />

          <Button
            type="primary"
            shape="circle"
            icon={
              product.attributes.variants.length > 0 ? (
                <ArrowRightOutlined />
              ) : (
                <ShoppingCartOutlined />
              )
            }
            onClick={
              product.attributes.variants.length > 0 ? showModal : handleAdd
            }
            className={styles['product-default-cover-add']}
          />

          <Button
            type="primary"
            onClick={showModal}
            className={styles['product-default-cover-view']}
          >
            vista rápida
          </Button>
        </picture>
      }
    >
      <span className={styles['product-default-categories']}>
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

      <h3 className={styles['product-default-title']}>
        <Link href={`/product/${product.attributes.slug}`}>
          {product.attributes.name}
        </Link>
      </h3>

      <Rate disabled style={{ fontSize: '1rem' }}></Rate>

      <span className={styles['product-default-price']}>
        {product.attributes.variants.length > 0 ? (
          valMinMax(
            product.attributes.variants.map((variant) => {
              let price: number
              price = variant.isDiscount ? variant.discount : variant.price
              return price
            })
          )
        ) : (
          <>
            {product.attributes.isDiscount ? (
              <Space>
                <span>{money.format(product.attributes.discount)}</span>
                <span
                  className={`${styles['product-default-price']} ${styles['is-discount']}`}
                >
                  {money.format(product.attributes.price)}
                </span>
              </Space>
            ) : (
              <span>{money.format(product.attributes.price)}</span>
            )}
          </>
        )}
      </span>

      <Modal
        width={'70%'}
        centered={true}
        footer={null}
        open={isModalOpen}
        onOk={showModal}
        onCancel={showModal}
      >
        <ProductDetail product={product} />
      </Modal>
    </Card>
  )
}
