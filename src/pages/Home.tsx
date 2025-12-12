import React from 'react'
import NewsLetterBox from '../components/NewsLetterBos'
import Testimonial from '../components/Testimonial'
import LandingPage from '../components/LandingPage'

const Home: React.FC = () => {
  return (
    <div>
      <LandingPage />
      <Testimonial />
      <NewsLetterBox />
    </div>
  )
}

export default Home