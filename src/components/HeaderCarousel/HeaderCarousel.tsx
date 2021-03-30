import React, { useState } from 'react';
import clip from '../../img/Clip.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './HeaderCarousel.scss';
import { Link } from 'react-router-dom';

const HeaderCarousel: React.FC = () => (
  <div className="HeaderCarousel__wraper">
    <Carousel
      className="HeaderCarousel"
      responsive={{
        all: {
          breakpoint: { max: Infinity, min: 0 },
          items: 1,
        },
      }}
      infinite
      autoPlay={true}
      arrows={false}
    >
      {Array.from(Array(3).keys()).map((i) => (
        <div className="HeaderCarousel__slide">
          <img
            className="HeaderCarousel__img"
            src={clip}
            alt="man wearing an AVENUE shirt"
          />
          <Link className="HeaderCarousel__button" to="">
            SHOP MEN’S COLLECTION
          </Link>
        </div>
      ))}
    </Carousel>
  </div>
);

export default HeaderCarousel;
