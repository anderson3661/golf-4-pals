import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {PLAYERS_ARRAY} from '../../utilities/constants';            //Used for looping purposes only
import * as helpers from '../../utilities/helper-functions/helpers';

import './nearest-the-pins.css';


const NearestThePinsDisplay = (props) => {

    const {yearOfCompetition, ntps, ntpsTotals, winners} = props;
    
    return (
        <Fragment>
            <table>

                <thead>

                    <tr className="headings">
                        <th className="endSpacer"></th>
                        {yearOfCompetition === "All Years" && <th className="year">Year</th>}
                        <th className="roundNumber">Round</th>
                        <th className="dateOfRound">Date</th>
                        <th className="courseName">Course</th>
                        {PLAYERS_ARRAY.map((playerName, i) => <th key={i} className="names alignCenter">{playerName.toProperCase()}</th>)}
                        <th className="endSpacer"></th>
                    </tr>

                </thead>

                <tbody>

                    {ntps.map((round, loopRoundNumber) => {
                        return (
                            <Fragment key={loopRoundNumber}>
                                {yearOfCompetition === "All Years" && loopRoundNumber > 1 && round.roundNumber === 1 && <tr className="rowSpacer"><td>&nbsp;</td></tr>}

                                <tr key={round.roundNumber} className={round.isMajor ? "round major" : "round"}>
                                    <td className="endSpacer"></td>
                                    {yearOfCompetition === "All Years" && (round.roundNumber === 1 ? <td className="year">{round.yearOfCompetition}</td> : <td></td>)}
                                    <td className="roundNumber">{round.roundNumber}</td>
                                    <td className="dateOfRound">{round.dateOfRound}</td>
                                    <td className="courseName"><NavLink to={`/scorecard/${yearOfCompetition}/${round.roundNumber}`}>{ round.courseName }</NavLink></td>
                                    {round.ntps.map((x, i) => <td key={i} className="ntps">{helpers.allowDashForZero(x)}</td>)}
                                    <td className="endSpacer"></td>
                                </tr>
                            </Fragment>
                        )
                    })}

                    <tr className="totals alignCenter">
                        <td className="endSpacer"></td>
                        <td colSpan={yearOfCompetition === "All Years" ? "3" : "2"} className="majors"></td>
                        <td>Total</td>
                        {ntpsTotals.map((points, playerNumber) => (
                            <td key={playerNumber}><span className={winners.includes(PLAYERS_ARRAY[playerNumber]) ? "totals-winners" : ""}>{points}</span></td>)
                        )}
                        <td className="endSpacer"></td>
                    </tr>

                </tbody>

            </table>

            <p><span className="color-key-majors">Key: Major</span></p>

        </Fragment>
    )

}


NearestThePinsDisplay.propTypes = {
    winners: PropTypes.array.isRequired
}


export default NearestThePinsDisplay;