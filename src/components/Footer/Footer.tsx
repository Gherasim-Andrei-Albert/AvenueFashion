import React from 'react';
import FooterDropdown from '../FooterDropdown/FooterDropdown';
import { Container } from 'react-bootstrap';
import './Footer.scss';

const Footer: React.FC = () => (
  <footer className="Footer">
    <Container className="Footer__container">
      {[
        {
          toggler: 'INFORMATION',
          links: [
            'The brand',
            'Local stores',
            'Customer service',
            'Privacy & cookies',
            'Site map',
          ],
        },
        {
          toggler: 'WHY BUY FROM US',
          links: [
            'Shipping & returns)',
            'Secure shopping',
            'Testimonials',
            'Award winning',
            'Ethical trading',
          ],
        },
        {
          toggler: 'YOUR ACCOUNT',
          links: [
            'Sign in',
            'Register',
            'View cart',
            'View your lookbook',
            'Track an order',
            'Update information',
          ],
        },
        {
          toggler: 'LOOKBOOK',
          links: [
            'Latest posts',
            'Men’s lookbook',
            'Women’s lookbook',
            'Lookbooks RSS feed',
            'View your lookbook',
            'Delete your lookbook',
          ],
        },
      ].map((dropdownData) => (
        <FooterDropdown toggler={dropdownData.toggler}>
          {dropdownData.links.map((link) => (
            <a className="FooterDropdown__link" href="">
              {link}
            </a>
          ))}
        </FooterDropdown>
      ))}
      <FooterDropdown toggler="CONTACT DETAILS">
        <p className="Footer__contact_info">
          Head Office: Avenue Fashion, 180-182 Regent Street, London.
        </p>
        <p className="Footer__contact_info">
          Telephone:{' '}
          <a className="FooterDropdown__link" href="tel:0123456789">
            0123-456-789
          </a>{' '}
        </p>
        <p className="Footer__contact_info">
          Email:{' '}
          <a
            className="FooterDropdown__link"
            href="mailto:support@yourwebsite.com"
          >
            support@yourwebsite.com
          </a>
        </p>
      </FooterDropdown>
    </Container>
    <Container className="Footer__banners">
      <div className="Footer__banner Footer__award">
        AWARD WINNER <br /> FASHION AWARDS 2016
      </div>
      <div className="Footer__banner Footer__social">
        <i className="Footer__social_icon fab fa-facebook-f"></i>
        <i className="Footer__social_icon fab fa-twitter"></i>
        <i className="Footer__social_icon fab fa-instagram"></i>
        <i className="Footer__social_icon fab fa-pinterest-p"></i>
      </div>
    </Container>
    <div className="Footer__copyright">
      <Container className="copyright__container">
        <p className="copyright__info">© 2016 Avenue Fashion™</p>
        <p className="copyright__info">Design by RobbyDesigns.com</p>
        <p className="copyright__info">Dev by Loremipsum.com</p>
      </Container>
    </div>
  </footer>
);

export default Footer;
