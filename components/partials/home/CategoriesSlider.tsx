import Link from 'next/link'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { Alert, Carousel, Empty, Skeleton, Typography } from 'antd'

import styles from '../../../styles/Home.module.scss'
import {
  addCategory,
  clearCategories,
  setPage,
  setPageSize,
  setQuery,
} from '../../../store/searchProductsSlice'

interface Category {
  name: string
  slug: string
  image: string
}

const { Title } = Typography
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
  const dispatch = useDispatch()

  return (
    <div className={styles['category-slider']}>
      {category.image ? (
        <Link
          href="/shop"
          onClick={() => {
            dispatch(clearCategories())
            dispatch(addCategory(category.slug))
            dispatch(setPage(1))
            dispatch(setPageSize(10))
            dispatch(setQuery())
          }}
        >
          <figure>
            <Image
              alt="category"
              src={category.image}
              width={128}
              height={128}
            />
          </figure>
        </Link>
      ) : (
        <div className={styles['category-slider']}>
          <figure>
            <div className={styles['category-slider-no-image']}></div>
          </figure>
        </div>
      )}
      <Title level={5}>{category.name}</Title>
    </div>
  )
}

const CategoriesSlider = ({ data, error }: any) => {
  if (error) {
    return <Alert message="Error al cargar" type="error" />
  }

  if (!data) {
    return <Skeleton />
  }

  if ((data?.data?.length ?? 0) === 0) {
    return <Empty />
  }

  return (
    <Carousel
      style={{ marginTop: '1rem' }}
      slidesToShow={data?.data?.length < 8 ? data?.data?.length : 8}
      draggable={true}
      infinite={true}
      dots={false}
      autoplay={true}
      responsive={responsive}
    >
      {data.data.map((category: any) => {
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
      })}
    </Carousel>
  )
}

export default CategoriesSlider
