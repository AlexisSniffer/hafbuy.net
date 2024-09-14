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

  type ColorNames =
    | 'black'
    | 'white'
    | 'red'
    | 'green'
    | 'blue'
    | 'yellow'
    | 'cyan'
    | 'magenta'
    | 'gray'
    | 'grey'
    | 'orange'
    | 'purple'
    | 'brown'
    | 'pink'
    | 'lime'
    | 'navy'
    | 'teal'
    | 'olive'
    | 'maroon'
    | 'aqua'
    | 'silver'
    | 'gold'

  const colorNameToHex = (color: string): string => {
    const colors: Record<ColorNames, string> = {
      black: '#000000',
      white: '#FFFFFF',
      red: '#FF0000',
      green: '#008000',
      blue: '#0000FF',
      yellow: '#FFFF00',
      cyan: '#00FFFF',
      magenta: '#FF00FF',
      gray: '#808080',
      grey: '#808080',
      orange: '#FFA500',
      purple: '#800080',
      brown: '#A52A2A',
      pink: '#FFC0CB',
      lime: '#00FF00',
      navy: '#000080',
      teal: '#008080',
      olive: '#808000',
      maroon: '#800000',
      aqua: '#00FFFF',
      silver: '#C0C0C0',
      gold: '#FFD700',
    }

    return colors[color.toLowerCase() as ColorNames] || color
  }

  const isLightColor = (color: string): boolean => {
    const hex = colorNameToHex(color).replace('#', '')

    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 155
  }
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
                      <CheckOutlined
                        style={{
                          color: isLightColor(value.toLowerCase())
                            ? 'black'
                            : 'white',
                        }}
                      />
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
