import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductDrawer() {
  return (
    <div className="product">
      <div className="product-details">
        <h3 className="product-title">
          <Link href="/shop/product">Drone Pro One</Link>
        </h3>
        <span className="product-info">
          <span className="product-qty">1</span>× $299.00
        </span>
      </div>
      <figure className="product-image-container">
        <a href="#" className="">
          <Image
            src="https://d-themes.com/vue/porto/server/uploads/shop36_product1_1_150x150_6f1a148efa.jpg"
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
          onClick={(event) => onRemove(1)}
        />
      </figure>
    </div>
  )
}

function onRemove(id: number) {
  console.log('Click Id: ' + id)
}
