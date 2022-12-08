import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'
import { Form, Input, Select } from 'antd'

import { qsSearchCategoriesRoot } from '../../store/queries/categories'
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
  let categoryOptions: any = [{ value: 'all', label: 'Todos' }]

  data.data.forEach((category: any) => {
    categoryOptions.push({
      value: category.attributes.slug,
      label: category.attributes.name,
    })
  })

  return (
    <Form.Item name="category" noStyle initialValue="all">
      <Select options={categoryOptions} />
    </Form.Item>
  )
}

const SearchForm = () => {
  const { data, error } = useSWR(
    `https://hafbuy-app-ps9eq.ondigitalocean.app/api/categories?${qsSearchCategoriesRoot}`,
    fetcher
  )

  const dispatch = useDispatch()
  const router = useRouter()
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    const { filter, category } = values

    dispatch(setPage(1))
    dispatch(setPageSize(10))
    dispatch(setFilter(filter))
    dispatch(clearCategories())
    dispatch(setPrice([0, 500]))
    dispatch(addCategory(category))
    dispatch(setQuery())

    router.push('/shop')
  }

  return (
    <Form
      form={form}
      name="searchForm"
      labelCol={{ span: 8 }}
      className={styles['search-form']}
      onFinish={onFinish}
    >
      <Form.Item name="filter" className={styles['search-form-item']}>
        <Search
          size="large"
          placeholder="Buscar..."
          enterButton
          addonBefore={data ? categorySelect(data) : null}
          onSearch={form.submit}
        />
      </Form.Item>
    </Form>
  )
}

export default SearchForm
