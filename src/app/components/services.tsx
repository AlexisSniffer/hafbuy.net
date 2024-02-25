import { qsServices } from '@/queries/service'
import styles from '@/styles/products-filter.module.scss'
import { Payload } from '@/types/payload'
import { Service } from '@/types/service'
import { fetcher } from '@/utils/fetcher'
import Icon from '@ant-design/icons/lib/components/Icon'
import { Col, Flex, Row, Skeleton, Typography } from 'antd'
import useSWR from 'swr'

const { Text, Title, Paragraph } = Typography

export default function Services() {
  const { data: services, error: errorCategories } = useSWR<Payload<Service[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services?${qsServices}`,
    fetcher,
  )

  if (!services) {
    return <Skeleton />
  }

  return (
    <Row style={{ padding: '1rem 0' }}>
      {services.data.length ? (
        <>
          {services.data.map((service: Service, index: number) => {
            return (
              <Col key={index} span={6}>
                <Flex className={styles['services']}>
                  <Icon type={service.attributes.icon} />
                  <Flex vertical>
                    <Title level={5} className={styles['name']}>
                      {service.attributes.name}
                    </Title>
                    <Paragraph className={styles['description']}>
                      {service.attributes.description}
                    </Paragraph>
                  </Flex>
                </Flex>
              </Col>
            )
          })}
        </>
      ) : null}
    </Row>
  )
}
