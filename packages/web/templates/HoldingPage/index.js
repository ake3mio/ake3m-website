import React from 'react'
import './styles/index.scss'
import Logo from '../../components/Logo'
import WordFragment from '../../components/WordFragment'

const HoldingPage = () => {
  return (
    <div className="HoldingPage">
      <WordFragment/>
      <h1 className="HoldingPage__header">
        <span className="HoldingPage__header-text">Ake3m</span>
        <Logo/>
      </h1>
      <h2 className="HoldingPage__sub-header">Site Under Construction</h2>
    </div>
  )
};

export default HoldingPage
