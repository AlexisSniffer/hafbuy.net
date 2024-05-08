import useFilterStore from '@/store/filterStore'
import styles from '@/styles/products-filter.module.scss'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import {
  Carousel,
  ConfigProvider,
  Flex,
  Skeleton,
  ThemeConfig,
  Typography,
} from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const theme: ThemeConfig = {
  components: {
    Card: {
      borderRadiusLG: 0,
    },
  },
}

const { Text } = Typography

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
      slidesToShow: 5,
    },
  },
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 6,
    },
  },
  {
    breakpoint: 9999,
    settings: {
      slidesToShow: 7,
    },
  },
]

function count(categories: Category[]) {
  let slugs: string[] = []
  let count = 0

  categories.map((category1: Category) => {
    if (category1.attributes.categories.data.length) {
      category1.attributes.categories.data.map((category2: Category) => {
        category2.attributes.products?.data.map((product: Product) => {
          if (!slugs.includes(product.attributes.slug)) {
            slugs.push(product.attributes.slug)
            count++
          }
        })
      })
    }
  })

  return count == 1 ? `${count} product` : `${count} products`
}

export default function CategoriesSlider({
  categories,
}: {
  categories: Payload<Category[]> | undefined
}) {
  const router = useRouter()
  const { setCategories } = useFilterStore()

  if (!categories) {
    return <Skeleton />
  }

  return (
    <ConfigProvider theme={theme}>
      <Carousel
        draggable={true}
        infinite={false}
        dots={false}
        autoplay={true}
        responsive={responsive}
        className={styles['carousel-categories']}
      >
        {categories.data.map((category: Category) => {
          return (
            <div key={category.attributes.slug}>
              <Flex
                vertical
                align="center"
                className={styles['container']}
                onClick={() => {
                  setCategories([category.attributes.slug])
                  router.push('/shop')
                }}
              >
                <Image
                  width={128}
                  height={128}
                  alt={
                    category.attributes.thumbnail?.data?.attributes
                      .alternativeText ?? ''
                  }
                  src={
                    category.attributes.thumbnail?.data?.attributes.url ??
                    '/no-image.jpg'
                  }
                  className={styles['thumbnail']}
                />
                <Text className={styles['name']}>
                  {category.attributes.name}
                </Text>
                <Text className={styles['count']}>
                  {count(category.attributes.categories.data)}
                </Text>
              </Flex>
            </div>
          )
        })}
      </Carousel>
    </ConfigProvider>
  )
}
