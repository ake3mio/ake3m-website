import React, { Component } from 'react'
import './index.scss'
import LetterConfig from './LetterConfig'

class WordFragment extends Component {

  rootRef = React.createRef()
  state = {
    loaded: false,
  }

  render () {
    return (
      <div className="WordFragment" ref={this.rootRef}>
        {this.renderLetters(LetterConfig)}
      </div>
    )
  }

  componentDidMount () {
    this.setComponentLoaded()
  }

  setComponentLoaded () {
    this.setState({ loaded: true })
  }

  renderLetters (letterConfig) {

    const els = []

    let index = 0

    for (let letter in letterConfig) {

      if (letterConfig.hasOwnProperty(letter)) {

        const config = letterConfig[letter]

        els.push(this.renderLetter(letter, config, index))

        index++
      }
    }

    return els
  }

  renderLetter (letter, config, index) {

    const translate = this.state.loaded
      ? this.getTranslate3d(config.translate3d)
      : 'none'

    return (
      <div
        key={letter + index}
        className="WordFragment__letter"
        style={{ transform: `${translate} scale(${config.scale})` }}
      >
        {letter}
      </div>
    )
  }

  getTranslate3d (translate3d) {
    return `translate3d(${translate3d[0]}, ${translate3d[1]}, ${translate3d[2]})`
  }

}

export default WordFragment
