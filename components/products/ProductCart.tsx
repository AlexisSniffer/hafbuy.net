import Image from 'next/image'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, InputNumber } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import type { RootState } from '../../store'
import { removeProduct } from '../../store/shoppingCartSlice'
import { ProductCartType } from '../../store/types/ProductType'
import styles from '../../styles/ProductCart.module.scss'
import { money } from '../../utils/formatters'

export default function ProductCart({ product }: ProductCartType) {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  return (
    <article className={styles['product-cart']}>
      <Row>
        <Col span={12}>
          <div className={styles['product-cart-product']}>
            <figure className={styles['product-cart-picture']}>
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={`https://hafbuy-app-ps9eq.ondigitalocean.app${product.image}`}
                  alt={`product:${product.slug}`}
                  width={70}
                  height={70}
                  className={styles['product-cart-picture-image']}
                />
              </Link>
              <Button
                className={styles['product-cart-picture-remove']}
                icon={<CloseOutlined />}
                shape="circle"
                size="small"
                onClick={(event) => dispatch(removeProduct(product.slug))}
              />
            </figure>
            <h3 className={styles['product-cart-title']}>
              <Link href="/shop/product">{product.name}</Link>
            </h3>
          </div>
        </Col>
        <Col span={4}>{money.format(product.price)}</Col>
        <Col span={4}>
          <InputNumber min={1} max={20} value={product.qty} />
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          {money.format(product.price * product.qty)}
        </Col>
      </Row>
    </article>
  )
}
