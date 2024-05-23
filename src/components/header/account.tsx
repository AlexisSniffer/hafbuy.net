import styles from '@/styles/header.module.scss'
import { UserOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import Link from 'next/link'

export default function Account() {
  return (
    <Space direction="horizontal" size={'middle'} className={styles['account']}>
      <UserOutlined className={styles['account-icon']} />
      <Space direction="vertical" className={styles['account-info']}>
        <Link href={'/auth/login'}>
        <span className={styles['account-info-subtitle']}>Bienvenido</span>
        <h3 className={styles['account-info-title']}>Mi Cuenta</h3>
        </Link>
      </Space>
    </Space>
  )
}
