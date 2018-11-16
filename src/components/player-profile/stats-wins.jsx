import React from "react";
import PropTypes from 'prop-types';

import * as helpers from '../../utilities/helper-functions/helpers';
import OrderOfMeritHeader from '../stats-order-of-merit/order-of-merit-header';
import OrderOfMeritRound from '../stats-order-of-merit/order-of-merit-round';


const Wins = (props) => {

    const {allRounds, courses } = props.appData;
    const {isMajors, playerNumber} = props;

    const wins = helpers.getWins(allRounds, courses, isMajors, playerNumber)

    return (

        <div className="container-card">

            <h2 className="heading">{isMajors ? "Wins in Majors" : "Other Wins"}</h2>

            <div className="stats wins">

                <table>
                    <OrderOfMeritHeader includeYearOfCompetition={true} />
                    <tbody>
                        {wins.map((round, roundNumber) => {
                            return <OrderOfMeritRound key={roundNumber} round={round} includeYearOfCompetition={true} {...props} />
                        })}
                    </tbody>
                </table>

                <p className="winsSummary">Total:<span>{wins.length}</span></p>

            </div>

        </div>
    )
}


Wins.propTypes = {
    appData: PropTypes.object.isRequired,
    isMajors: PropTypes.bool.isRequired,
    playerNumber: PropTypes.number.isRequired
}


export default Wins;