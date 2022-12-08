import { UserOutlined } from '@ant-design/icons'

import styles from '../../styles/MyAccount.module.scss'

const MyAccount = () => {
  return (
    <article className={styles['my-account']}>
      <UserOutlined className={styles['my-account-icon']} />
      <div className={styles['my-account-info']}>
        <span>Bienvenido</span>
        <h3>Mi Cuenta</h3>
      </div>
    </article>
  )
}

export default MyAccount
