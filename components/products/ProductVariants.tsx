import React, { useState } from 'react'
import { Radio, RadioChangeEvent, Space } from 'antd'

import styles from '../../styles/ProductDetail.module.scss'
import { FormatPainterFilled } from '@ant-design/icons'

const ProductVariants = ({ variants }: any) => {
  const [variant, setVariant] = useState(new Map())
  const keys = [...variants.keys()]

  const verifyVariant = ({ target: { value } }: RadioChangeEvent) => {
    let map = variant
    map.set(value.key, value.value)

    setVariant(map)
  }

  return (
    <>
      <Space direction="vertical" className={styles['variants']}>
        {keys.map((key) => {
          return (
            <Space key={key}>
              <h5 className={styles['variants-key']}>{key}:</h5>
              <Radio.Group
                name="radiogroup"
                optionType="button"
                buttonStyle="solid"
                onChange={verifyVariant}
              >
                {[...variants.get(key)].map((value) => {
                  return (
                    <Radio
                      key={value}
                      value={{ key, value }}
                      className={styles['variants-values']}
                    >
                      {key !== 'color' ? (
                        value
                      ) : (
                        <FormatPainterFilled
                          style={{ color: value, fontSize: '1rem' }}
                        />
                      )}
                    </Radio>
                  )
                })}
              </Radio.Group>
            </Space>
          )
        })}
      </Space>
    </>
  )
}

export default ProductVariants
