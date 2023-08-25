import React from 'react'
import rentCategory from '../assets/jpg/rentCategoryImage.jpg'
import sellCategory from '../assets/jpg/sellCategoryImage.jpg'
import { Link } from 'react-router-dom'
import Slider from '../components/Slider'
const Explore = () => {
  return (
    <div className='explore'>
        <header>
          <p className="pageHeader">
              Explore
          </p>
        </header>

        <main className='exploreMain'>
          <Slider/> 
          <p className="exploreCategoryHeading">
              Categories 
          </p>
          <div className="exploreCategories">
            <Link to='/category/rent'>
              <img src={rentCategory} alt="rent" className='exploreCategoryImg' />
              <p className="exploreCategoryName">Rent</p>
            </Link>
            <Link to='/category/sale'>
              <img src={sellCategory} alt="sell" className='exploreCategoryImg' />
              <p className="exploreCategoryName">Sale</p>

            </Link>
          </div>
        </main>
    </div>
  )
}

export default Explore