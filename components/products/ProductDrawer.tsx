import Image from 'next/image'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import type { RootState } from '../../store'
import { addProduct, removeProduct } from '../../store/shoppingCartSlice'
import { ProductCartType } from '../../store/types/ProductType'

export default function ProductDrawer({ product }: ProductCartType) {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="product">
      <div className="product-details">
        <h3 className="product-title">
          <Link href="/shop/product">{product.name}</Link>
        </h3>
        <span className="product-info">
          <span className="product-qty">1</span>× ${product.price}
        </span>
      </div>
      <figure className="product-image-container">
        <a href="#" className="">
          <Image
            src={`https://hafbuy-app-ps9eq.ondigitalocean.app${product.image}`}
            alt="logo"
            width={60}
            height={60}
            className="image"
          />
        </a>
        <Button
          className="btn-remove"
          icon={<CloseOutlined />}
          shape="circle"
          size="small"
          onClick={(event) => onRemove(1)} /* TODO: remover registros */
        />
      </figure>
    </div>
  )
}

// TODO: añadir carrito de compra a store y eliminar registros
function onRemove(id: number) {
  console.log('Click Id: ' + id)
}
