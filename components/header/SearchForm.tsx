import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'
import { Form, Input, Select, Spin } from 'antd'

import { qsCategoriesRoot } from '../../store/queries/categories'
import { qsMaxPrice } from '../../store/queries/products'
import {
  setPage,
  setPageSize,
  setFilter,
  clearCategories,
  addCategory,
  setPrice,
  setQuery,
} from '../../store/searchProductsSlice'
import styles from '../../styles/SearchForm.module.scss'

const { Search } = Input
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const categorySelect = (data: any) => {
  let categoryOptions: any = [{ value: '', label: 'Todos' }]

  data.data.forEach((category: any) => {
    categoryOptions.push({
      value: category.attributes.slug,
      label: category.attributes.name,
    })
  })

  return (
    <Form.Item name="category" noStyle initialValue="">
      <Select options={categoryOptions} />
    </Form.Item>
  )
}

const SearchForm = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategoriesRoot}`,
    fetcher
  )

  const maxPrice = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsMaxPrice}`,
    fetcher
  )

  const dispatch = useDispatch()
  const router = useRouter()
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    const { filter, category } = values

    dispatch(clearCategories())

    if (category !== '') {
      dispatch(addCategory(category))
    }

    if (filter !== undefined) {
      dispatch(setFilter(filter))
    }

    dispatch(setPage(1))
    dispatch(setPageSize(10))
    /* TODO: precio maximo de producto
    dispatch(setPrice([0, maxPrice.data.data[0].attributes.price])) */
    dispatch(setPrice([0, 20000]))
    dispatch(setQuery())

    router.push('/shop')
  }

  return (
    <Form
      form={form}
      name="searchForm"
      className={styles['search-form']}
      onFinish={onFinish}
      initialValues={{
        ['filter']: '',
      }}
    >
      <Form.Item name="filter" className={styles['search-form-item']}>
        <Search
          enterButton
          size="large"
          placeholder="Buscar..."
          addonBefore={data ? categorySelect(data) : <Spin />}
          onSearch={form.submit}
        />
      </Form.Item>
    </Form>
  )
}

export default SearchForm
