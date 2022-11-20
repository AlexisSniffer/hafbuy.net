import { Button, Dropdown, MenuProps, Popover, Space, Row, Col } from 'antd'
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { depart as data } from '../../data.test'

type DepartmentProps = {
  title: string
  slug?: string
  categories?: DepartmentProps[]
}

const Department = (props: DepartmentProps) => {
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  )

  return (
    <span>
      <ShoppingCartOutlined />
      <span>{props.title}</span>
    </span>
  )
}

const SubDepartment = (props: DepartmentProps) => {
  return (
    <Row>
      <Col span={12}>
        <h4>
          <a href="">{props.title}</a>
        </h4>
        <ul>
          {props.categories?.map((category) => {
            return (
              <li>
                <a href="">{category.title}</a>
              </li>
            )
          })}
        </ul>
      </Col>
    </Row>
  )
}

const items: MenuProps['items'] = data.map((category) => {
  return {
    key: category.slug,
    label: <Department title={category.title} slug={category.slug} />,
    children: category.categories.map((subcategory) => {
      return {
        key: subcategory.slug,
        label: <Department title={subcategory.title} />,
        children: subcategory.categories.map((subcategory2) => {
          return {
            key: subcategory2.slug,
            label: <Department title={subcategory2.title} />,
          }
        }),
      }
    }),
  }
})

const Prueba = () => {
  return <h1>Prueba</h1>
}

const MenuDepartment = () => {
  return (
    <Dropdown
      menu={{ items }}
      placement="bottom"
      arrow
      trigger={['click']}
      overlayClassName="menu-departament"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Button type="primary" icon={<MenuOutlined />} size={'large'}>
          DEPARTAMENTOS
        </Button>
      </a>
    </Dropdown>
  )
}

export default MenuDepartment
