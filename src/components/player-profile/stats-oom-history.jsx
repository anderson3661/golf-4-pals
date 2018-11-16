import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {PLAYERS_ARRAY, MAX_NUMBER_OF_ROUNDS_PER_ORDER_OF_MERIT} from '../../utilities/constants';
import * as helpers from '../../utilities/helper-functions/helpers';

import WinnerStar from '@material-ui/icons/Star';


const OOMHistory = (props) => {

    const {allRounds } = props.appData;
    const {playerNumber} = props;

    const yearsOfOOMWins = helpers.getYearsOfOOMWins(allRounds, playerNumber);
    const oomHistory = helpers.getOOMHistory(allRounds);

    return (

        <div className="container-card">

            <h2 className="heading">Order of Merit History</h2>

            <div className="stats oomHistory">
                <table>
                    <thead>
                        <tr className="headings main">
                            <th className="yearOfCompetition">Year of Competition</th>
                            <th className="spacer"></th>
                            <th className="position">Position</th>
                            <th className="spacer"></th>
                            <th className="oomPoints" colSpan="4">Order of Merit Points</th>
                            <th className="endSpacer"></th>
                        </tr>
                        <tr className="headings players">
                            <th colSpan="4"></th>
                            {PLAYERS_ARRAY.map((player, i) => <th key={i} className="names">{player.toProperCase()}</th>)}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {oomHistory.map((oomYear, i) => {
                            return (
                                <tr key={i} className="oomYear">
                                    <td className="yearOfCompetition">
                                        <NavLink to={`/oom/${oomYear.yearOfCompetition}`}>{ oomYear.yearOfCompetition }</NavLink>
                                        <span>{oomYear.isSeasonCompleted ? "" : `\n(after ${oomYear.roundsCompleted} of ${MAX_NUMBER_OF_ROUNDS_PER_ORDER_OF_MERIT} rounds)`}</span>
                                    </td>
                                    <td className="spacer"></td>
                                    <td className="position">{oomYear.positions[playerNumber] === 1 ? <WinnerStar className="winnerStar" /> : oomYear.positions[playerNumber]}</td>
                                    <td></td>
                                    {oomYear.points.map((playerPoints, playerNumberLoop) => {
                                        return (
                                            <td key={playerNumberLoop} className="names">
                                                <span className={oomYear.positions[playerNumberLoop] === 1 ? "totals-winners" : ""}>{playerPoints}</span>
                                            </td>
                                        )
                                    })}
                                    <td></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <p className="winsSummary">Wins:
                    <span>
                        {yearsOfOOMWins.length === 0 ?
                            '0' :
                            yearsOfOOMWins.length + " (" + (yearsOfOOMWins.map((yearOfOOMWins, i) => yearOfOOMWins + (i === yearsOfOOMWins.length - 1 ? "" : ", "))).join("") + ")"
                        }
                    </span>
                </p>
            </div>

        </div>
    )
}


OOMHistory.propTypes = {
    appData: PropTypes.object.isRequired,
    playerNumber: PropTypes.number.isRequired
}


export default OOMHistory;