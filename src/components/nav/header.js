import React from 'react';
import { NavLink } from 'react-router-dom';

import {APP_TITLE} from '../../utilities/constants';

import './header.scss';
import './common.scss';


const Header = () => {
    return (
        <nav>
            <div className="main-heading">
                <div className="title-nav">{APP_TITLE} {process.env.REACT_APP_APP_TITLE_SUFFIX}</div>
            </div>

            <div className="main-nav">
                <ul>
                    <li><NavLink to="/home" className="nav-link" activeClassName="active-link">Home</NavLink></li>
                    <li><NavLink to="/oom" className="nav-link" activeClassName="active-link">Order of Merit</NavLink></li>
                    <li><NavLink to="/sots" className="nav-link" activeClassName="active-link">Story of the Season</NavLink></li>
                    <li><NavLink to="/playerprofiles" className="nav-link" activeClassName="active-link">Player Profiles</NavLink></li>

                    <li className="nav-child">Statistics
                        <div className="nav-child-content">
                            <NavLink to="/coursessummary" activeClassName="active-link"><span>Courses Summary</span></NavLink>
                            <NavLink to="/sbc" activeClassName="active-link">Scores By Course</NavLink>
                            <NavLink to="/sbh" activeClassName="active-link"><span>Scores By Hole</span></NavLink>
                            <NavLink to="/ntps" activeClassName="active-link">Nearest the Pins</NavLink>
                        </div>
                    </li>

                    <li className="nav-child">Administration
                        <div className="nav-child-content">
                            <NavLink to="/newcourse" activeClassName="active-link">New Course</NavLink>
                            <NavLink to="/editcourse" activeClassName="active-link">Edit Course</NavLink>
                            <NavLink to="/deletecourse" activeClassName="active-link">Delete Course</NavLink>
                            <NavLink to="/newround" activeClassName="active-link">New Round</NavLink>
                            <NavLink to="/editround" activeClassName="active-link">Edit Round</NavLink>
                            <NavLink to="/deleteround" activeClassName="active-link">Delete Round</NavLink>
                            <NavLink to="/admin" activeClassName="active-link">Reset App</NavLink>
                        </div>
                    </li>

                    {/* {TESTING_MODE && <li><NavLink to="/test" className="nav-link" activeClassName="active-link">Test</NavLink></li>} */}

                </ul>
            </div>
        </nav>
    );
};

export default Header;