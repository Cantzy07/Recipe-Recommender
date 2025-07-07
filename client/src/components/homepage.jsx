import React, { useState } from 'react';
import SelectButtons from './select_buttons';
import Cards from './card';
import './homepage.css';
import chefHat from '../icons/icons8-chef-hat-48.png';

export default function Homepage() {
  const [swipeDirection, setSwipeDirection] = useState(null);
  const handleSwipeComplete = () => setSwipeDirection(null);

  return (
    <div className="home-wrapper">
      <div className="header">
        <div className="logo-icon">
          <img className='chef' src={chefHat} alt="chef-hat"/>
        </div>
          <h1 className='title'>Recipe Recommender</h1>
      </div>
      <Cards swipeDirection={swipeDirection} onSwipeComplete={handleSwipeComplete}/>
      <SelectButtons onSwipe={setSwipeDirection}/>
    </div>
  )
};