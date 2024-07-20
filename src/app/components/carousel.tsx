import { qsHomePage } from '@/queries/pages'
import useFilterStore from '@/store/filterStore'
import { fetcher } from '@/utils/fetcher'
import Image from 'next/image'
import useSWR from 'swr'

import { Carousel, ConfigProvider, Skeleton, ThemeConfig } from 'antd'
import { useRouter } from 'next/navigation'

const theme: ThemeConfig = {
  components: {
    Carousel: {},
  },
}

export default function CarouselMain() {
  const router = useRouter()
  const { setCategories } = useFilterStore()

  const { data: homePage, error: errorHomePage } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/home-page?${qsHomePage}`,
    fetcher,
  )

  if (!homePage) {
    return <Skeleton />
  }

  return (
    <ConfigProvider theme={theme}>
      {homePage?.data.attributes.carousel.sliders ? (
        <Carousel draggable={true} infinite={false} autoplay={true} arrows>
          {homePage?.data.attributes.carousel.sliders.map((slide: any) => {
            return (
              <div key={slide.id}>
                <Image
                  src={slide.image.data.attributes.url}
                  alt={slide.image.data.attributes.alternativeText ?? ''}
                  width={100}
                  height={100}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            )
          })}
        </Carousel>
      ) : (
        <></>
      )}
    </ConfigProvider>
  )
}
