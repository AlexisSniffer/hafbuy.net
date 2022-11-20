import { SearchOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select } from 'antd'
const { Search } = Input
const { Option } = Select

const selectAfter = (
  <Select defaultValue="all" className="select-after">
    <Option value="all">Todos</Option>
    <Option value="fashion">Moda</Option>
    <Option value="electronic">Electrónica</Option>
    <Option value="videogames">Videojuegos</Option>
  </Select>
)

const SearchForm = () => {
  return (
    <Form name="searchForm" labelCol={{ span: 8 }} className="search-form">
      <Form.Item name="search">
        <Search
          size="large"
          placeholder="Buscar..."
          enterButton
          addonBefore={selectAfter}
        />
      </Form.Item>
    </Form>
  )
}

export default SearchForm
