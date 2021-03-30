import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../img/REPLACE.png';
import img2 from '../../img/woman_photo.png';
import img3 from '../../img/photo silhouette.png';
import './LookbooksSection.scss';

const LookbooksSection: React.FC = () => {
  class LookbookData {
    title: string;
    description: JSX.Element;
    img: string;
    constructor(title: string, description: JSX.Element, img: string) {
      this.title = title;
      this.description = description;
      this.img = img;
    }
  }

  return (
    <section className="LookbooksSection">
      {[
        new LookbookData(
          'MEN’S LOOKBOOK',
          (
            <>
              Lorem ipsum dolor sit amet eras facilisis consectetur adipiscing
              elit lor, integer lorem consecteur dignissim laciniqui.
              <br />
              Elementum metus facilisis ut phasellu.
            </>
          ),
          img1
        ),
        new LookbookData(
          'WOMEN’S LOOKBOOK',
          (
            <>
              Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames.
              <br />
              Pellentesque laoreet quis enim et mattis.
              <br />
              Quisque interdum felis tellus.
            </>
          ),
          img2
        ),
        new LookbookData(
          'YOUR LOOKBOOK',
          (
            <>
              See an item you like and click the{' '}
              <i className="far fa-heart"></i> button to add it to your lookbook
              where you can create your own perfect look.
              <br />
              It’s like your own boutique!
            </>
          ),
          img3
        ),
      ].map((lookbookData) => (
        <div className="lookbook_card">
          <img src={lookbookData.img} alt="" className="lookbook_card__img" />
          <div className="lookbook_card__content">
            <h1 className="lookbook_card__title">
              {lookbookData.title
                .split(' ')
                .map((word, wordIndex) =>
                  wordIndex === 0 ? (
                    <span className="lookbook_card__title_decoration">
                      {word}{' '}
                    </span>
                  ) : (
                    word
                  )
                )}
            </h1>
            <p className="lookbook_card__description">
              {lookbookData.description}
            </p>
            <Link className="lookbook_card__link" to="">
              VIEW NOW
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default LookbooksSection;
