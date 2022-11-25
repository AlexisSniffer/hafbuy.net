import { Col, Row } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store'
import {
  decrement,
  increment,
  incrementByAmount,
} from '../../store/counterSlice'

const ShopPage = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const filters = useSelector((state: RootState) => state.filters.filters)

  const dispatch = useDispatch()

  return (
    <Row>
      <Col span={6}>Filtro: </Col>
      <Col span={18}>B</Col>
      <Col span={24}>
        <p>Producto: {filters.product}</p>
        <p>Categoria: {filters.category}</p>
        <p>Precio Inicial: {filters.prices.start}</p>
        <p>Precio Final: {filters.prices.final}</p>
      </Col>
      <Col span={24}>
        <div>
          <div>
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <span>{count}</span>
            <button
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
            <button
              aria-label="Decrement value"
              onClick={() => dispatch(incrementByAmount(10))}
            >
              Increment by amount
            </button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default ShopPage
