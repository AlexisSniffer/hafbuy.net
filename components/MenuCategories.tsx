import { Button, Dropdown, MenuProps, Popover } from 'antd'
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import data from './../data.test'

type CategoryProps = {
  title: string
  slug?: string
}

type SubcategoriesProps = {
  title: string
  slug?: string
}

const Category = (props: CategoryProps) => {
  return (
    <>
      <ShoppingCartOutlined />
      <span>{props.title}</span>
    </>
  )
}

const Subcategories = (props: SubcategoriesProps) => {
  return (
    <>
      <h4>{props.title}</h4>
    </>
  )
}

const items: MenuProps['items'] = data.map((category) => {
  return {
    key: category.slug,
    label: <Category title={category.title} slug={category.slug} />,
    children: category.categories.map((subcategory) => {
      return {
        key: subcategory.slug,
        label: <Subcategories title={subcategory.title} />,
      }
    }),
  }
})

const MenuCategories = () => {
  return (
    <Dropdown menu={{ items }} placement="bottom" arrow trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Button type="primary" icon={<MenuOutlined />} size={'large'}>
          CATEGORIAS
        </Button>
      </a>
    </Dropdown>
  )
}

export default MenuCategories
