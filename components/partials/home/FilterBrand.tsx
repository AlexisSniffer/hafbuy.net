import Link from 'next/link'
import useSWR from 'swr'
import { useDispatch } from 'react-redux'
import { Alert, Carousel, Col, List, Row, Typography } from 'antd'

import styles from '../../../styles/Home.module.scss'
import Container from '../../Container'
import { qsFilterBrands } from '../../../store/queries/products'

const { Title } = Typography
const fetcher = (url: string) => fetch(url).then((res) => res.json())
const responsive = [
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 576,
    settings: {
      slidesToShow: 3,
    },
  },
  {
    breakpoint: 768,
    settings: {
      slidesToShow: 4,
    },
  },
  {
    breakpoint: 992,
    settings: {
      slidesToShow: 6,
    },
  },
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 7,
    },
  },
]

const FilterBrand = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/brands?${qsFilterBrands()}`,
    fetcher
  )

  if (error) {
    return <Alert message="Error al cargar" type="error" />
  }

  return (
    <Container className={styles['section-filter']}>
      <article
        style={{
          padding: '1rem 2rem 2rem',
          backgroundColor: '#fff',
        }}
      >
        <Title level={3}>Marcas Destacadas</Title>
        <Carousel
          style={{ marginTop: '1rem' }}
          slidesToShow={6}
          draggable={true}
          infinite={true}
          dots={false}
          autoplay={true}
          responsive={responsive}
        >
          {data?.data?.map((brand: any) => {
            return (
              <div key={brand.attributes.name}>
                <div
                  style={{
                    border: '1px solid rgba(0,0,0,0.2)',
                    padding: '2rem 1rem',
                    margin: '1rem',
                    background: 'rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {brand.attributes.name}
                </div>
              </div>
            )
          })}
        </Carousel>
      </article>
    </Container>
  )
}

export default FilterBrand
