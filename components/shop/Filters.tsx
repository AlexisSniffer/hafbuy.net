import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useSWR from 'swr'
import { Space, Collapse, Checkbox, Slider, Alert, Spin } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

import type { RootState } from '../../store'
import { qsSearchCategoriesRoot } from '../../store/queries/categories'
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
    `https://hafbuy-app-ps9eq.ondigitalocean.app/api/categories?${qsSearchCategoriesRoot}`,
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
        <Spin size="large" />
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

  const onFilter = (prices: any) => {
    dispatch(setPage(1))
    dispatch(setPageSize(10))
    dispatch(setPrice(prices))
    dispatch(setQuery())
  }

  return (
    <Collapse
      defaultActiveKey={['1']}
      expandIconPosition="end"
      onChange={() => {}}
    >
      <Panel header="Precio" key="1">
        <span>{`$${filters.prices[0]} - $${filters.prices[1]}`}</span>
        <Slider
          range
          defaultValue={filters.prices}
          value={filters.prices}
          min={0}
          max={500}
          onAfterChange={onFilter}
        />
      </Panel>
    </Collapse>
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
