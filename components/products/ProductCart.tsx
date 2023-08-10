import Image from 'next/image'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, InputNumber, Form, Input } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import type { RootState } from '../../store'
import { editProduct, removeProduct } from '../../store/shoppingCartSlice'
import { ProductCartType } from '../../store/types/ProductType'
import styles from '../../styles/ProductCart.module.scss'
import { money } from '../../utils/formatters'

export default function ProductCart({ product }: ProductCartType) {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    const { qty } = values

    dispatch(
      editProduct({
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          qty: qty,
          price: product.price,
          subtotal: product.price * qty,
          image: product.image,
        },
      })
    )
  }

  return (
    <article className={styles['product-cart']}>
      <Row align={'middle'}>
        <Col span={12}>
          <div className={styles['product-cart-product']}>
            <figure className={styles['product-cart-picture']}>
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.image}
                  alt={`product:${product.slug}`}
                  width={70}
                  height={70}
                  className={styles['product-cart-picture-image']}
                />
              </Link>
              <Button
                className={styles['product-cart-picture-remove']}
                icon={<CloseOutlined rev={undefined} />}
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
          <Form
            form={form}
            name="productCartForm"
            labelCol={{ span: 8 }}
            initialValues={{
              ['qty']: product.qty,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="qty"
              rules={[{ required: true }]}
              style={{ marginBottom: 0 }}
            >
              <InputNumber
                value={product.qty}
                maxLength={16}
                min={1}
                max={20}
                onChange={() => {
                  form.submit()
                }}
              />
            </Form.Item>
          </Form>
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          {money.format(product.subtotal)}
        </Col>
      </Row>
    </article>
  )
}
