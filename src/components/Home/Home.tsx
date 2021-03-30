import React from 'react';
import HeaderCarousel from '../HeaderCarousel/HeaderCarousel';
import LookbooksSection from '../LookbooksSection/LookbooksSection';
import ProductsSection from '../ProductsSection/ProductsSection';
import './Home.scss';

const Home: React.FC = () => (
  <div className="Home">
    <HeaderCarousel />
    <ProductsSection />
    <LookbooksSection />
  </div>
);

export default Home;
