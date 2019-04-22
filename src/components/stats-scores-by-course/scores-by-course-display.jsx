import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {PLAYERS_ARRAY} from '../../utilities/constants';            //Used for looping purposes only
import * as helpers from '../../utilities/helper-functions/helpers';

import WinnerStar from '@material-ui/icons/Star';


const ScoresByCourseDisplay = (props) => {

    const {numberOfWinsTotals, scoresByCourse} = props;

    const winners = helpers.getPositionsOfTotals(numberOfWinsTotals);

    return ( 

        <Fragment>

            <table>

                <thead>

                    <tr className="headings main">
                        <th className="endSpacer"></th>
                        <th className="yearOfCompetition" rowSpan="2">Year of Competition</th>
                        <th className="dateOfRound">Date</th>
                        <th className="spacer"></th>
                        <th className="courseName">Course</th>
                        <th className="spacer"></th>
                        <th colSpan="4" className="headings">OOM Points</th>
                        <th className="spacer"></th>
                        <th colSpan="4" className="headings">Stableford Score</th>
                        <th className="spacer"></th>
                        <th colSpan="4" className="headings">Position</th>
                        <th className="spacer"></th>
                        <th colSpan="4" className="headings">Handicap</th>
                        <th className="endSpacer"></th>
                    </tr>

                    <tr className="headings players">
                        <th colSpan="5"></th>
                        {PLAYERS_ARRAY.map((player, i) => {
                            return (
                                <Fragment key={i}>
                                    <th></th>
                                    {PLAYERS_ARRAY.map((player, j) => <th key={j} className={`namesSubHeading ${i===0 ? "alignRight" : "alignCenter"}`}>{helpers.getAbbreviatedNameForHeading(player)}</th>)}
                                </Fragment>
                            )
                        })}
                        <th className="endSpacer"></th>
                    </tr>

                </thead>

                <tbody>
                    
                    {scoresByCourse.map((round, loopRoundNumber) => {

                        return (
                            <tr key={loopRoundNumber} className={round.isMajor ? "round major" : "round"}>
                                <td className="endSpacer"></td>
                                <td className="yearOfCompetition">{round.yearOfCompetition}</td>
                                <td className="dateOfRound">{round.dateOfRound}</td>
                                <td></td>
                                <td className="courseName"><NavLink to={`/scorecard/${round.yearOfCompetition}/${round.roundNumber + 1}`}>{ round.courseName }</NavLink></td>
                                <td></td>
                                {round.oomPoints.map((x, i) => <td key={i} className="oom-points">{helpers.allowDashForZero(x)}</td>)}
                                <td></td>
                                {round.stablefordScores.map((x, i) => <td key={i} className="stableford-score">{x}</td>)}
                                <td></td>
                                {round.positions.map((x, i) => <td key={i} className="position">{x === 1 ? <WinnerStar className="winnerStar" /> : x}</td>)}
                                <td></td>
                                {round.handicaps.map((x, i) => <td key={i} className="handicap">{x}</td>)}
                                <td className="endSpacer"></td>
                            </tr>
                        )
                    })}

                    <tr className="summary">
                        <td colSpan="4">Number of Rounds: {scoresByCourse.length}</td>
                        <td colSpan="8"></td>
                        <td colSpan="4">Number of Wins:</td>
                        {numberOfWinsTotals.map((numberOfWins, playerNumber) => (
                            <td key={playerNumber}><span className={scoresByCourse.length > 0 && winners.includes(PLAYERS_ARRAY[playerNumber]) ? "totals-winners" : ""}>{numberOfWins}</span></td>)
                        )}
                    </tr>

                </tbody>

            </table>

            <p><span className="color-key-majors">Key: Major</span></p>

        </Fragment>

    )

}


ScoresByCourseDisplay.propTypes = {
    numberOfWinsTotals: PropTypes.array.isRequired,
    scoresByCourse: PropTypes.array.isRequired
}


export default ScoresByCourseDisplay;