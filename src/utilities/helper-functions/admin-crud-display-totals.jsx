import React from 'react';
import PropTypes from 'prop-types';

import * as helpersScorecard from './helpers-scorecard';

const DisplayTotals = (props) => {

    const {holesType, includePlayersPointsTotals, playersPoints, className, rowTitle, state} = props;

    const holeStart = (holesType === "backNine" ? 10 : 1);
    const holeEnd = (holesType === "frontNine" ? 9 : 18);
    const playersPointsTotals = includePlayersPointsTotals ? helpersScorecard.calculatePlayersPointsTotals(playersPoints) : null;     // { frontNine: [0,0,0,0], backNine: [0,0,0,0], allHoles: [0,0,0,0] };

    return (
        <tr className={className}>
            <td>{rowTitle}</td>
            <td></td>
            <td>{state.pars.slice(holeStart-1, holeEnd).reduce((total = 0, value = 0) => (total || 0) + (value || 0), 0)}</td>
            <td>{state.yardages.slice(holeStart-1, holeEnd-1).reduce((total = 0, value = 0) => (total || 0) + (value || 0), 0)}</td>
            <td>&nbsp;</td>
            {includePlayersPointsTotals && playersPointsTotals[holesType].map((points, i) => <td key={i}>{points}</td>)}
        </tr>
    )
}


DisplayTotals.propTypes = {
    holesType: PropTypes.string.isRequired,
    includePlayersPointsTotals: PropTypes.bool,
    playersPoints: PropTypes.object,
    className: PropTypes.string.isRequired,
    rowTitle: PropTypes.string.isRequired,
    state: PropTypes.object.isRequired
}


export default DisplayTotals;