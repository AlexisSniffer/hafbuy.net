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
  { value: 'es', label: '🇵🇦 ESP' },
  // { value: 'en', label: '🇺🇸 English' },
]

export default function Languages() {
  const { setFilter, setCategories } = useFilterStore()

  const handleChange = (value: string) => {
    localStorage.setItem('locale', value)
    setFilter('')
    setCategories([])
  }

  return (
    <ConfigProvider theme={theme}>
      <Select
        defaultValue={'es'}
        variant={'borderless'}
        size={'small'}
        onChange={handleChange}
        options={languageOptions}
      />
    </ConfigProvider>
  )
}
