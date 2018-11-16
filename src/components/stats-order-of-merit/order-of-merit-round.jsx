import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import * as helpers from '../../utilities/helper-functions/helpers';

import WinnerStar from '@material-ui/icons/Star';

import './order-of-merit.css';

// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
// import Star from './star';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

// <IconButton aria-label="Cart">
//    <Badge badgeContent={4} color="primary">
//        <ShoppingCartIcon />
//    </Badge>
// </IconButton>

const OrderOfMeritRound = (props) => {

    const {round, includeYearOfCompetition} = props;

    return (

        <tr key={round.roundNumber} className={round.isMajor ? "round major" : "round"}>
            <td className="endSpacer"></td>
            {includeYearOfCompetition && <td className="yearOfCompetition">{round.yearOfCompetition}</td>}
            <td className="roundNumber">{round.roundNumber}</td>
            <td className="dateOfRound">{round.dateOfRound}</td>
            <td className="courseName"><NavLink to={`/scorecard/${round.yearOfCompetition}/${round.roundNumber}`}>{ round.courseName }</NavLink></td>
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

}


OrderOfMeritRound.propTypes = {
    round: PropTypes.object.isRequired,
    includeYearOfCompetition: PropTypes.bool.isRequired
}


export default OrderOfMeritRound;