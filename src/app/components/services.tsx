import { qsServices } from '@/queries/service'
import { Payload } from '@/types/payload'
import { Service } from '@/types/service'
import { fetcher } from '@/utils/fetcher'
import { BorderOutlined } from '@ant-design/icons'
import { Carousel, Col, Flex, Row, Skeleton, Typography } from 'antd'
import useSWR from 'swr'

const { Text, Title, Paragraph } = Typography

const responsive = [
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
    },
  },
  {
    breakpoint: 576,
    settings: {
      slidesToShow: 1,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 992,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 9999,
    settings: {
      slidesToShow: 4,
    },
  },
]

export default function Services() {
  const { data: services, error: errorCategories } = useSWR<Payload<Service[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services?${qsServices}`,
    fetcher,
  )

  if (!services) {
    return <Skeleton />
  }

  return (
    <>
      <Carousel
        slidesToShow={4}
        draggable={true}
        infinite={false}
        dots={false}
        autoplay
        responsive={responsive}
        style={{ paddingTop: '1rem', paddingBottom: '2rem' }}
      >
        {services.data.map((service: Service, index: number) => {
          return (
            <>
              <Flex justify="center" align="center" gap={10}>
                <BorderOutlined
                  style={{ fontSize: '2rem', color: '#3150ff' }}
                />
                <Flex vertical>
                  <Title level={5} style={{ margin: 0 }}>
                    {service.attributes.name}
                  </Title>
                  <Text style={{ color: '#777' }}>
                    {service.attributes.description}
                  </Text>
                </Flex>
              </Flex>
            </>
          )
        })}
      </Carousel>
      <Row gutter={[10, 10]}>
        <Col xs={24} md={8}>
          <div
            style={{
              color: '#000',
              height: '200px',
              maxHeight: '200px',
              width: '100%',
              padding: '2rem',
              backgroundColor: '#B0BEC5',
            }}
          >
            Espacio publicitario
          </div>
        </Col>
        <Col xs={24} md={16}>
          <div
            style={{
              color: '#000',
              height: '200px',
              maxHeight: '200px',
              width: '100%',
              padding: '2rem',
              backgroundColor: '#B0BEC5',
            }}
          >
            Espacio publicitario
          </div>
        </Col>
      </Row>
      <br />
      <br />
    </>
  )
}
