import { Carousel } from 'antd'

const sliderStyle: React.CSSProperties = {
  margin: 0,
  height: '350px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

const CoverSlider = () => {
  return (
    <Carousel autoplay={true}>
      <div>
        <h3 style={sliderStyle}>Espacio Publicitario #1</h3>
      </div>
      <div>
        <h3 style={sliderStyle}>Espacio Publicitario #2</h3>
      </div>
      <div>
        <h3 style={sliderStyle}>Espacio Publicitario #3</h3>
      </div>
      <div>
        <h3 style={sliderStyle}>Espacio Publicitario #4</h3>
      </div>
    </Carousel>
  )
}

export default CoverSlider
