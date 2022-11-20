import { Form, Input } from 'antd'
const { Search } = Input

const SearchForm = () => {
  return (
    <Form name="searchForm" labelCol={{ span: 8 }} className="search-form">
      <Form.Item name="search">
        <Search size="large" placeholder="Buscar..." enterButton />
      </Form.Item>
    </Form>
  )
}

export default SearchForm
