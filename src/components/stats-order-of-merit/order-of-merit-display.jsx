import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {PLAYERS_ARRAY} from '../../utilities/constants';

import OrderOfMeritHeader from './order-of-merit-header';
import OrderOfMeritRound from './order-of-merit-round';

import './order-of-merit.scss';
import '../../utilities/css/stats.scss';


const OrderOfMeritDisplay = (props) => {

    const {oom, oomPointsTotals, winners, isSeasonCompleted, majorsPlayed} = props;

    return (

        <Fragment>
            <table>

                <OrderOfMeritHeader includeYearOfCompetition={false} />

                <tbody>
                    {oom.map((round, roundNumber) => {
                        return <OrderOfMeritRound key={roundNumber} round={round} includeYearOfCompetition={false} {...props} />
                    })}

                    <tr className="totals alignRight">
                        <td colSpan="5">Total</td>
                        {oomPointsTotals.map((points, playerNumber) => (
                            <td key={playerNumber}><span className={winners.includes(PLAYERS_ARRAY[playerNumber]) ? "totals-winners" : ""}>{points}</span></td>)
                        )}
                    </tr>
                </tbody>
            </table>

            {!isSeasonCompleted &&
                <p className="current-year-number-of-majors-played">
                    <span className="color-key-majors">Majors played = {majorsPlayed.majors},</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>Non-Majors played = {majorsPlayed.nonMajors}</span>
                </p>
            }

            <p><span className="color-key-majors">Key: Major</span></p>

        </Fragment>
    )

}


OrderOfMeritDisplay.propTypes = {
    winners: PropTypes.array.isRequired
}


export default OrderOfMeritDisplay;