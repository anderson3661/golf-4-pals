import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import * as helpers from '../../utilities/helper-functions/helpers';

import WinnerStar from '@material-ui/icons/Star';

import "./player-profile.css";

const BestRoundsDisplay = (props) => {
    
    const {displayType, playerNumber, bestRounds, rowLabels, columnLabels, sourceArrayNames, targetArrayNames} = props;

    return (

        <div className="stats bestRounds">

            <h2>{displayType}</h2>

            <table>

                <thead>
                    <tr className="headings">
                        <th className="endSpacer"></th>
                        <th className="bestOfType"></th>
                        <th className="yearOfCompetition">Year Of Competition</th>
                        <th className="roundNumber">Round</th>
                        <th className="dateOfRound">Date</th>
                        <th className="spacer"></th>
                        <th className="courseName">Course</th>
                        <th className="spacer"></th>
                        <th className="headings">{columnLabels[0]}</th>
                        <th className="spacer"></th>
                        <th className="headings">{columnLabels[1]}</th>
                        <th className="spacer"></th>
                        <th className="headings">Position</th>
                        <th className="spacer"></th>
                        <th className="headings">Handicap</th>
                        <th className="endSpacer"></th>
                    </tr>
                </thead>

                <tbody>
                    {/* <tr className={round.isMajor ? "round major" : "round"}> */}
                    {[0,1,2].map(arrayNumber => {
                        let rounds = bestRounds[targetArrayNames[arrayNumber]];
                        return (
                            rounds.map((round, roundNumber) => {
                                let total = round[sourceArrayNames[arrayNumber]][playerNumber];
                                return (
                                    <tr key={roundNumber} className={rounds.length === 1 || (rounds.length > 1 && rounds.length === roundNumber + 1) ? "rowBorder" : ""}>
                                        <td className="endSpacer"></td>
                                        <td className="bestOfType">{roundNumber === 0 ? rowLabels[arrayNumber] : ""}</td>
                                        <td className="yearOfCompetition">{round.yearOfCompetition}</td>
                                        <td className="roundNumber">{round.roundNumber}</td>
                                        <td className="dateOfRound">{round.dateOfRound}</td>
                                        <td></td>
                                        <td className="courseName"><NavLink to={`/scorecard/${round.yearOfCompetition}/${round.roundNumber}`}>{ round.courseName }</NavLink></td>
                                        <td></td>
                                        <td>
                                            {(displayType !== "Stableford Points" ? round.coursePars[sourceArrayNames[arrayNumber]] :
                                             (arrayNumber === 0 ? helpers.allowDashForZero(round.oomPoints[playerNumber]) : "N/A"))}
                                        </td>
                                        <td></td>
                                        <td className="stableford-score">{(displayType === "To Par" && total > 0 ? "+" : "") + total}</td>
                                        <td></td>
                                        <td className="position">{round.positions[playerNumber] === 1 ? <WinnerStar className="winnerStar" /> : round.positions[playerNumber]}</td>
                                        <td></td>
                                        <td className="handicap">{round.handicaps[playerNumber]}</td>
                                        <td className="endSpacer"></td>
                                    </tr>
                                )
                            })
                        )
                    })}
                </tbody>

            </table>

        </div>

    )
}


BestRoundsDisplay.propTypes = {
    displayType: PropTypes.string.isRequired,
    playerNumber: PropTypes.number.isRequired,
    bestRounds: PropTypes.object.isRequired,
    rowLabels: PropTypes.array.isRequired,
    columnLabels: PropTypes.array.isRequired,
    sourceArrayNames: PropTypes.array.isRequired,
    targetArrayNames: PropTypes.array.isRequired
}


export default BestRoundsDisplay;