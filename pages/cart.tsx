import { useState } from 'react'

import { useSelector } from 'react-redux'
import { Alert, Steps } from 'antd'
import {
  CheckCircleOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'

import type { RootState } from '../store'
import CartContent from '../components/cart/CartContent'
import CheckoutContent from '../components/cart/CheckoutContent'
import CompleteContent from '../components/cart/CompleteContext'
import styles from '../styles/Cart.module.scss'

const items = [
  {
    title: 'Carrito de compras',
    icon: <ShoppingCartOutlined />,
    content: <CartContent />,
  },
  {
    title: 'Verificar',
    icon: <EyeOutlined />,
    content: <CheckoutContent />,
  },
  {
    title: 'Orden completada',
    icon: <CheckCircleOutlined />,
    content: <CompleteContent />,
    disabled: true,
  },
]

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart)
  const [current, setCurrent] = useState(0)

  const onChange = (value: number) => {
    setCurrent(value)
  }

  return (
    <>
      {cart.products.length > 0 ? (
        <>
          <Steps items={items} current={current} onChange={onChange} />
          <div className={styles['cart-content']}>{items[current].content}</div>
        </>
      ) : (
        <Alert
          showIcon
          type="warning"
          description={`No hay productos agregados al carrito.`}
        ></Alert>
      )}
    </>
  )
}

export default CartPage
