import { Carousel } from 'antd'
import useSWR from 'swr'
import { qsSlider } from '../../../store/queries/sliders'

const sliderStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const CoverSlider = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/advertising?${qsSlider()}`,
    fetcher
  )

  return (
    <>
      <Carousel autoplay={true} adaptiveHeight={true}>
        {data?.data.attributes.slider.map((slider: any) => {
          const xs = slider.responsive.find(
            (item: any) => item.responsive === 'xs'
          )
          const sm = slider.responsive.find(
            (item: any) => item.responsive === 'sm'
          )
          const md = slider.responsive.find(
            (item: any) => item.responsive === 'md'
          )
          const lg = slider.responsive.find(
            (item: any) => item.responsive === 'lg'
          )

          return (
            <div key={slider.id}>
              <picture>
                {xs != undefined ? (
                  <source
                    media="(max-width: 576px)"
                    srcSet={xs.slider.data.attributes.url}
                  />
                ) : null}
                {sm != undefined ? (
                  <source
                    media="(max-width: 768px)"
                    srcSet={sm.slider.data.attributes.url}
                  />
                ) : null}
                {md != undefined ? (
                  <source
                    media="(max-width: 992px)"
                    srcSet={md.slider.data.attributes.url}
                  />
                ) : null}
                {lg != undefined ? (
                  <source
                    media="(max-width: 999999999px)"
                    srcSet={lg.slider.data.attributes.url}
                  />
                ) : null}

                <img src="" alt={slider.alt} style={sliderStyle} />
              </picture>
            </div>
          )
        })}
      </Carousel>
    </>
  )
}

export default CoverSlider
