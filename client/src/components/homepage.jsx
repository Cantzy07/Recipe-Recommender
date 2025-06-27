import React from 'react';
import Navbar from './navbar';
import SelectButtons from './select_buttons';
import Cards from './card';

const Homepage = () => (
  <div className="home-wrapper">
    <div className="title">Recipe Recommender</div>
    <Cards/>
    <SelectButtons/>
    <Navbar/>
  </div>
);

export default Homepage;