import { useState } from 'react'
import { Button, Card, Modal } from 'antd'
import Link from 'next/link'
import ProductDetail from './ProductDetail'

import { ProductType } from './../../store/types/ProductType'

export default function ProductDefault({ product }: ProductType) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  console.log(product)

  return (
    <>
      <Card
        className="product-default"
        cover={
          <picture>
            <img
              src={
                product.attributes.images.data != null &&
                product.attributes.images.data.length > 0
                  ? `https://hafbuy-app-ps9eq.ondigitalocean.app${product.attributes.images.data[0].attributes.url}`
                  : '/no-product.png'
              }
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
      </Card>

      <Modal width={'60%'} centered={true} open={isModalOpen} footer={null}>
        <ProductDetail product={product} />
      </Modal>
    </>
  )
}
