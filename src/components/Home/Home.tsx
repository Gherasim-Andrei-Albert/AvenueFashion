import React from 'react';
import HeaderCarousel from '../HeaderCarousel/HeaderCarousel';
import Products from '../Products/Products';
import './Home.scss';

const Home: React.FC = () => (
  <div className="Home">
    <HeaderCarousel />
    <Products />
  </div>
);

export default Home;
