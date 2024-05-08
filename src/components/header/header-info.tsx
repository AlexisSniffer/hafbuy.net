import { CarFilled } from '@ant-design/icons'
import { Space } from 'antd'

export default function HeaderInfo() {
  return (
    <Space direction="horizontal">
      <CarFilled style={{ color: '#3050ff' }} />
      <div
        style={{
          fontSize: '13px',
          fontWeight: '400',
          letterSpacing: '-.025',
          textTransform: 'none',
          color: '#666',
        }}
      >
        No hay ofertas por el momento.
      </div>
    </Space>
  )
}
