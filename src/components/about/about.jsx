import React from "react";

import {HOSTING_SITE} from '../../utilities/constants';

import "./about.scss";


const About = () => {
    return (

        <div className="stats-outer">

            <div className="container-main-content-about">

                <header className="container-card header">
                    <h1>About this application</h1>
                </header>

                <div className="container-about">

                    <div className="container-card">
                        <h2>Technologies Used</h2>
                        <ul>
                            <li>React.js 16</li>
                            <li>React Router</li>
                            <li>Redux</li>
                            <li>Material-UI</li>
                            <li>ApexCharts.js</li>
                            <li>SCSS (CSS preprocessor)</li>
                            <li>HTML5</li>
                            <li>CSS3 Flexbox and Grid</li>
                            <li>Code Splitting</li>
                            <li>Browser local storage for persisting data</li>
                        </ul>
                    </div>

                    <div className="container-about-inner">

                        <div className="container-card">
                            <h2>Hosting</h2>
                            <p>It is hosted on Google's Firebase:</p>
                            <ul>
                                <li>
                                    <a
                                        href={HOSTING_SITE}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                    Hosting Site
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;