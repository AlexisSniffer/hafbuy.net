import { useSelector, useDispatch } from 'react-redux'
import useSWR from 'swr'
import {
  Space,
  Collapse,
  Checkbox,
  Slider,
  Alert,
  InputNumber,
  Skeleton,
} from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

import type { RootState } from '../../store'
import { qsSubcategories } from '../../store/queries/categories'
import { qsMaxPrice } from '../../store/queries/products'
import {
  setPage,
  setPageSize,
  addCategory,
  removeCategory,
  setPrice,
  setQuery,
} from '../../store/searchProductsSlice'

const { Panel } = Collapse
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const FilterCategories = () => {
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.filters)
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/subcategories?${qsSubcategories}`,
    fetcher
  )

  const onFilter = (e: CheckboxChangeEvent) => {
    dispatch(
      e.target.checked
        ? addCategory(e.target.value)
        : removeCategory(e.target.value)
    )
    dispatch(setPage(1))
    dispatch(setPageSize(10))
    dispatch(setQuery())
  }

  if (error) {
    return (
      <Alert
        showIcon
        type="error"
        description="Error: No se pudo obtener la infomación, intentelo mas tarde."
      ></Alert>
    )
  }

  return (
    <>
      {!data ? (
        <Skeleton />
      ) : (
        <Collapse
          defaultActiveKey={['1']}
          expandIconPosition="end"
          onChange={() => {}}
        >
          <Panel header="Categorias" key="1">
            <Space direction="vertical">
              {data.data.map((category: any) => {
                return (
                  <Checkbox
                    value={category.attributes.slug}
                    key={category.attributes.slug}
                    checked={filters.categories.includes(
                      category.attributes.slug
                    )}
                    onChange={onFilter}
                  >
                    {category.attributes.name}
                  </Checkbox>
                )
              })}
            </Space>
          </Panel>
        </Collapse>
      )}
    </>
  )
}

export const FilterPrices = () => {
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.filters)
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsMaxPrice}`,
    fetcher
  )
  const rangePrice = {
    min: 0,
    max: 20000,
  }

  const filterPrices = (prices: [number, number]) => {
    dispatch(setPage(1))
    dispatch(setPageSize(10))
    dispatch(setPrice(prices))
    dispatch(setQuery())
  }

  const onFilter = (prices: any) => {
    filterPrices(prices)
  }

  const onMinPrice = (value: number | string | null) => {
    filterPrices([Number(value), filters.prices[1]])
  }

  const onMaxPrice = (value: number | string | null) => {
    filterPrices([filters.prices[0], Number(value)])
  }

  if (error) {
    return (
      <Alert
        showIcon
        type="error"
        description="Error: No se pudo obtener la infomación, intentelo mas tarde."
      ></Alert>
    )
  }

  return (
    <>
      {!data ? (
        <Skeleton />
      ) : (
        <Collapse
          defaultActiveKey={['1']}
          expandIconPosition="end"
          onChange={() => {}}
        >
          <Panel header="Precio" key="1">
            <Space>
              <InputNumber
                min={rangePrice.min}
                max={rangePrice.max}
                value={filters.prices[0]}
                //formatter={(value) => `$${value}`}
                onChange={onMinPrice}
              />
              <InputNumber
                min={rangePrice.min}
                max={rangePrice.max}
                value={filters.prices[1]}
                //formatter={(value) => `$${value}`}
                onChange={onMaxPrice}
              />
            </Space>
            <Slider
              range
              defaultValue={filters.prices}
              min={0}
              max={20000}
              /* TODO: precio maximo de producto max={data.data[0].attributes.price} */
              onAfterChange={onFilter}
            />
          </Panel>
        </Collapse>
      )}
    </>
  )
}

export const FilterBrand = () => {
  return (
    <Collapse
      defaultActiveKey={['1']}
      expandIconPosition="end"
      onChange={() => {}}
    >
      <Panel header="Marcas" key="1">
        <Space direction="vertical">
          <Checkbox>Nike</Checkbox>
          <Checkbox>Adidas</Checkbox>
          <Checkbox>Converse</Checkbox>
        </Space>
      </Panel>
    </Collapse>
  )
}
