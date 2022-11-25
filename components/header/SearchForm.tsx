import { Form, Input, Select } from 'antd'
import { useDispatch } from 'react-redux'
import { setFilters } from '../../store/searchSlice'

const { Search } = Input

const categoryOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'fashion', label: 'Moda' },
  { value: 'electronic', label: 'Electrónica' },
]

const categorySelect = (
  <Form.Item name={'category'} noStyle initialValue="all">
    <Select options={categoryOptions} />
  </Form.Item>
)

const SearchForm = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    const { product, category } = values

    dispatch(
      setFilters({
        filters: {
          product: product,
          category: category,
          prices: {
            start: 0.0,
            final: 0.0,
          },
        },
      })
    )
  }

  return (
    <Form
      form={form}
      name="searchForm"
      labelCol={{ span: 8 }}
      className="search-form"
      onFinish={onFinish}
    >
      <Form.Item name="product">
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
