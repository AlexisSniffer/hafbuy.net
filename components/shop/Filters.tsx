import { Space, Collapse, Checkbox, Slider } from 'antd'

const { Panel } = Collapse

export const FilterCategories = () => {
  return (
    <Collapse
      defaultActiveKey={['1']}
      expandIconPosition="end"
      onChange={() => {}}
    >
      <Panel header="Categorias" key="1">
        <Space direction="vertical">
          <Checkbox>Moda</Checkbox>
          <Checkbox>Electrónica</Checkbox>
          <Checkbox>Videojuegos</Checkbox>
        </Space>
      </Panel>
    </Collapse>
  )
}

export const FilterPrices = () => {
  return (
    <Collapse
      defaultActiveKey={['1']}
      expandIconPosition="end"
      onChange={() => {}}
    >
      <Panel header="Precio" key="1">
        <Slider range defaultValue={[0, 500]} min={0} max={500} />
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
