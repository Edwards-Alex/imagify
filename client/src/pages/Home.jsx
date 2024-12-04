import React from 'react'
import Header from '../components/Header'
import Step from '../components/Step'
import Description from '../components/Description'
import Testmonials from '../components/Testmonials'
import GenerateBtn from '../components/GenerateBtn'

const Home = () => {
  return (
    <div>
      <Header/>
      <Step />
      <Description />
      <Testmonials />
      <GenerateBtn />
    </div>
  )
}

export default Home
