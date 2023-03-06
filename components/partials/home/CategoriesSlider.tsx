import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import { Alert, Carousel, Empty, Skeleton, Typography } from 'antd'

import { qsCategories } from '../../../store/queries/categories'
import styles from '../../../styles/Home.module.scss'

interface Category {
  name: string
  slug: string
  image: string
}

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

const CategorySlider = (category: Category) => {
  return (
    <div>
      <Link href={'/'} className={styles['category-slider']}>
        {category.image ? (
          <figure>
            <Image
              alt="category"
              src={category.image}
              width={128}
              height={128}
            />
          </figure>
        ) : (
          <div className={styles['category-slider']}>
            <figure>
              <div className={styles['category-slider-no-image']}></div>
            </figure>
          </div>
        )}
        <Title level={5}>{category.name}</Title>
      </Link>
    </div>
  )
}

const CategoriesSlider = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?${qsCategories()}`,
    fetcher
  )

  if (error) {
    return <Alert message="Error al cargar" type="error" />
  }

  if ((data?.data?.length ?? 0) === 0) {
    return <Empty />
  }

  return (
    <Carousel
      style={{ marginTop: '1rem' }}
      slidesToShow={8}
      draggable={true}
      infinite={true}
      dots={false}
      autoplay={true}
      responsive={responsive}
    >
      {data ? (
        data.data.map((category: any) => {
          return (
            <CategorySlider
              key={category.attributes.slug}
              name={category.attributes.name}
              slug={category.attributes.slug}
              image={
                category.attributes.thumbnail.data != null
                  ? category.attributes.thumbnail.data.attributes.url
                  : null
              }
            />
          )
        })
      ) : (
        <Skeleton />
      )}
    </Carousel>
  )
}

export default CategoriesSlider
