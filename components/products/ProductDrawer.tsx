import Image from 'next/image'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import type { RootState } from '../../store'
import { removeProduct } from '../../store/shoppingCartSlice'
import { ProductCartType } from '../../store/types/ProductType'
import styles from '../../styles/ProductDrawer.module.scss'

export default function ProductDrawer({ product }: ProductCartType) {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  return (
    <article className={styles['product-drawer']}>
      <div className={styles['product-drawer-info']}>
        <h3 className={styles['product-drawer-title']}>
          <Link href="/shop/product">{product.name}</Link>
        </h3>
        <span
          className={styles['product-drawer-price']}
        >{`${product.qty} x $${product.price}`}</span>
      </div>
      <figure className={styles['product-drawer-picture']}>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={`https://hafbuy-app-ps9eq.ondigitalocean.app${product.image}`}
            alt={`product:${product.slug}`}
            width={70}
            height={70}
            className={styles['product-drawer-picture-image']}
          />
        </Link>
        <Button
          className={styles['product-drawer-picture-remove']}
          icon={<CloseOutlined />}
          shape="circle"
          size="small"
          onClick={(event) => dispatch(removeProduct(product.slug))}
        />
      </figure>
    </article>
  )
}

// TODO: añadir carrito de compra a store y eliminar registros
function onRemove(id: number) {
  console.log('Click Id: ' + id)
}
