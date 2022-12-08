import { Menu } from 'antd'

import { menuPages, menuOthers } from '../../data'
import styles from '../../styles/HeaderMenu.module.scss'

export const MenuPages = () => {
  return (
    <Menu
      items={menuPages}
      mode="horizontal"
      defaultSelectedKeys={['home']}
      disabledOverflow={true}
      className={styles['header-menu-pages']}
    ></Menu>
  )
}

export const MenuOthers = () => {
  return (
    <Menu
      items={menuOthers}
      mode="horizontal"
      disabledOverflow={true}
      className={styles['header-menu-others']}
    ></Menu>
  )
}
