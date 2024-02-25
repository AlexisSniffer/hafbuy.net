import styles from '@/styles/product.module.scss'
import { CheckOutlined } from '@ant-design/icons'
import {
  Col,
  ConfigProvider,
  Radio,
  RadioChangeEvent,
  Row,
  ThemeConfig,
  Typography,
} from 'antd'
import { useState } from 'react'

const theme: ThemeConfig = {
  components: {
    Radio: {
      borderRadius: 0,
    },
  },
}

const { Text } = Typography

export default function ProductVariants({
  type,
  values,
  selectedOptions,
  setOptions,
}: any) {
  const [selectedVariant, setSelectedVariant] = useState<string>()

  return (
    <ConfigProvider theme={theme}>
      <Row>
        <Col span={3}>
          <Text className={styles['detail']}>{type}:</Text>
        </Col>
        <Col span={21}>
          <Radio.Group
            name="radiogroup"
            optionType="button"
            buttonStyle="solid"
            className={styles['variants']}
            onChange={({ target: { value } }: RadioChangeEvent) => {
              setSelectedVariant(value)
              setOptions(type, value)
            }}
          >
            {values.map((value: any) => {
              return (
                <Radio
                  key={value}
                  value={value}
                  className={styles['variant']}
                  style={{
                    backgroundColor: value,
                  }}
                >
                  {type === 'color' ? (
                    selectedVariant == value ? (
                      <CheckOutlined />
                    ) : (
                      <></>
                    )
                  ) : (
                    value
                  )}
                </Radio>
              )
            })}
          </Radio.Group>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
