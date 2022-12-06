import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Modal } from 'antd'
import Link from 'next/link'

import ProductDetail from './ProductDetail'
import { addProduct, removeProduct } from '../../store/shoppingCartSlice'
import { ProductType } from './../../store/types/ProductType'

export default function ProductDefault({ product }: ProductType) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
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
    <>
      <Card
        className="product-default"
        cover={
          <picture>
            <img
              src={`https://hafbuy-app-ps9eq.ondigitalocean.app${product.attributes.images.data[0].attributes.url}`}
              alt={''}
              width={'100%'}
              height={'100%'}
            />

            <Button type="primary" size="large" onClick={showModal}>
              vista rápida
            </Button>
          </picture>
        }
      >
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
        <h3 className="product-title">
          <Link href={`/product/${product.attributes.slug}`}>
            {product.attributes.name}
          </Link>
        </h3>
        <span className="product-price">
          ${product.attributes.price ? product.attributes.price : '0.00'}
        </span>

        <Button onClick={handleAdd}>Añadir</Button>
      </Card>

      <Modal
        width={'60%'}
        centered={true}
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ProductDetail product={product} />
      </Modal>
    </>
  )
}
