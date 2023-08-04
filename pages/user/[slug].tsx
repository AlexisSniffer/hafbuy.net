import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Alert, Skeleton } from 'antd'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const UserPage = () => {
  const router = useRouter()
  const { slug } = router.query

  /*
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsfilterProductsBySlug({
      slug: slug,
    })}`,
    fetcher
  )

  if (error) {
    return <Alert message="No existe el producto solicitado" type="error" />
  }

  if (!data) {
    return <Skeleton />
  }
  */
  return (
    <>
      <h1>{slug}</h1>
    </>
  )
}

export default UserPage
