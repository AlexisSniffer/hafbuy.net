import React from 'react'
import { Carousel } from 'antd'

export default function HomePage() {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '350px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }

  const onChange = (currentSlide: number) => {
    console.log(currentSlide)
  }

  return (
    <>
      <Carousel afterChange={onChange}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </>
  )
}
