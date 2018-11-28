import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {PLAYERS_ARRAY} from '../../utilities/constants';
import * as helpers from '../../utilities/helper-functions/helpers';

import './story-of-the-season.scss';


const OrderOfMeritTable = (props) => {

    let {yearOfCompetition, oomPointsTotals, isSeasonCompleted, isCurrentTable, currentRoundNumber} = props;
    let totalsElementName = (isCurrentTable ? "currentRoundsCumulative" : "final");
    let winners = helpers.getPositionsOfTotals(oomPointsTotals[totalsElementName]);

    return (

        <Fragment>
            <div>
                {isCurrentTable &&
                    <div className="scrollHelp">Scrolling through the reports will dynamically update this table.</div>
                }
                <div className="oom-table-header">
                    <h2>{isCurrentTable ? `${isSeasonCompleted ? "" : "Current"} ${yearOfCompetition} OOM Table \nafter ${currentRoundNumber} round${currentRoundNumber > 1 ? "s" : ""}` :
                        ((isSeasonCompleted ? "Final" : "") + " " + yearOfCompetition + " OOM Table")}</h2>
                    <table>
                        <thead>
                            <tr className="headings">
                                <th></th>
                                {PLAYERS_ARRAY.map(player => <th key={player}>{player.toProperCase()}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {/* *********************** CURRENT TABLE (Top Table) ********************* */}
                            {/* Outputs the appropriate round number in the 1st OOM table based on the reports the user is scrolling through */}
                            {isCurrentTable &&
                                <tr className="totals">
                                    <td className="row-heading">Points Round {currentRoundNumber}</td>
                                    {oomPointsTotals.currentRound.map((points, playerNumber) => (
                                        <td key={playerNumber}>
                                            <span className={helpers.getPositionsOfTotals(oomPointsTotals.currentRound).includes(PLAYERS_ARRAY[playerNumber]) ? "totals-winners" : ""}>{points}
                                            </span>
                                        </td>)
                                    )}
                                </tr>
                            }

                            {/* *********************** FINAL TABLE (Bottom Table) ********************* */}
                            {/* Outputs the final cumulative points totals in the 1st table, and the OOM totals in the 2nd table */}
                            {!(isCurrentTable && currentRoundNumber === 1) &&
                                <tr className="totals">
                                    <td className="row-heading">{isCurrentTable ? `After ${currentRoundNumber} rounds` : "Total Points"}</td>
                                    {oomPointsTotals[totalsElementName].map((points, playerNumber) => (
                                        <td key={playerNumber}>
                                            <span className={winners.includes(PLAYERS_ARRAY[playerNumber]) ? "totals-winners" : ""}>{points}
                                            </span>
                                        </td>)
                                    )}
                                </tr>
                            }

                            {/* Add a blank row for the 1st round of the season so that the screen doesn't jump when scrolling to another round */}
                            {(isCurrentTable && currentRoundNumber === 1) &&
                                <tr className="totals">
                                    <td className="row-heading">&nbsp;</td>
                                    {oomPointsTotals[totalsElementName].map((points, i) => <td key={i}><span>&nbsp;</span></td>)}
                                </tr>
                            }
                        </tbody>
                    </table>
                    <div className="winners">
                        <div className="img-winners">
                            {winners.map((player, i) => (<img key={i} src={helpers.getPlayerImage(player)} alt="" />))}
                        </div>
                    </div>
                    {!isCurrentTable && <div className="oom-table-link"><NavLink to={`/oom/${yearOfCompetition}`}>Full OOM Table</NavLink></div>}
                </div>
            </div>
        </Fragment>

    )

}


OrderOfMeritTable.propTypes = {
    yearOfCompetition: PropTypes.number.isRequired,
    oomPointsTotals: PropTypes.object.isRequired,
    isSeasonCompleted: PropTypes.bool.isRequired,
    isCurrentTable: PropTypes.bool.isRequired,
    currentRoundNumber: PropTypes.number.isRequired
}


export default OrderOfMeritTable;