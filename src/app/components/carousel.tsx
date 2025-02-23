'use client'

import { qsHomePage } from '@/queries/pages'
import useFilterStore from '@/store/filterStore'
import { fetcher } from '@/utils/fetcher'
import {
  Carousel,
  ConfigProvider,
  Skeleton,
  ThemeConfig,
  Watermark,
} from 'antd'
import { get } from 'http'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const theme: ThemeConfig = {
  components: {
    Carousel: {},
  },
}

export default function CarouselMain({ name }: { name: string }) {
  const router = useRouter()
  const [breakpoint, setBreakpoint] = useState('lg')
  const breakpoints = ['xs', 'sm', 'md', 'lg']

  const { data: homePage, error: errorHomePage } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/home-page?${qsHomePage}`,
    fetcher,
  )

  useEffect(() => {
    const calculateBreakpoint = () => {
      const width = window.innerWidth

      if (width < 480) setBreakpoint('xs')
      else if (width < 576) setBreakpoint('sm')
      else if (width < 768) setBreakpoint('md')
      else if (width < 992) setBreakpoint('lg')
      else setBreakpoint('lg')
    }

    calculateBreakpoint()
    window.addEventListener('resize', calculateBreakpoint)

    return () => window.removeEventListener('resize', calculateBreakpoint)
  }, [])

  if (!homePage) {
    return <Skeleton />
  }

  const getResponsiveImages = (bp: string): string => {
    let index = breakpoints.indexOf(bp)

    while (index >= 0) {
      const currentBp = breakpoints[index]
      const images = homePage.data.attributes[name][currentBp]

      if (images && images.length > 0) {
        return currentBp
      }

      index -= 1
    }

    return breakpoints[0]
  }

  const images =
    homePage.data.attributes[name] &&
    homePage.data.attributes[name][getResponsiveImages(breakpoint)]

  return (
    <ConfigProvider theme={theme}>
      {images ? (
        <Carousel draggable={true} infinite={false} autoplay={true} arrows>
          {images.map((slide: any) => {
            return (
              <div key={slide.id}>
                <Link
                  href={slide.link && slide.link.href ? slide.link.href : ''}
                  target={
                    slide.link && slide.link.target ? slide.link.target : null
                  }
                >
                  <Image
                    src={slide.image.data.attributes.url}
                    alt={slide.image.data.attributes.alternativeText ?? ''}
                    width={100}
                    height={100}
                    sizes="100vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '400px',
                      minHeight: '400px',
                      objectFit: 'cover',
                    }}
                  />
                </Link>
              </div>
            )
          })}
        </Carousel>
      ) : (
        <Watermark
          content={['HAFBUY', 'Espacio publicitario']}
          style={{ width: '100%', height: 'auto' }}
        >
          <div style={{ width: '100%', height: '100px' }} />
        </Watermark>
      )}
    </ConfigProvider>
  )
}
