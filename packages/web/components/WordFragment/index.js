import React, { Component } from 'react'
import './index.scss'
import throttle from 'lodash/throttle'

const fontSize = 150

class WordFragment extends Component {

  rootRef = React.createRef()
  yPosition = 1
  lastY = 0

  render () {
    return (
      <div className="WordFragment" ref={this.rootRef}>
        <div className="WordFragment__letter">A</div>
        <div className="WordFragment__letter">K</div>
        <div className="WordFragment__letter">e</div>
        <div className="WordFragment__letter">3</div>
        <div className="WordFragment__letter">M</div>
      </div>
    )
  }

  componentDidMount () {

    // this.initLetters()
    // this.onResize = throttle(this.onResize, 0)
    // window.addEventListener('resize', this.onResize, { passive: true })
  }

  componentWillUnmount () {
    // window.removeEventListener('resize', this.onResize)
    // cancelAnimationFrame(this.animationLoop)
  }

  initLetters = () => {

    const current = this.rootRef.current
    const { width, height } = current.getBoundingClientRect()

    const word = 'AKe3M'

    requestAnimationFrame(() => {

      word.split('').forEach((letter) => {

        const element = document.createElement('div')

        element.classList.add('WordFragment__letter')

        element.innerText = letter

        this.setElementLocation(element, width, height)

        current.appendChild(element)
      })
    })
  }

  getScale () {
    const scales = [.4, 1]
    const index = Math.floor(Math.random() * 2)
    return scales[index]
  }

  onResize = () => {

    const current = this.rootRef.current

    requestAnimationFrame(() => {
      const { width, height } = current.getBoundingClientRect()

      let letterEls = current.getElementsByClassName('WordFragment__letter')

      for (let i = 0; i < letterEls.length; i++) {
        const element = letterEls[i]
        this.setElementLocation(element, width, height)
      }
    })
  }

  setElementLocation (element, width, height) {

    const left = this.clamp(width, fontSize / 2)
    const top = this.clamp(height)

    element.style.transform = `translate3d(${left}px, ${top}px, 0) scale(${this.getScale()})`
  }

  clamp (max, offset = fontSize) {
    return Math.max(offset,
      Math.min(max, Math.floor(Math.random() * max) - offset))
  }
}

export default WordFragment
