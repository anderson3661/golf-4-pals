import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import * as helpers from '../../utilities/helper-functions/helpers';
import * as helpersScorecard from '../../utilities/helper-functions/helpers-scorecard';

import BestRoundsDisplay from "./stats-best-rounds-display";

import "./player-profile.css";

const ROW_LABELS_POINTS = ["Best Round (points)", "Best Front 9 (points)", "Best Back 9 (points)"];
const ROW_LABELS_TO_PAR = ["Best Round (to par)", "Best Front 9 (to par)", "Best Back 9 (to par)"];
const ROW_LABELS_PARS_ETC = ["Best Round (pars +)", "Best Front 9 (pars +)", "Best Back 9 (pars +)"];

const COLUMN_LABELS_POINTS = ["OOM Points", "Stableford Score"];
const COLUMN_LABELS_TO_PAR = ["Par", "Score To Par"];
const COLUMN_LABELS_PARS_ETC = ["Par", "Number of Pars & better"];

const SOURCE_ARRAY_NAMES = ["allHoles", "frontNine", "backNine"];
const TARGET_ARRAY_NAMES = ["bestRound", "bestFrontNine", "bestBackNine"];


const getBestRounds = (allRounds, courses, playerNumber, comparisonFunction, comparisonSymbol) => {

    let bestRounds = Object.assign({}, { [TARGET_ARRAY_NAMES[0]]: [], [TARGET_ARRAY_NAMES[1]]: [], [TARGET_ARRAY_NAMES[2]]: []});
    
    let isForPlayerProfile = true;

    allRounds.forEach((rounds) => {
        rounds.roundsForYearOfCompetition.forEach((round, roundNumber) => {
            let oomRound = helpers.getOOMRound(courses, rounds.yearOfCompetition, round, roundNumber, isForPlayerProfile);
            let course = helpers.getCourse(courses, round.course);

            let playersPoints = comparisonFunction(course.holes, round);
            let playersPointsTotals = helpersScorecard.calculatePlayersPointsTotals(playersPoints);

            SOURCE_ARRAY_NAMES.forEach((dummy, i) => addToArray(playersPointsTotals, playerNumber, bestRounds, oomRound, SOURCE_ARRAY_NAMES[i], TARGET_ARRAY_NAMES[i], comparisonSymbol));
        });
    });

    return bestRounds;
}

const addToArray = (playersTotals, playerNumber, bestRounds, oomRound, sourceArrayName, targetArrayName, comparisonSymbol) => {

    let amountForPlayer = playersTotals[sourceArrayName][playerNumber];
    let previousBestForPlayer = (bestRounds[targetArrayName].length === 0 ? 0 : bestRounds[targetArrayName][0][sourceArrayName][playerNumber]);
    let newArrayElement = {...oomRound, ...playersTotals};

    if (comparisonSymbol === ">" && amountForPlayer > previousBestForPlayer) {
        bestRounds[targetArrayName] = [newArrayElement];
    } else if (comparisonSymbol === "<" && amountForPlayer < previousBestForPlayer) {
        bestRounds[targetArrayName] = [newArrayElement];
    } else if (amountForPlayer === previousBestForPlayer || bestRounds[targetArrayName].length === 0) {
        bestRounds[targetArrayName].push(newArrayElement);
    }
}


const BestRounds = (props) => {
    
    const {allRounds, courses } = props.appData;
    const {playerNumber} = props;

    const bestRoundsPoints = getBestRounds(allRounds, courses, playerNumber, helpersScorecard.calculatePointsForPlayers.bind(this), ">");
    const bestRoundsToPar = getBestRounds(allRounds, courses, playerNumber, helpersScorecard.calculateScoresToParForPlayers.bind(this), "<");
    const bestRoundsParOrBetter = getBestRounds(allRounds, courses, playerNumber, helpersScorecard.calculateNumberOfParsOrBetterForPlayers.bind(this), ">");

    return (

        <div className="container-card">

            <h2 className="heading">Best Rounds</h2>

                <BestRoundsDisplay
                    displayType="Stableford Points"
                    playerNumber={playerNumber}
                    bestRounds={bestRoundsPoints}
                    rowLabels={ROW_LABELS_POINTS}
                    columnLabels={COLUMN_LABELS_POINTS}
                    sourceArrayNames={SOURCE_ARRAY_NAMES}
                    targetArrayNames={TARGET_ARRAY_NAMES}
                />

                <BestRoundsDisplay
                    displayType="To Par"
                    playerNumber={playerNumber}
                    bestRounds={bestRoundsToPar}
                    rowLabels={ROW_LABELS_TO_PAR}
                    columnLabels={COLUMN_LABELS_TO_PAR}
                    sourceArrayNames={SOURCE_ARRAY_NAMES}
                    targetArrayNames={TARGET_ARRAY_NAMES}
                />

                <BestRoundsDisplay
                    displayType="Most Pars / Birdies / Eagles"
                    playerNumber={playerNumber}
                    bestRounds={bestRoundsParOrBetter}
                    rowLabels={ROW_LABELS_PARS_ETC}
                    columnLabels={COLUMN_LABELS_PARS_ETC}
                    sourceArrayNames={SOURCE_ARRAY_NAMES}
                    targetArrayNames={TARGET_ARRAY_NAMES}
                />

        </div>

    )
}


const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)})


BestRounds.propTypes = {
    appData: PropTypes.object.isRequired,
    playerNumber: PropTypes.number.isRequired
}


export default connect(mapStateToProps, null)(BestRounds);