import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {PLAYERS_ARRAY} from '../../utilities/constants';            //Used for looping purposes only
import * as helpers from '../../utilities/helper-functions/helpers';

import './order-of-merit.css';

const OrderOfMeritHeader = (props) => {

    const {includeYearOfCompetition} = props;

    return (

        <thead>

            <tr className="headings main">
                <th className="endSpacer"></th>
                {includeYearOfCompetition && <th className="yearOfCompetition" rowSpan="2">Year Of Competition</th>}
                <th className="roundNumber">Round</th>
                <th className="dateOfRound">Date</th>
                <th className="courseName">Course</th>
                <th></th>
                <th colSpan="4" className="headings">OOM Points</th>
                <th></th>
                <th colSpan="4" className="headings">Stableford Score</th>
                <th></th>
                <th colSpan="4" className="headings">Position</th>
                <th></th>
                <th colSpan="4" className="headings">Handicap</th>
                <th className="endSpacer"></th>
            </tr>

            <tr className="headings players">
                <th colSpan={includeYearOfCompetition ? "5" : "4"}></th>
                {PLAYERS_ARRAY.map((player, i) => {
                    return (
                        <Fragment key={i}>
                            <th className="spacer"></th>
                            {PLAYERS_ARRAY.map((playerName, j) => <th key={j} className={`namesSubHeading ${i===0 ? "alignRight" : "alignCenter"}`}>{helpers.getAbbreviatedNameForHeading(playerName)}</th>)}
                        </Fragment>
                    )
                })}
                <th className="endSpacer"></th>
            </tr>

        </thead>
            
    )

}


OrderOfMeritHeader.propTypes = {
    includeYearOfCompetition: PropTypes.bool.isRequired
}


export default OrderOfMeritHeader;