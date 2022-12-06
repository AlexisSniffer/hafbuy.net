import { Menu } from 'antd'
import { menuPages, menuOthers } from '../../data'
import type { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'

export const MenuPages = () => {
  const cart = useSelector((state: RootState) => state.cart)

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
