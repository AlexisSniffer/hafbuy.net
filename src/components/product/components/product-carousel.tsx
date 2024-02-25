import styles from '@/styles/product.module.scss'
import { Media } from '@/types/media'
import { Product } from '@/types/product'
import { Carousel, Col, ConfigProvider, Row, ThemeConfig } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import Image from 'next/image'
import { useRef } from 'react'

const theme: ThemeConfig = {
  components: {},
}

export default function ProductCarousel({ id, attributes }: Product) {
  const carouselRef = useRef<CarouselRef>(null)

  const goTo = (slide: any) => {
    carouselRef.current?.goTo(slide, false)
  }

  return (
    <ConfigProvider theme={theme}>
      <Row
        gutter={[8, 8]}
        className={`${styles['product']} ${styles['product-carousel']}`}
      >
        <Col span={24}>
          <Carousel ref={carouselRef} autoplay draggable pauseOnHover dots>
            {attributes.images.data.map((image: Media) => {
              return (
                <div key={image.id}>
                  <Image
                    src={'http://localhost:1337' + image.attributes.url}
                    alt={image.attributes.alternativeText ?? attributes.slug}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              )
            })}
          </Carousel>
        </Col>
        <Col span={24}>
          <Row gutter={[8, 8]}>
            {attributes.images.data.map((image: Media, index: number) => {
              return (
                <Col span={6} key={image.attributes.url}>
                  <Image
                    src={'http://localhost:1337' + image.attributes.url}
                    alt={image.attributes.alternativeText ?? attributes.slug}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    onClick={() => goTo(index)}
                  />
                </Col>
              )
            })}
          </Row>
        </Col>
      </Row>
    </ConfigProvider>
  )
}
