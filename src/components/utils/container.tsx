import { Col, Row } from 'antd'
import { CSSProperties } from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  style?: CSSProperties | undefined
}

export default function Container({
  children,
  className,
  style,
}: ContainerProps) {
  return (
    <Row className={className} style={style}>
      <Col xs={1} lg={3}></Col>
      <Col xs={22} lg={18}>
        {children}
      </Col>
      <Col xs={1} lg={3}></Col>
    </Row>
  )
}
