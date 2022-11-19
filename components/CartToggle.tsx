import { useState } from 'react'
import { ShoppingOutlined } from '@ant-design/icons'
import { Badge, Drawer, Button, Row, Col } from 'antd'
import ProductDrawer from './products/ProductDrawer'

export default function CartToggle() {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Badge count={5}>
        <Button icon={<ShoppingOutlined />} onClick={showDrawer} />
      </Badge>
      <Drawer
        title="Carrito de Compra"
        placement="right"
        size="default"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <Row>
          <Col span={24}>
            <div className="drawer-car-products">
              <ProductDrawer />
              <ProductDrawer />
              <ProductDrawer />
            </div>
          </Col>
        </Row>
      </Drawer>
    </>
  )
}
