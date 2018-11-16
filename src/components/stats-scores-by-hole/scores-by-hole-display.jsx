import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {PLAYERS_ARRAY, SCORE_TYPES} from '../../utilities/constants';
import * as helpers from '../../utilities/helper-functions/helpers';

import './scores-by-hole.css';


const isBest = (playerNumber, scoresByHoleTotals, nameOfTotalsArray, lowestFirst=false) => {
    return scoresByHoleTotals[nameOfTotalsArray][playerNumber] > 0 && helpers.getPositions(scoresByHoleTotals[nameOfTotalsArray], lowestFirst)[playerNumber] === 1;
}

const getTotalOfAllScoreTypesForPlayer = (scoresByHoleTotals, playerNumber) => {
    let total = 0;

    SCORE_TYPES.map((scoreType, i) => total += scoresByHoleTotals[scoreType][playerNumber]);
    
    return total;
}


const ScoresByHoleDisplay = (props) => {

    const {scoresByHole, scoresByHoleTotals, numberOfRounds} = props;

    return (

        <Fragment>
        
            <table>

                <thead>

                    <tr className="headings main">
                        <th className="endSpacer"></th>
                        <th>Hole</th>
                        <th></th>
                        <th colSpan="4">Eagles</th>
                        <th></th>
                        <th colSpan="4">Birdies</th>
                        <th></th>
                        <th colSpan="4">Pars</th>
                        <th></th>
                        <th colSpan="4">Bogeys</th>
                        <th></th>
                        <th colSpan="4">Bogeys++</th>
                        <th className="endSpacer"></th>
                    </tr>

                    <tr className="headings players">
                        <th className="endSpacer"></th>
                        <th></th>
                        {SCORE_TYPES.map((temp, i) => {
                            return (
                                <Fragment key={i}>
                                    <th className="spacer"></th>
                                    {PLAYERS_ARRAY.map((playerName, j) => <th key={j} className="namesSubHeading alignRight">{helpers.getAbbreviatedNameForHeading(playerName)}</th>)}
                                </Fragment>
                            )
                        })}
                        <th className="endSpacer"></th>
                    </tr>
                        
                </thead>

                <tbody>

                    {scoresByHole.map((hole, i) => {
                        return (
                            <tr key={i} className="holeRow">
                                <td className="endSpacer"></td>
                                <td className="holeNumber">{i+1}</td>
                                <td></td>
                                {hole.eagles.map((total, j) => <td key={j} className="holeTotals">{helpers.allowDashForZero(total)}</td>)}
                                <td></td>
                                {hole.birdies.map((total, j) => <td key={j} className="holeTotals">{helpers.allowDashForZero(total)}</td>)}
                                <td></td>
                                {hole.pars.map((total, j) => <td key={j} className="holeTotals">{helpers.allowDashForZero(total)}</td>)}
                                <td></td>
                                {hole.bogeys.map((total, j) => <td key={j} className="holeTotals">{helpers.allowDashForZero(total)}</td>)}
                                <td></td>
                                {hole.doubleBogeysOrWorse.map((total, j) => <td key={j} className="holeTotals">{helpers.allowDashForZero(total)}</td>)}
                                <td className="endSpacer"></td>
                            </tr>
                        )
                    })}

                    <tr className="totalsRow alignRight">
                        <td className="endSpacer"></td>
                        <td>Totals</td>
                        <td></td>
                        {SCORE_TYPES.map((scoreType, i) => {
                            return [scoresByHoleTotals[scoreType].map((total, playerNumber) => {
                                return <td key={playerNumber}>
                                    <span className={isBest(playerNumber, scoresByHoleTotals, SCORE_TYPES[i],
                                        SCORE_TYPES[i] === 'bogeys' || SCORE_TYPES[i] === 'doubleBogeysOrWorse') ? "totals-winners" : ""}>{total}</span>
                                </td>
                            }), <td key={i}></td>];
                        })}
                    </tr>

                    <tr className="averages">
                        <td className="endSpacer"></td>
                        <td colSpan="2" className="label">Averages %</td>
                        {SCORE_TYPES.map((scoreType, i) => {
                            return [scoresByHoleTotals[scoreType].map((total, playerNumber) => {
                                let totalAllScoreTypesForPlayer = getTotalOfAllScoreTypesForPlayer(scoresByHoleTotals, playerNumber);
                                return <td key={playerNumber}>
                                    <span>{total === 0 ? 0 : (Math.round(total / totalAllScoreTypesForPlayer * 1000) / 10).toFixed(0)}</span>   {/* Don't need toFixed but leave it in case need to output decimal points */}
                                </td>
                            }), <td key={i}></td>];
                        })}
                    </tr>

                </tbody>

            </table>

            <p className="numberOfRounds">Number of Rounds:&nbsp;&nbsp;{numberOfRounds}</p>

        </Fragment>
    )

}


ScoresByHoleDisplay.propTypes = {
    scoresByHole: PropTypes.array.isRequired,
    scoresByHoleTotals: PropTypes.object.isRequired,
    numberOfRounds: PropTypes.number.isRequired
}


export default ScoresByHoleDisplay;