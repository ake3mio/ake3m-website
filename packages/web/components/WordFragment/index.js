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
      <div className="WordFragment" onMouseMove={this.nudgeLetters} onTouchMove={this.nudgeLetters}>
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

    for (let letter in letterConfig) {

      if (letterConfig.hasOwnProperty(letter)) {

        const config = letterConfig[letter];

        els.push(this.renderLetter(letter, config, index));

        index++
      }
    }

    return els
  }

  renderLetter (letter, config, index) {

    const translate = this.state.loaded
      ? this.getTranslate3d(config.translate3d)
      : 'none';

    return (
      <div
        key={letter + index}
        className="WordFragment__letter"
        onTransitionEnd={event => this.addLetterRef(event.target, config)}
        style={{ transform: `${translate} scale(${config.scale})` }}
      >
        {letter}
      </div>
    )
  }

  addLetterRef (letterEl, config) {

    this.letterRefs.push({
      element: letterEl,
      config,
      boundingRect: letterEl.getBoundingClientRect(),
    });
  }

  nudgeLetters = (event) => {

    const touches = event.changedTouches ? event.changedTouches[0] : event;

    if (this.letterRefs.length) {

      this.letterRefs.forEach(letterRef => {

        const isAtEnd = touches.clientX <=
          (letterRef.boundingRect.x + letterRef.boundingRect.width);
        const withinWidth = touches.clientX >= letterRef.boundingRect.x && isAtEnd;

        const isAtBottom = touches.clientY <=
          (letterRef.boundingRect.y + letterRef.boundingRect.height);

        const withinHeight = touches.clientY >= letterRef.boundingRect.y &&
          isAtBottom;

        if (withinWidth && withinHeight) {

          const t = Math.abs(touches.clientY -
            (letterRef.boundingRect.y + letterRef.boundingRect.height));

          const w = Math.abs(touches.clientX -
            (letterRef.boundingRect.x + letterRef.boundingRect.width));

          let y, x;
          if (t < letterRef.boundingRect.height / 2) {
            y = (letterRef.boundingRect.y - touches.clientY) * .25
          } else {
            y = (touches.clientY - letterRef.boundingRect.y) * .25
          }

          if (w < letterRef.boundingRect.width / 2) {
            x = (letterRef.boundingRect.x - touches.clientX) * .25
          } else {
            x = (touches.clientX - letterRef.boundingRect.x) * .25
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
