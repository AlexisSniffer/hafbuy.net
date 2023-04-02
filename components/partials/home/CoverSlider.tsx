import { Carousel } from 'antd'
import Image from 'next/image'

const sliderStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  margin: 0,
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  background: '#1677ff',
}

const CoverSlider = () => {
  return (
    <Carousel autoplay={true}>
      <div>
        <div style={sliderStyle}>
          <img src="/images/image0.jpeg" alt="publicidad-1" />
        </div>
      </div>
      <div>
        <div style={sliderStyle}>
          <img src="/images/image1.jpeg" alt="publicidad-2" />
        </div>
      </div>
    </Carousel>
  )
}

export default CoverSlider
