import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='main-footer'>
      <div className='copyrights'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 col-sm-12 text-sm-center text-md-left'>
              <p>&copy; 2021. All rights reserved.</p>
            </div>
            <div className='col-md-6 col-sm-12 text-sm-center text-md-right'>
              <ul className='footer-nav'>
                <li>
                  <Link to='/privacy-statement'>Privacy</Link>
                </li>
                <li>
                  <Link to='/terms-of-use'>Terms of Use</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
