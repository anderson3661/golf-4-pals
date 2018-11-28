import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {PLAYERS_ARRAY} from '../../utilities/constants';            //Used for looping purposes only
import * as helpers from '../../utilities/helper-functions/helpers';

import './courses-summary.scss';


const CoursesSummaryDisplay = (props) => {

    const {grandTotals, winsByCourse} = props;

    const winners = helpers.getPositionsOfTotals(grandTotals.numberOfWinsTotals);

    return ( 

        <table>

            <thead>

                <tr className="headings main">
                    <th className="endSpacer"></th>
                    <th className="courseName">Course</th>
                    <th className="roundsPlayed" rowSpan="2">Rounds Played</th>
                    <th className="majorsPlayed" rowSpan="2">Majors Played</th>
                    <th className="spacer"></th>
                    <th colSpan="4" className="headings">Wins</th>
                    <th className="spacer"></th>
                    <th colSpan="4" className="headings">Wins in Majors</th>
                    <th className="spacer"></th>
                    <th className="bestplayers">Best Player(s)</th>
                    <th className="endSpacer"></th>
                </tr>

                <tr className="headings players">
                    <th className="endSpacer"></th>
                    <th colSpan="4"></th>
                    {PLAYERS_ARRAY.map((player, i) => (<th key={i} className="namesSubHeading alignCenter">{helpers.getAbbreviatedNameForHeading(player)}</th>))}
                    <th className="spacer"></th>
                    {PLAYERS_ARRAY.map((player, i) => (<th key={i} className="namesSubHeading alignCenter">{helpers.getAbbreviatedNameForHeading(player)}</th>))}
                    <th className="spacer"></th>
                    <th className="bestplayers"></th>
                    <th className="endSpacer"></th>
                </tr>

            </thead>

            <tbody>
                
                {winsByCourse.map((course, i) => {

                    return (
                        <tr key={i} className="course">
                            <td className="endSpacer"></td>
                            <td className="courseName"><NavLink to={`/sbc/${course.courseName}`}>{ course.courseName }</NavLink></td>
                            <td className="roundsPlayed">{course.roundsPlayed}</td>
                            <td className="majorsPlayed">{helpers.allowDashForZero(course.majorsPlayed)}</td>
                            <td className="spacer"></td>
                            {PLAYERS_ARRAY.map((player, playerNumber) => (
                                <td key={playerNumber} className="wins">
                                    <span className={course.roundsPlayed && helpers.getPositionsOfTotals(course.wins).includes(PLAYERS_ARRAY[playerNumber]) ? "totals-winners" : ""}>
                                        {helpers.allowDashForZero(course.wins[playerNumber])}
                                    </span>
                                </td>
                            ))}
                            <td className="spacer"></td>
                            {PLAYERS_ARRAY.map((player, playerNumber) => (
                                <td className="winsInMajors" key={playerNumber}>
                                    {helpers.allowDashForZero(course.winsInMajors[playerNumber])}
                                </td>
                            ))}
                            <td className="spacer"></td>
                            <td className="bestPlayers">
                                {PLAYERS_ARRAY.map((player, playerNumber) => {
                                    return course.roundsPlayed > 0 && helpers.getPositionsOfTotals(course.wins).includes(PLAYERS_ARRAY[playerNumber]) &&
                                        <img key={playerNumber} className="img-winners" src={helpers.getPlayerImage(player)} alt="" />
                                })}
                            </td>
                            <td className="endSpacer"></td>
                        </tr>
                    )
                })}

                <tr className="totalsRow alignCenter summary">
                    <td className="endSpacer"></td>
                    <td className="totalsLabel">Total&nbsp;&nbsp;&nbsp;({winsByCourse.length})</td>
                    <td className="roundsPlayed">{grandTotals.roundsPlayed}</td>
                    <td className="majorsPlayed">{grandTotals.majorsPlayed}</td>
                    <td className="spacer"></td>
                    {grandTotals.numberOfWinsTotals.map((numberOfWins, playerNumber) => (
                        <td key={playerNumber}>
                            <span className={winners.includes(PLAYERS_ARRAY[playerNumber]) ? "totals-winners" : ""}>
                                {numberOfWins}
                            </span>
                        </td>)
                    )}
                    <td className="spacer"></td>
                    {grandTotals.numberOfWinsInMajorsTotals.map((numberOfWinsInMajors, playerNumber) => (
                        <td key={playerNumber}>
                            <span className={winners.includes(PLAYERS_ARRAY[playerNumber]) ? "totals-winners" : ""}>
                                {numberOfWinsInMajors}
                            </span>
                        </td>)
                    )}
                    <td className="spacer"></td>
                    <td></td>
                    <td className="endSpacer"></td>
                </tr>

            </tbody>

        </table>

    )

}


CoursesSummaryDisplay.propTypes = {
    grandTotals: PropTypes.object.isRequired,
    winsByCourse: PropTypes.array.isRequired
}


export default CoursesSummaryDisplay;