import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import './ProductsSection.scss';

const ProductsSection: React.FC = () => {
  const filters = [
    'POPULAR',
    'NEW ARRIVALS',
    'BEST SELLERS',
    'SPECIAL OFFERS',
    'COMING SOON',
  ];
  const products = [
    {
      id: 0,
      imgUrl: `${process.env.PUBLIC_URL}/img/products/photo-1.png`,
      price: 89.99,
      name: 'MENS BLACK CASUAL TEE',
      description: 'Classic casual t-shirt for men on the move. 100% cotton.',
    },
    {
      id: 1,
      imgUrl: `${process.env.PUBLIC_URL}/img/products/photo-2.png`,
      price: 47.5,
      name: 'WOMENS WHITE CASUAL TEE',
      description: 'Classic casual t-shirt for women on the move. 100% cotton.',
    },
    {
      id: 2,
      imgUrl: `${process.env.PUBLIC_URL}/img/products/photo-3.png`,
      price: 89.99,
      oldPrice: 107,
      name: 'MENS BLUE CASUAL TEE',
      description: 'Classic casual t-shirt for men on the move. 100% cotton.',
    },
    {
      id: 3,
      imgUrl: `${process.env.PUBLIC_URL}/img/products/photo-4.png`,
      price: 69.95,
      name: 'MENS BLACK CASUAL TEE',
      description: 'Classic casual t-shirt for men on the move. 100% cotton.',
    },
    {
      id: 4,
      imgUrl: `${process.env.PUBLIC_URL}/img/products/photo-5.png`,
      price: 29.95,
      name: 'WOMENS BURNT ORANGE CASUAL TEE £29.95',
      description: 'Classic casual t-shirt for women on the move. 100% cotton.',
    },
    {
      id: 5,
      imgUrl: `${process.env.PUBLIC_URL}/img/products/photo-6.png`,
      price: 34.79,
      name: 'WOMENS BURNT BLACK CASUAL TEE',
      description: 'Classic casual t-shirt for women on the move. 100% cotton.',
    },
  ];

  const [localImagesURLs, setLocalImagesURLs] = useState<string[]>([]);
  const [hover, setHover] = useState(false);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [wasDragging, setWasDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const carouselRef = useRef<Carousel>(null);

  useEffect(() => {
    (async () => {
      const images = await Promise.all(
        products.map(async (product) => (await fetch(product.imgUrl)).blob())
      );
      const localImagesURLs = images.map((image) => URL.createObjectURL(image));
      setLocalImagesURLs(localImagesURLs);
    })();
  }, []);

  useEffect(() => {
    window.addEventListener('click', () => {
      setShowInfo(false);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <section className="Products">
      <hr />
      <div className="Products__filters">
        {filters.map((filter) => (
          <>
            <input
              className="filters__input"
              type="radio"
              name="filters"
              value={filter}
              id={filter}
            />
            <label className="filters__label" htmlFor={filter}>
              {filter}
            </label>
          </>
        ))}
      </div>
      <div
        className="products_carousel__wraper"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <div className="products_carousel__arrows">
          <button
            className="products_carousel__arrow products_carousel__arrow--prev"
            onClick={() => {
              carouselRef.current?.previous(1);
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className="products_carousel__arrow products_carousel__arrow--next"
            onClick={() => {
              carouselRef.current?.next(1);
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <Carousel
          className="products_carousel"
          ref={carouselRef}
          beforeChange={(nextSlide) => {
            setWasDragging(true);
            setShowInfo(false);

            if (windowWidth < 768) {
              let realSlideIndex;
              if (nextSlide <= 1)
                realSlideIndex = products.length - (2 - nextSlide);
              if (2 <= nextSlide && nextSlide < products.length + 2)
                realSlideIndex = nextSlide - 2;
              if (nextSlide == products.length + 2) realSlideIndex = 0;
              if (realSlideIndex !== undefined)
                setCurrentProductIndex(realSlideIndex);
            } else {
              let realSlideIndex;
              if (nextSlide < 4) realSlideIndex = nextSlide + 2;
              if (4 <= nextSlide && nextSlide < 4 + products.length)
                realSlideIndex = nextSlide - 4;
              if (4 + products.length <= nextSlide)
                realSlideIndex = nextSlide - (4 + products.length);
              if (realSlideIndex !== undefined)
                setCurrentProductIndex(realSlideIndex);
            }
          }}
          infinite
          autoPlay={!hover}
          showDots={false}
          arrows={false}
          responsive={{
            tablet: {
              breakpoint: { max: Infinity, min: 768 },
              items: 2,
            },
            mobile: {
              breakpoint: { max: 767, min: 0 },
              items: 1,
            },
          }}
        >
          {products.map((product, productIndex) => (
            <div
              onClick={(ev) => {
                ev.stopPropagation();
                setActiveProductIndex(productIndex);
                if (!wasDragging) setShowInfo(true);
                else setWasDragging(false);
              }}
              className={`products_carousel__product_card${
                showInfo && productIndex == activeProductIndex
                  ? ' products_carousel__product_card--active'
                  : ''
              }`}
            >
              <div className="product_card__image_wraper">
                <img
                  className="product_card__image"
                  src={localImagesURLs[productIndex]}
                  alt={`${product.name}`}
                />
              </div>
              <Link className="product_card__info_link" to="">
                <i className="product_card__info_icon fas fa-info-circle"></i>
              </Link>
              <div className="product_card__price">
                {product.oldPrice && (
                  <span>
                    <del>£{product.oldPrice}</del>{' '}
                  </span>
                )}
                <span>£{product.price}</span>
              </div>
              <div className="product_card__info">
                <h3 className="product_card__name">
                  {products[productIndex].name}
                </h3>
                <p className="product_card__description">
                  {products[productIndex].description}
                </p>
                <div className="product_card__icons">
                  <i className="product_card__icon fas fa-shopping-cart"></i>
                  <i className="product_card__icon fas fa-heart"></i>
                  <i className="product_card__icon fas fa-compress-alt"></i>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
        <div className="products_carousel__dots">
          {Array.from(Array(products.length).keys()).map((i) => (
            <button
              className={`products_carousel__dot${
                i === currentProductIndex
                  ? ' products_carousel__dot--active'
                  : ''
              }`}
              onClick={() => {
                const carousel = carouselRef.current;
                if (carousel) {
                  if (currentProductIndex < i) {
                    carousel.next(i - currentProductIndex);
                  } else if (currentProductIndex > i) {
                    carousel.previous(currentProductIndex - i);
                  }
                }
              }}
            ></button>
          ))}
        </div>
      </div>
      <div className="products_columns">
        {Array.from(Array(products.length / 3).keys()).map((columnIndex) => (
          <div className="products_column">
            {products
              .slice(columnIndex, columnIndex + 3)
              .map((product, indexInSclice) => {
                const productIndex = columnIndex * 3 + indexInSclice;
                const isColumnOdd = (columnIndex + 1) % 2;
                const isColumnEven = !isColumnOdd;
                const isFirstInColumn = indexInSclice === 0;
                const isLastInColumn = indexInSclice === 2;
                const isCardBig =
                  (isColumnOdd && isLastInColumn) ||
                  (isColumnEven && isFirstInColumn);
                return (
                  <div
                    className={`product_card__wraper${
                      isCardBig ? ' product_card__wraper--big' : ''
                    }`}
                  >
                    <div
                      className={`products_carousel__product_card${
                        showInfo && productIndex === currentProductIndex
                          ? ' products_carousel__product_card--active'
                          : ''
                      }`}
                    >
                      <img
                        className="product_card__image"
                        src={localImagesURLs[productIndex]}
                        alt={`${product.name}`}
                      />
                      <div className="product_card__price">
                        {product.oldPrice && (
                          <span>
                            <del>£{product.oldPrice}</del>{' '}
                          </span>
                        )}
                        <span>£{product.price}</span>
                      </div>
                      <div className="product_card__info">
                        <div className="info__content">
                          <h3 className="product_card__name">
                            {products[productIndex].name}
                          </h3>
                          <p className="product_card__description">
                            {products[productIndex].description}
                          </p>
                          <div className="product_card__icons">
                            <i className="product_card__icon fas fa-shopping-cart"></i>
                            <i className="product_card__icon fas fa-heart"></i>
                            <i className="product_card__icon fas fa-compress-alt"></i>
                          </div>
                        </div>
                        <Link className="product_card__info_link" to="">
                          <i className="product_card__info_icon fas fa-info-circle"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
      <hr />
    </section>
  );
};

export default ProductsSection;
