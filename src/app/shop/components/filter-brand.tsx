import { qsBrands } from '@/queries/brand'
import useFilterStore from '@/store/filterStore'
import { Brand } from '@/types/brand'
import { Payload } from '@/types/payload'
import { fetcher } from '@/utils/fetcher'
import { ConfigProvider, Skeleton, ThemeConfig, Tree, Typography } from 'antd'
import type { DataNode } from 'antd/es/tree'
import { Key, useEffect, useState } from 'react'
import useSWR from 'swr'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {},
}

export default function FilterBrand() {
  const brandsStore = useFilterStore((state) => state.brands)
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(brandsStore)
  const { setBrands } = useFilterStore()

  const { data: brands, error: errorBrands } = useSWR<Payload<Brand[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/brands?${qsBrands}`,
    fetcher,
  )

  useEffect(() => {
    setCheckedKeys(brandsStore)
  }, [brandsStore])

  if (!brands) {
    return <Skeleton />
  }

  const brandNode = ({ attributes }: Brand) => {
    return {
      key: attributes.slug,
      title: (
        <Text style={{ textTransform: 'capitalize' }}>{attributes.name}</Text>
      ),
    }
  }

  const treeData = (brands: Brand[]) => {
    const treeData: DataNode[] = brands?.map((brand: Brand) => {
      return {
        ...brandNode(brand),
      }
    })

    return treeData
  }

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue)
    setBrands(checkedKeysValue)
  }

  return (
    <ConfigProvider theme={theme}>
      <Tree
        checkable
        treeData={treeData(brands?.data)}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
      />
    </ConfigProvider>
  )
}
