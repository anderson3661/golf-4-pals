import React from 'react';
import { NavLink } from 'react-router-dom';

import './footer.scss';
import './common.scss';


const Footer = () => {
    return (
        <nav>
        <footer>
            {/* <div className="links">
                <div><NavLink to="/help" className="nav-link" activeClassName="active-link">Help</NavLink></div>
                <div><NavLink to="/contact" className="nav-link" activeClassName="active-link">Contact</NavLink></div>
                <div><NavLink to="/about" className="nav-link" activeClassName="active-link">About this application</NavLink></div>
            </div> */}
            <ul>
                <li><NavLink to="/help" className="nav-link" activeClassName="active-link">Help</NavLink></li>
                <li><NavLink to="/contact" className="nav-link" activeClassName="active-link">Contact</NavLink></li>
                <li><NavLink to="/about" className="nav-link" activeClassName="active-link">About this application</NavLink></li>
            </ul>
            &copy; Martin Anderson 2018
        </footer>
        </nav>
    );
};

export default Footer;