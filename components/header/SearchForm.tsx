import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Form, Input, Select } from 'antd'
import { setFilter, setCategory, setQ } from '../../store/searchSlice'
import { qsSearchProducts } from './../../store/queries/products'

const { Search } = Input

const categoryOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'fashion', label: 'Moda' },
  { value: 'electronic', label: 'Electrónica' },
]

const categorySelect = (
  <Form.Item name="category" noStyle initialValue="all">
    <Select options={categoryOptions} />
  </Form.Item>
)

const SearchForm = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const router = useRouter()

  const onFinish = (values: any) => {
    const { filter, category } = values

    dispatch(setFilter(filter))
    dispatch(setCategory(category))
    dispatch(setQ(qsSearchProducts(1, 10, filter)))

    router.push('/shop')
  }

  return (
    <Form
      form={form}
      name="searchForm"
      labelCol={{ span: 8 }}
      className="search-form"
      onFinish={onFinish}
    >
      <Form.Item name="filter">
        <Search
          size="large"
          placeholder="Buscar..."
          enterButton
          addonBefore={categorySelect}
          onSearch={form.submit}
        />
      </Form.Item>
    </Form>
  )
}

export default SearchForm
