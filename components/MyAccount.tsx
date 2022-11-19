import { UserOutlined } from '@ant-design/icons'

export default function MyAccount() {
  return (
    <>
      <div className="my-account">
        <UserOutlined className="icon" />{' '}
        <div className="info">
          <span>Bienvenido</span> <h4>Mi Cuenta</h4>
        </div>
      </div>
    </>
  )
}
