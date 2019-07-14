import React, { Component } from 'react'
import './index.scss'
import LetterConfig from './LetterConfig'

class WordFragment extends Component {

  state = {
    loaded: false,
  };

  letterRefs = [];

  render () {
    return (
      <div className="WordFragment" onMouseMove={this.nudgeLetters}>
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

    const els = [];

    let index = 0;

    this.letterRefs = [];

    const letterCount = Object.keys(letterConfig).length;

    for (let letter in letterConfig) {

      if (letterConfig.hasOwnProperty(letter)) {

        const config = letterConfig[letter];

        els.push(this.renderLetter(letter, config, index, letterCount));

        index++
      }
    }

    return els
  }

  renderLetter (letter, config, index, letterCount) {

    const translate = this.state.loaded
      ? this.getTranslate3d(config.translate3d)
      : 'none';

    return (
      <div
        key={letter + index}
        className="WordFragment__letter"
        onTransitionEnd={event => this.addLetterRef(event.target, config,
          letterCount)}
        style={{ transform: `${translate} scale(${config.scale})` }}
      >
        {letter}
      </div>
    )
  }

  addLetterRef (letterEl, config, letterCount) {

    this.letterRefs.push({
      element: letterEl,
      config,
      boundingRect: letterEl.getBoundingClientRect(),
    });
  }

  nudgeLetters = (event) => {

    if (this.letterRefs.length) {

      this.letterRefs.forEach(letterRef => {

        const isAtEnd = event.clientX <=
          (letterRef.boundingRect.x + letterRef.boundingRect.width);
        const withinWidth = event.clientX >= letterRef.boundingRect.x && isAtEnd;

        const isAtBottom = event.clientY <=
          (letterRef.boundingRect.y + letterRef.boundingRect.height);

        const withinHeight = event.clientY >= letterRef.boundingRect.y &&
          isAtBottom;

        if (withinWidth && withinHeight) {

          const t = Math.abs(event.clientY -
            (letterRef.boundingRect.y + letterRef.boundingRect.height));

          const w = Math.abs(event.clientX -
            (letterRef.boundingRect.x + letterRef.boundingRect.width));

          let y, x;
          if (t < letterRef.boundingRect.height / 2) {
            y = (letterRef.boundingRect.y - event.clientY) * .25
          } else {
            y = (event.clientY - letterRef.boundingRect.y) * .25
          }

          if (w < letterRef.boundingRect.width / 2) {
            x = (letterRef.boundingRect.x - event.clientX) * .25
          } else {
            x = (event.clientX - letterRef.boundingRect.x) * .25
          }

          letterRef.element.style.top = `${y}px`;
          letterRef.element.style.left = `${x}px`

        } else {
          letterRef.element.style.top = '0';
          letterRef.element.style.left = '0'
        }
      })
    }
  };

  getTranslate3d (translate3d) {
    return `translate3d(${translate3d[0]}, ${translate3d[1]}, ${translate3d[2]})`
  }

}

export default WordFragment
