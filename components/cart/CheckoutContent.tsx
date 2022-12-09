import { Button } from 'antd'

const CheckoutContent = () => {
  const onComplete = () => {
    console.log('Complete')
  }

  return (
    <>
      <h1>Checkout Content</h1>
      <Button type="primary" onClick={onComplete}>
        Completar
      </Button>
    </>
  )
}

export default CheckoutContent
