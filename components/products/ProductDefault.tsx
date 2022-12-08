import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Card, Modal, Tooltip } from 'antd'
import Link from 'next/link'

import ProductDetail from './ProductDetail'
import { addProduct, removeProduct } from '../../store/shoppingCartSlice'
import { ProductType } from './../../store/types/ProductType'
import styles from '../../styles/ProductDefault.module.scss'
import { ShoppingCartOutlined } from '@ant-design/icons'
import Image from 'next/image'

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
    <Tooltip title={product.attributes.name}>
      <Card
        className={styles['product-default']}
        cover={
          <picture className={styles['product-default-cover']}>
            <img
              src={`https://hafbuy-app-ps9eq.ondigitalocean.app${product.attributes.images.data[0].attributes.url}`}
              alt={product.attributes.images.data[0].attributes.alternativeText}
              width={'100%'}
              height={'100%'}
            />

            <Button
              type="primary"
              shape="circle"
              icon={<ShoppingCartOutlined />}
              onClick={handleAdd}
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

        <h3 className={styles['product-default-title']}>
          <Link href={`/product/${product.attributes.slug}`}>
            {product.attributes.name}
          </Link>
        </h3>

        <span className={styles['product-default-price']}>
          {product.attributes.price ? product.attributes.price : '0.00'}
        </span>

        <Modal
          width={'60%'}
          centered={true}
          footer={null}
          open={isModalOpen}
          onOk={showModal}
          onCancel={showModal}
        >
          <ProductDetail product={product} />
        </Modal>
      </Card>
    </Tooltip>
  )
}
