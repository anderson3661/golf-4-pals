import {PLAYERS_ARRAY} from '../constants';

export function calculateCourseTotals(course, attribute) {
    // e.g. { frontNine: 0, backNine: 0, allHoles: 0 }
    return {frontNine: calculateTotals(course, attribute, 1, 9), backNine: calculateTotals(course, attribute, 10, 18), allHoles: calculateTotals(course, attribute, 1, 18)};
}

function calculateTotals(course, attribute, startHole, endHole) {
    let total = 0;

    for (let holeNumber = startHole; holeNumber <= endHole; holeNumber++) {
        total += course[holeNumber-1][attribute];
    }
    return total;
}

export function calculatePlayersPointsTotals(playersPoints) {
    let points = 0;
    let frontNine = [0,0,0,0];
    let backNine = [0,0,0,0];
    let allHoles = [0,0,0,0];

    for (let playerNumber = 1; playerNumber <= 4; playerNumber++) {
        for (let holeNumber = 1; holeNumber <= 18; holeNumber++) {
            points = playersPoints[PLAYERS_ARRAY[playerNumber-1]][holeNumber-1];
            if (holeNumber < 10) {
                frontNine[playerNumber-1] += points;
            } else {
                backNine[playerNumber-1] += points;
            }
            allHoles[playerNumber-1] += points;
        }
    }
    return {frontNine, backNine, allHoles}
}

export function getZeroPlayersPointsArrays() {
    let playersPoints = {};

    PLAYERS_ARRAY.forEach(player => {
        playersPoints = Object.assign({}, playersPoints, {[player]: new Array(18).fill(0)});
    });

    return playersPoints;
}

export function calculatePointsForPlayers(course, playersScores) {   
    
    let returnPlayersScores = getZeroPlayersPointsArrays();

    for (let playerNumber = 1; playerNumber <= 4; playerNumber++) {
        for (let holeNumber = 1; holeNumber <= 18; holeNumber++) {
            // let a = course[holeNumber-1].par;
            // let b = course[holeNumber-1].strokeIndex;
            // let c = playersScores[PLAYERS_ARRAY[playerNumber-1]][0];
            // let d = playersScores[PLAYERS_ARRAY[playerNumber-1]][holeNumber+1];
            // let e = calculatePointsForHole(a,b,c,d);

            returnPlayersScores[PLAYERS_ARRAY[playerNumber-1]][holeNumber-1] = calculatePointsForHole(course[holeNumber-1].par,
                                                                                 course[holeNumber-1].strokeIndex,
                                                                                 playersScores[PLAYERS_ARRAY[playerNumber-1]][0],
                                                                                 playersScores[PLAYERS_ARRAY[playerNumber-1]][holeNumber+1]);
        }        
    }

    return returnPlayersScores;    
}

export function calculateScoresToParForPlayers(course, playersScores) {   
    
    let returnPlayersScores = getZeroPlayersPointsArrays();

    for (let playerNumber = 1; playerNumber <= 4; playerNumber++) {
        for (let holeNumber = 1; holeNumber <= 18; holeNumber++) {
            returnPlayersScores[PLAYERS_ARRAY[playerNumber-1]][holeNumber-1] = calculateScoreToPar(course[holeNumber-1].par, playersScores[PLAYERS_ARRAY[playerNumber-1]][holeNumber+1]);
        }
    }

    return returnPlayersScores;
}

export function calculateNumberOfParsOrBetterForPlayers(course, playersScores) {
    
    let returnPlayersScores = getZeroPlayersPointsArrays();

    for (let playerNumber = 1; playerNumber <= 4; playerNumber++) {
        for (let holeNumber = 1; holeNumber <= 18; holeNumber++) {
            returnPlayersScores[PLAYERS_ARRAY[playerNumber-1]][holeNumber-1] = calculateScoreParOrBetter(course[holeNumber-1].par, playersScores[PLAYERS_ARRAY[playerNumber-1]][holeNumber+1]);
        }
    }

    return returnPlayersScores;
}

export function getTrueScoreForHole(playersScoreForHole) {
    if (playersScoreForHole >= 10) {
        return playersScoreForHole / 10;
    } else if (playersScoreForHole === -1) {
        return 0;
    }
    return playersScoreForHole;
}

export function calculatePointsForHole(holePar, holeStrokeIndex, playersHandicap, playersScoreForHole) {
    
    playersScoreForHole = getTrueScoreForHole(playersScoreForHole);
    
    return (playersScoreForHole > 0 ? calculateStablefordPoints(holePar, holeStrokeIndex, playersHandicap, playersScoreForHole) : 0);      
}

function calculateStablefordPoints(par, strokeIndex, handicap, score) {
    if (handicap <= 18 && strokeIndex <= handicap) score-- ;
    if (handicap > 18) score-- ;
    if (handicap > 18 && (handicap - 18) >= strokeIndex) score-- ;
    if (score + 4 === par) return 6
    if (score + 3 === par) return 5
    if (score + 2 === par) return 4
    if (score + 1 === par) return 3
    if (score === par) return 2
    if (score - 1 === par) return 1
    return 0
}

function calculateScoreToPar(par, score) {
    let trueScoreForHole = getTrueScoreForHole(score);
    return trueScoreForHole === 0 ? 3 : trueScoreForHole - par;
}

function calculateScoreParOrBetter(par, score) {
    let trueScoreForHole = getTrueScoreForHole(score);
    return trueScoreForHole > 0 && trueScoreForHole <= par ? 1 : 0;
}