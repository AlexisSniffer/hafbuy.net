import useFilterStore from '@/store/filterStore'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import SearchProps from '@/types/search-props'
import {
  ConfigProvider,
  Form,
  Input,
  Select,
  SelectProps,
  Spin,
  ThemeConfig,
  Typography,
} from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const { Search } = Input
const { Paragraph } = Typography

const theme: ThemeConfig = {
  components: {
    Form: {
      itemMarginBottom: 0,
      algorithm: true,
    },
  },
}

const selectBefore = (data: Category[]) => {
  let options: SelectProps['options'] = [{ value: 'all', label: 'Todos' }]

  data.map(({ attributes }: Category) => {
    options?.push({
      value: attributes.slug,
      label: (
        <Paragraph style={{ textTransform: 'capitalize', margin: '0' }}>
          {attributes.name}
        </Paragraph>
      ),
    })

    if (attributes.categories && attributes.categories?.data.length > 0) {
      attributes.categories?.data.map((subcategory: any) => {
        options?.push({
          value: subcategory.attributes.slug,
          label: (
            <Paragraph style={{ textTransform: 'capitalize', margin: '0' }}>
              - {subcategory.attributes.name}
            </Paragraph>
          ),
        })
      })
    }
  })

  return (
    <Form.Item name="category" noStyle initialValue="all">
      <Select
        options={options}
        dropdownStyle={{
          width: '300px',
        }}
      />
    </Form.Item>
  )
}

export default function HeaderSearch({
  data,
  meta,
}: Payload<Category[] | undefined>) {
  const router = useRouter()
  const [form] = Form.useForm()
  const paginationStore = useFilterStore((state) => state.pagination)
  const { setFilter, setCategories, setPagination } = useFilterStore()
  const [isDesktopOrTablet, setIsDesktopOrTablet] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 500px)')

    const updateMatches = () => setIsDesktopOrTablet(mediaQuery.matches)
    updateMatches()

    mediaQuery.addEventListener('change', updateMatches)

    return () => mediaQuery.removeEventListener('change', updateMatches)
  }, [])

  const onFinish = (values: SearchProps) => {
    const { filter, category } = values

    setFilter(filter!)
    category == 'all' ? setCategories([]) : setCategories([category])
    setPagination({
      page: 1,
      pageSize: paginationStore.pageSize,
    })
    router.push('/shop')
  }

  return (
    <ConfigProvider theme={theme}>
      <Form
        form={form}
        name="headerSearch"
        onFinish={onFinish}
        initialValues={{
          ['filter']: '',
        }}
      >
        <Form.Item name="filter">
          <Search
            enterButton
            allowClear
            size="large"
            placeholder="Buscar..."
            addonBefore={
              isDesktopOrTablet ? data ? selectBefore(data) : <Spin /> : null
            }
            onSearch={form.submit}
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  )
}
