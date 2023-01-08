import { useSelector } from 'react-redux'
import { Result, Button } from 'antd'

import type { RootState } from '../../store'

const CompleteContent = () => {
  const cart = useSelector((state: RootState) => state.cart)

  return (
    <>
      <Result
        status="success"
        title="¡Gracias por su compra! "
        extra={[
          <Button key={''} type="primary">
            Número de orden: {cart.order}
          </Button>,
        ]}
      />
    </>
  )
}

export default CompleteContent
