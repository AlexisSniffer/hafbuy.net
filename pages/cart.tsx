import { useSelector, useDispatch } from 'react-redux'
import { Steps } from 'antd'
import {
  CheckCircleOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'

import type { RootState } from '../store'
import { setStep } from '../store/shoppingCartSlice'
import CartContent from '../components/cart/CartContent'
import CheckoutContent from '../components/cart/CheckoutContent'
import CompleteContent from '../components/cart/CompleteContext'
import styles from '../styles/Cart.module.scss'

const items = [
  {
    title: 'Carrito',
    icon: <ShoppingCartOutlined />,
    content: <CartContent />,
  },
  {
    title: 'Verificar',
    icon: <EyeOutlined />,
    content: <CheckoutContent />,
  },
  {
    title: 'Finalizar',
    icon: <CheckCircleOutlined />,
    content: <CompleteContent />,
    disabled: true,
  },
]

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  const onChange = (value: number) => {
    dispatch(setStep(value))
  }

  return (
    <>
      <Steps items={items} current={cart.step} onChange={onChange} />
      <div className={styles['cart-content']}>{items[cart.step].content}</div>
    </>
  )
}

export default CartPage
