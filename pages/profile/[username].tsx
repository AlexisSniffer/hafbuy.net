import { useRouter } from 'next/router'
import { Button } from 'antd'
import Cookies from 'js-cookie'

const ProfilePage = () => {
  const router = useRouter()
  const { username } = router.query

  const logout = async (values: any) => {
    Cookies.remove('jwt')
    Cookies.remove('user')
    router.push('/login')
  }

  return (
    <>
      <h1>Bienvenido</h1>
      <h2>Usuario: {username}</h2>
      <h3>Pronto:</h3>
      <ul>
        <li>Ordenes de compras</li>
        <li>Direcciones</li>
        <li>Detalles de la cuenta</li>
        <li>Lista de deseos</li>
      </ul>

      <Button type="primary" onClick={logout}>
        Cerrar Sesión
      </Button>
    </>
  )
}

export default ProfilePage
