import { Menu } from 'antd'
import { menuPages, menuOthers } from '../../data'

export const MenuPages = () => {
  return (
    <>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['home']}
        className="header-menu-pages "
        items={menuPages}
      ></Menu>
    </>
  )
}

export const MenuOthers = () => {
  return (
    <>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['home']}
        className="header-menu-others "
        items={menuOthers}
      ></Menu>
    </>
  )
}
