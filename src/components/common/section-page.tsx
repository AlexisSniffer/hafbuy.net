import { Breadcrumb, Flex, Typography } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

const { Title } = Typography

interface Props {
  title: string
  breadcrumbs: ItemType[]
}

export default function SectionPage({ title, breadcrumbs }: Props) {
  return (
    <div
      style={{
        backgroundColor: '#f4f4f4',
        padding: '4rem',
      }}
    >
      <Flex vertical gap={10} justify="center" align="center">
        <Breadcrumb items={breadcrumbs} />
        <Title level={2}>{title}</Title>
      </Flex>
    </div>
  )
}
