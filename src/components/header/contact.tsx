import { PhoneOutlined } from '@ant-design/icons'
import { ConfigProvider, Space, ThemeConfig, Typography } from 'antd'

const { Link: LinkAntd } = Typography

const theme: ThemeConfig = {
  components: {
    Typography: {
      colorLink: '#666',
      colorLinkHover: '#777',
      colorLinkActive: '#777',
    },
  },
}

export default function Contact() {
  return (
    <ConfigProvider theme={theme}>
      <Space direction="horizontal">
        <PhoneOutlined />
        <LinkAntd href={'tel:+62505218'}>
          <span>
            <b>(+507) 6250-5218</b>
          </span>
        </LinkAntd>
      </Space>
    </ConfigProvider>
  )
}
