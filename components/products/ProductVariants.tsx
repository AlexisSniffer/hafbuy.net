import React, { useState } from 'react'
import { Radio, RadioChangeEvent, Space, Spin } from 'antd'

import styles from '../../styles/ProductDetail.module.scss'
import { FormatPainterFilled } from '@ant-design/icons'

const ProductVariants = ({
  type,
  values,
  selectedOptions,
  setOptions,
}: any) => {
  return (
    <>
      <Space>
        <h5 className={styles['variants-key']}>{type}:</h5>
        <Radio.Group
          name="radiogroup"
          optionType="button"
          buttonStyle="solid"
          value={selectedOptions[type]}
          onChange={({ target: { value } }: RadioChangeEvent) => {
            setOptions(type, value)
          }}
        >
          {values.map((value: any) => {
            return (
              <Radio
                key={value}
                value={value}
                className={styles['variants-values']}
              >
                {type === 'color' ? (
                  <FormatPainterFilled
                    style={{ color: value, fontSize: '1rem' }}
                  />
                ) : (
                  value
                )}
              </Radio>
            )
          })}
        </Radio.Group>
      </Space>
    </>
  )
}

export default ProductVariants
