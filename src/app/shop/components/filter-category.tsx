import { qsCategory } from '@/queries/category'
import useFilterStore from '@/store/filterStore'
import { Category } from '@/types/category'
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

export default function FilterCategory() {
  const categoriesStore = useFilterStore((state) => state.categories)
  const [checkedKeys, setCheckedKeys] = useState<Key[]>(categoriesStore)
  const { setCategories } = useFilterStore()

  const { data: categories, error: errorCategories } = useSWR<
    Payload<Category[]>
  >(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategory}`, fetcher)

  useEffect(() => {
    setCheckedKeys(categoriesStore)
  }, [categoriesStore])

  if (!categories) {
    return <Skeleton />
  }

  const categoryNode = ({ attributes }: Category) => {
    return {
      key: attributes.slug,
      title: (
        <Text style={{ textTransform: 'capitalize' }}>{attributes.name}</Text>
      ),
    }
  }

  const treeData = (categories: Category[]) => {
    const treeData: DataNode[] = categories?.map((category: Category) => {
      return {
        ...categoryNode(category),
        children: category.attributes.categories?.data.map(
          (category2: Category) => {
            return {
              ...categoryNode(category2),
              children: category2.attributes.categories?.data.map(
                (category3: Category) => {
                  return {
                    ...categoryNode(category3),
                  }
                },
              ),
            }
          },
        ),
      }
    })

    return treeData
  }

  const onCheck = (checkedKeysValue: any) => {
    setCheckedKeys(checkedKeysValue)
    setCategories(checkedKeysValue)
  }

  return (
    <ConfigProvider theme={theme}>
      <Tree
        checkable
        treeData={treeData(categories?.data)}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
      />
    </ConfigProvider>
  )
}
