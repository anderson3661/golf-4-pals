import React, { Component } from 'react';

import './not-mobile-friendly.scss';


class NotMobileFriendly extends Component {

    render() {
        return (
            <div className="message">
                <p>This app is currently only designed to work on larger screens</p>
                <p>(i.e. iPad in landscape mode or larger)</p>
            </div>
        )
    }
}

export default NotMobileFriendly;