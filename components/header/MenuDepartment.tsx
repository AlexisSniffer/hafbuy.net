import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useDispatch } from 'react-redux'
import { Alert, Button, Dropdown, MenuProps } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

import { qsCategories } from '../../store/queries/categories'
import {
  addSubCategory,
  clearSubCategories,
  setPage,
  setPageSize,
  setQuery,
} from '../../store/searchProductsSlice'

type DepartmentProps = {
  name: string
  slug?: string
  categories?: DepartmentProps[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Department = (props: DepartmentProps) => {
  return <span>{props.name}</span>
}

const SubDepartment = (props: DepartmentProps) => {
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <span>
      <Link
        href="/shop"
        style={{ color: 'rgba(0, 0, 0, 0.88)' }}
        onClick={() => {
          dispatch(clearSubCategories())
          dispatch(addSubCategory(props.slug!))
          dispatch(setPage(1))
          dispatch(setPageSize(10))
          dispatch(setQuery())
        }}
      >
        {props.slug}
      </Link>
    </span>
  )
}

const MenuDepartment = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategories()}`,
    fetcher
  )

  if (error) {
    return <Alert message="Error al cargar" type="error" />
  }

  if ((data?.data?.length ?? 0) === 0) {
    return <></>
  }

  const items: MenuProps['items'] =
    data != null
      ? data.data.map((category: any) => {
          return {
            key: category.attributes.slug,
            label: (
              <Department
                name={category.attributes.name}
                slug={category.attributes.slug}
              />
            ),
            children:
              category.attributes.subcategories.data.length > 0
                ? category.attributes.subcategories.data.map(
                    (subcategory: any) => {
                      return {
                        key: subcategory.attributes.slug,
                        label: (
                          <SubDepartment
                            name={subcategory.attributes.name}
                            slug={subcategory.attributes.slug}
                          />
                        ),
                      }
                    }
                  )
                : null,
          }
        })
      : []

  return (
    <Dropdown
      menu={{ items }}
      placement="bottom"
      arrow
      trigger={['click']}
      overlayClassName="menu-departament"
    >
      <a onClick={(e) => e.preventDefault()}>
        <Button type="primary" icon={<MenuOutlined />} size={'large'}>
          DEPARTAMENTOS
        </Button>
      </a>
    </Dropdown>
  )
}

export default MenuDepartment
