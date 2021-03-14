import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import clip from '../../img/Clip.png';
import './HeaderSlider.scss';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';

const HeaderSlider: React.FC = () => (
  <div className="HeaderSlider">
    <Carousel
      showArrows={false}
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      swipeable={true}
      emulateTouch={true}
      autoPlay={true}
    >
      <div className="HeaderSlider__slide">
        <img src={clip} alt="man wearing an AVENUE shirt" />
        <Link className="HeaderSlider__button" to="">
          SHOP MEN’S COLLECTION
        </Link>
      </div>
      <div className="HeaderSlider__slide">
        <img src={clip} alt="man wearing an AVENUE shirt" />
        <Link className="HeaderSlider__button" to="">
          SHOP MEN’S COLLECTION
        </Link>
      </div>
    </Carousel>
  </div>
);

export default HeaderSlider;
