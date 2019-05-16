import React, { Component } from 'react'
import Logo from '../components/Logo'
import WordFragment from '../components/WordFragment'

class Index extends Component {
  render () {
    return (
      <div className="holding-page">
        <WordFragment/>
        <h1 className="holding-page__header">
          <span className="holding-page__header-text">Ake3m</span>
          <Logo/>
        </h1>
        <h2 className="holding-page__sub-header">Site Under Construction</h2>
      </div>
    )
  }
}

export default Index
