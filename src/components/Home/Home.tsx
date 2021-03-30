import React from 'react';
import HeaderCarousel from '../HeaderCarousel/HeaderCarousel';
import ProductsSection from '../ProductsSection/ProductsSection';
import './Home.scss';

const Home: React.FC = () => (
  <div className="Home">
    <HeaderCarousel />
    <ProductsSection />
  </div>
);

export default Home;
