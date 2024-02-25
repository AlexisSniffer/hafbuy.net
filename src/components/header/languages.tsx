'use client'

import useFilterStore from '@/store/filterStore'
import { ConfigProvider, Select, ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  components: {
    Select: {
      fontSize: 12,
    },
  },
}

const languageOptions = [
  { value: 'es', label: '🇵🇦 Español' },
  { value: 'en', label: '🇺🇸 English' },
]

export default function Languages() {
  const paginationStore = useFilterStore((state) => state.pagination)
  const { setFilter, setCategories } = useFilterStore()

  const handleChange = (value: string) => {
    localStorage.setItem('locale', value)
    setFilter('')
    setCategories([])
  }

  return (
    <ConfigProvider theme={theme}>
      <Select
        //defaultValue={localStorage.getItem('locale')}
        bordered={false}
        size={'small'}
        onChange={handleChange}
        options={languageOptions}
      />
    </ConfigProvider>
  )
}
