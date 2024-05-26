import styles from '@/styles/header.module.scss'
import { UserOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Account() {
  const { data: session, status } = useSession()

  return (
    <Space direction="horizontal" size={'middle'} className={styles['account']}>
      <UserOutlined className={styles['account-icon']} />
      <Space direction="vertical" className={styles['account-info']}>
        <Link href={status === 'authenticated' ? '/profile' : '/auth/login'}>
          <span className={styles['account-info-subtitle']}>Bienvenido</span>
          <h3 className={styles['account-info-title']}>
            {status === 'authenticated' ? session.user!.name : 'Mi Cuenta'}
          </h3>
        </Link>
      </Space>
    </Space>
  )
}
