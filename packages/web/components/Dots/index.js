import React from 'react'
import './index.scss'

const range = Array.from({ length: 3 });

const Dots = () => {
  return (
    <div className="Dots">
      {range.map((_, index) => (
        <div className="Dots__dot" key={index}/>
      ))}
    </div>
  )
}

export default Dots
