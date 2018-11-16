import images from '../data/images';
import actualScorecards from '../data/actual-scorecards';
import * as helpersScorecard from './helpers-scorecard';

import {PLAYERS_ARRAY, MONTH_ABBREVIATIONS, ALBATROSS, EAGLE, BIRDIE, PAR, BOGEY, DOUBLE_BOGEY_OR_WORSE, POSITION_FOR_WIN, STATS_BOTTOM_MARGIN, STATS_MIN_VIEWPOINT_HEIGHT} from '../constants';


Array.prototype.SumArray = function(arr) {
    return this.map((num, idx) => num + (arr[idx] === "-" ? 0 : arr[idx]));
}

String.prototype.toProperCase = function(opt_lowerCaseTheRest) {
    return (opt_lowerCaseTheRest ? this.toLowerCase() : this)
      .replace(/(^|[\s\xA0])[^\s\xA0]/g, function(s){ return s.toUpperCase(); });
}

export function getAllYearsOfCompetition(allRounds, includeAllYears=false) {
    let individialYears = allRounds.map(round => round.yearOfCompetition);
    return includeAllYears ? ["All Years", ...individialYears] : individialYears;
}

export function getAllDatesOfRounds(allRounds, courses, courseName) {
    let datesOfRoundsForYear = [];
    let datesOfRoundsAll = [];

    let allRoundsReversed = [...allRounds].reverse();

    allRoundsReversed.forEach(roundsForYear => {
        datesOfRoundsForYear = [];
        roundsForYear.roundsForYearOfCompetition.forEach(round => {
            if (getCorrectCourseName(courses, round.course) === courseName) {
                datesOfRoundsForYear.push(round.dateOfRound);
            }
        });
        datesOfRoundsForYear.forEach(dateOfRound => datesOfRoundsAll.push(dateOfRound));
    });
    
    return datesOfRoundsAll;
}

export function getAllCourses(courses, includeAllCourses=false) {
    let courseNames = courses.map(course => course.courseName);
    let courseNamesSorted = courseNames.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1);
    return (includeAllCourses ? ["All Courses"] : []).concat(...new Set(courseNamesSorted));       // Return unique items
}

export function getRoundsForSelectedCourseAndYear(allRounds, courses, courseName, yearOfCompetition) {
    let rounds = [];

    allRounds.forEach(roundsForYear => {
        roundsForYear.roundsForYearOfCompetition.forEach(round => {
            if ((courseName === "All Courses" || getCorrectCourseName(courses, round.course) === courseName) &&
                (yearOfCompetition === "All Years" || roundsForYear.yearOfCompetition === yearOfCompetition)) {
                rounds.push(round);
            }
        });
    });
    
    return rounds;
}

export function getYearOfCompetitionDetailsFromDateOfRound(allRounds, courseName, courseVariation, dateOfRound) {
    let returnValues = {yearOfCompetition: 0, isSeasonCompleted: false};

    allRounds.forEach(roundsForYear => {
        roundsForYear.roundsForYearOfCompetition.forEach(round => {
            if (round.dateOfRound === dateOfRound && round.course === (courseVariation ? courseVariation : courseName)) {
                returnValues = {yearOfCompetition: roundsForYear.yearOfCompetition, isSeasonCompleted: roundsForYear.isSeasonCompleted};
            }
        });
    });
    
    return returnValues;
}

export function getSelectedRound(allRounds, courseName, courseVariation, dateOfRound) {
    let roundToReturn = {};

    allRounds.forEach((roundsForYear, yearOfCompetitionArrayElementNumber) => {
        roundsForYear.roundsForYearOfCompetition.forEach((round, roundArrayElementNumber) => {
            if (round.dateOfRound === dateOfRound && round.course === (courseVariation ? courseVariation : courseName))
                roundToReturn = Object.assign({}, round, {yearOfCompetitionArrayElementNumber: yearOfCompetitionArrayElementNumber}, {roundArrayElementNumber: roundArrayElementNumber});
        });
    });
    
    return roundToReturn;
}

export function getRoundsForYearOfCompetition(allRounds, yearOfCompetition) {
    let i = 0;
    let len;

    for (i = 0, len = allRounds.length; i < len; i++) {
        if (allRounds[i].yearOfCompetition === yearOfCompetition) return allRounds[i];
    }
    return {};
}

export function getCompetitionYearArraysForAllYears(allRounds) {
    let rounds = [];

    allRounds.forEach(roundsForYearOfCompetition => {
        rounds.push(roundsForYearOfCompetition);
    });

    return rounds;
}

export function getCourse(courses, courseName, courseVariation = "") {
    let i = 0;
    let len;

    // Can't use map because you can't break out of it (i.e. to return a value)
    for (i = 0, len = courses.length; i < len; i++) {
        if (courseVariation) {
            if (courses[i].courseVariation === courseVariation) return courses[i];
        } else {
            if ((!courseVariation && (courses[i].courseVariation === courseName)) || (courseName && (courses[i].courseName === courseName))) return courses[i];
        }
    }
    return {};
}

export function getCourseArrayNumber(courses, courseName, courseVariation) {
    let i = 0;
    let len;

    // Can't use map because you can't break out of it (i.e. to return a value)
    for (i = 0, len = courses.length; i < len; i++) {
        if (courses[i].courseName === courseName && courses[i].courseVariation === courseVariation) return i;
    }
    return -1;
}

export function getRoundArrayDetails(allRounds, courseName, courseVariation, dateOfRound) {
    let roundDetailsToReturn = {elementNumberYearOfCompetition: -1, elementNumberRound: -1};
    
    allRounds.forEach((roundsForYear, yearOfCompetitionNumber) => {
        roundsForYear.roundsForYearOfCompetition.forEach((round, roundNumber) => {
            if (round.dateOfRound === dateOfRound && round.course === (courseVariation ? courseVariation : courseName)) {
                roundDetailsToReturn = {elementNumberYearOfCompetition: yearOfCompetitionNumber, elementNumberRound: roundNumber};
            }
        });
    });

    return roundDetailsToReturn;
}

export function areArrayContentsDifferent(currentArray, previousArray, previousArrayElementName) {
    let contentsAreDifferent = false;
    currentArray.forEach((value, i) => {if (value !== previousArray.holes[i][previousArrayElementName]) contentsAreDifferent = true;});
    return contentsAreDifferent;
}

export function getCourseVariations(courses, courseName) {
    return (courses.filter(course => course.courseName === courseName)).map(course => course.courseVariation);    
}

export function getCorrectCourseName(courses, courseName) {
    return getCourse(courses, courseName).courseName;
}

export function getCoursePars(courses, courseName) {
    let course = getCourse(courses, courseName);
    return course.holes.map(hole => hole.par);
}

export function doesCourseAlreadyExist(courses, courseName, courseVariation) {
    let i = 0;

    // Can't use map because you can't break out of it (i.e. to return a value)
    for (i = 0; i < courses.length; i++) {
        if ((courseName && (courses[i].courseName === courseName)) && (courses[i].courseVariation === courseVariation)) {
            return true;
        }
    }
    return false;
}

export function hasARoundBeenPlayedAtThisCourse(courses, allRounds, courseName, courseVariation, pars) {
    let courseFound = false;

    allRounds.forEach(roundsForYear => {
        roundsForYear.roundsForYearOfCompetition.forEach(round => {
            if ((courseVariation && round.course === courseVariation) || (!courseVariation && round.course === courseName)) {
                courseFound = true;
            }
        });
    });

    return courseFound;
}

export function getClassNameForScoreOnHole(playerScore, par) {
    return playerScore === par - 2 ? "key-eagle" : playerScore === par - 1 ? "key-birdie" : playerScore === par ? "key-par" : "";
}

export function getImage(images, imageCategory, imageName) {
    return images.miscellaneous[0].image;
}

export function getImagesForCourse(images, courseName) {
    let imagesToReturn = [];

    images.courses.forEach(course => {if(course.name === courseName) imagesToReturn = course.images});

    // If no images exist for the course, then use stock images
    if (imagesToReturn.length === 0) {
        if (images.courses[0].name === "A Stock Golf Photo") {
            imagesToReturn = images.courses[0].images;
        }
    }

    return imagesToReturn;
}

export function getPlayerImageForHome(images, player) {
    return images.players[player].imageForHome;
}

export function updateElementInArray(array, arrayElementNumber, update) {
    return [...array.slice(0, arrayElementNumber === 0 ? 0 : arrayElementNumber), update, ...array.slice(arrayElementNumber + 1)]
}

export function deleteElementFromArray(array, arrayElementNumber) {
    return [...array.slice(0, arrayElementNumber === 0 ? 0 : arrayElementNumber), ...array.slice(arrayElementNumber + 1)];
}

export function deleteElementFromRoundsArray(allRounds, arrayDetails) {
    let arrayElementNumberYearOfCompetition = arrayDetails.elementNumberYearOfCompetition;
    let arrayElementNumberRound = arrayDetails.elementNumberRound;
    let arrayYearOfCompetition = updateRoundsForYearOfCompetition(allRounds, "DELETE", "", arrayElementNumberRound);
    let arrayAllRounds = updateElementInArray(allRounds, arrayElementNumberYearOfCompetition, arrayYearOfCompetition);
    return arrayAllRounds;
}

export function deleteElementFromReportsArray(allRounds, allReports, arrayDetails) {
    let arrayElementNumberYearOfCompetition = arrayDetails.elementNumberYearOfCompetition;
    let arrayElementNumberRound = arrayDetails.elementNumberRound;
    let arrayYearOfCompetition = updateReportsForYearOfCompetition(allRounds, allReports, "DELETE", "", arrayElementNumberRound);
    let arrayAllReports = updateElementInArray(allReports, arrayElementNumberYearOfCompetition, arrayYearOfCompetition);
    return arrayAllReports;
}

function getArrayNumberOfCurrentYearOfCompetition(allRounds) {
    let arrayNumberOfCurrentYearOfCompetition = -1;

    allRounds.forEach((roundsForYear, arrayNumber) => {if (!roundsForYear.isSeasonCompleted) arrayNumberOfCurrentYearOfCompetition = arrayNumber;});

    return arrayNumberOfCurrentYearOfCompetition;
}

export function updateRoundsForYearOfCompetition(allRounds, typeOfAction, update, arrayElementNumber) {
    let roundsForYearOfCompetition;

    let arrayNumberOfCurrentYearOfCompetition = getArrayNumberOfCurrentYearOfCompetition(allRounds);

    if (arrayNumberOfCurrentYearOfCompetition !== -1) {
        let allRoundsForYearOfCompetition = allRounds[arrayNumberOfCurrentYearOfCompetition].roundsForYearOfCompetition;

        if (typeOfAction === "CREATE") {
            roundsForYearOfCompetition = [...allRoundsForYearOfCompetition, update.round];
        } else if (typeOfAction === "UPDATE") {
            roundsForYearOfCompetition = updateElementInArray(allRoundsForYearOfCompetition, update.roundDetails.elementNumberRound, update.round.round);
        } else if (typeOfAction === "DELETE") {
            roundsForYearOfCompetition = deleteElementFromArray(allRoundsForYearOfCompetition, arrayElementNumber)
        }

        return {
            yearOfCompetition: allRounds[arrayNumberOfCurrentYearOfCompetition].yearOfCompetition,
            isSeasonCompleted: allRounds[arrayNumberOfCurrentYearOfCompetition].isSeasonCompleted,
            roundsForYearOfCompetition: roundsForYearOfCompetition
        }
    }
    return {}
}

export function updateReportsForYearOfCompetition(allRounds, allReports, typeOfAction, update, arrayElementNumber) {
    let reportsForYearOfCompetition;

    let arrayNumberOfCurrentYearOfCompetition = getArrayNumberOfCurrentYearOfCompetition(allRounds);

    if (arrayNumberOfCurrentYearOfCompetition !== -1) {
        let allReportsForYearOfCompetition = allReports[arrayNumberOfCurrentYearOfCompetition].reports;

        if (typeOfAction === "CREATE") {
            reportsForYearOfCompetition = [...allReportsForYearOfCompetition, Object.assign({}, {roundNumber: allReportsForYearOfCompetition.length + 1}, update.report)];
        } else if (typeOfAction === "UPDATE") {
            reportsForYearOfCompetition = updateElementInArray(allReportsForYearOfCompetition, update.roundDetails.elementNumberRound, update.round.report);
        } else if (typeOfAction === "DELETE") {
            reportsForYearOfCompetition = deleteElementFromArray(allReportsForYearOfCompetition, arrayElementNumber)
        }

        return {
            yearOfCompetition: allReports[arrayNumberOfCurrentYearOfCompetition].yearOfCompetition,
            reports: reportsForYearOfCompetition
        }
    }
    return {}
}

export function areAllArrayValuesEntered(arrayName) {
    let allValuesEntered = true;
    arrayName.forEach(value => {if (value === "") allValuesEntered = false});
    return allValuesEntered;
}

export function getOOMPoints(stablefordPoints, positions, isMajor) {
    let i;
    const oomPoints = [0,0,0,0];
    
    for (i=0; i<4; i++) {
        oomPoints[i] = getOOMPointsFromStablefordScore(stablefordPoints[i]) + (getOOMPointsFromPosition(positions[i]) * (isMajor ? 2 : 1));
    }
    return oomPoints;
}

export function getOOMPointsFromPosition(position) {
    if (position === 1) return 3;
    if (position === 2) return 2;
    if (position === 3) return 1;
    return 0;
}

export function getOOMPointsFromStablefordScore(score) {
    if (score > 39) return 7;
    if (score > 37) return 6;
    if (score > 35) return 5;
    if (score > 32) return 4;
    if (score > 29) return 3;
    if (score > 26) return 2;
    if (score > 23) return 1;
    return 0;
}

export function getPositions(amounts, lowestFirst=false) {
    let i;
    let j;

    let positions = [0,0,0,0];
    
    let sortedAmounts = [...amounts];
    sortedAmounts = sortedAmounts.sort((a, b) => (lowestFirst ? a - b : b - a));
    
    for (i=0; i<4; i++) {
        for (j=0; j<4; j++) {
            if (amounts[i] === sortedAmounts[j]) {
                positions[i] = j + 1;
                break;
            }
        }
    }
    
    return positions;    
}

export function getWinners(positions) {
    return positions.map(position => position === 1 ? 1 : 0)
}

export function getStablefordScoresForRound(round) {
    return PLAYERS_ARRAY.map(player => round[player][1]);
}

export function getHandicapsForRound(round) {
    return PLAYERS_ARRAY.map(player => round[player][0]);
}

export function isNTP(scoreForHole) {
    return (scoreForHole > 10 || scoreForHole === -1);
}

export function allowDashForZero(amount) {
    return (amount === 0 ? "-" : amount);
}

export function getAbbreviatedNameForHeading(player) {
    return (player === "martin" ? "mart" : player).toProperCase();
}

export function getScoreByHoleType(scoreForHole, par) {
    if (scoreForHole === -1 || scoreForHole === 0) return DOUBLE_BOGEY_OR_WORSE;
    if (scoreForHole > 10) scoreForHole /= 10;
    if (scoreForHole + 3 === par) return ALBATROSS;
    if (scoreForHole + 2 === par) return EAGLE;
    if (scoreForHole + 1 === par) return BIRDIE;
    if (scoreForHole === par) return PAR;
    if (scoreForHole - 1 === par) return BOGEY;
    if (scoreForHole === -1 || scoreForHole === 0 || (scoreForHole - par) > 1) return DOUBLE_BOGEY_OR_WORSE;
    return DOUBLE_BOGEY_OR_WORSE;
}

export function createOOMArray(courses, roundsForYearOfCompetition, yearOfCompetition) {
    let oom = [];

    roundsForYearOfCompetition.forEach((round, roundNumber) => {
        oom.push(getOOMRound(courses, yearOfCompetition, round, roundNumber));
    });

    return oom;
}

export function createTotalsArray(arrayToTotal, objectProperty) {
    // Where you have a number of arrays (e.g. [1,2,3,4] and [5,6,7 8]) this totals the arrays (e.g. result is [6,8,10,12])
    let totals = [0,0,0,0];
    arrayToTotal.forEach(innerArray => {
        totals = totals.SumArray(innerArray[objectProperty]);
    });
    return totals;
}

export function createOOMCumulativePointsByRoundArray(oom) {
    let previousOOMPoints;
    let oomCumulativePointsByRound = [];

    oom.forEach((round, i) => {
        if(i === 0) {
            previousOOMPoints = [...round.oomPoints];
            oomCumulativePointsByRound.push(previousOOMPoints);
        } else {
            let sum = round.oomPoints.map((points, j) => {
                return points + previousOOMPoints[j];
            });
            oomCumulativePointsByRound.push(sum);
            previousOOMPoints = [...sum];
        }
    });

    return oomCumulativePointsByRound;
}

export function getFormattedDateForRound(yearOfCompetition, dateOfRound) {
    let formattedDate = "";

    let dayString = dateOfRound.substring(0,2);
    let monthString = dateOfRound.substring(3,5);
    let yearString = dateOfRound.substring(6,10);

    formattedDate = `${dayString}-${MONTH_ABBREVIATIONS[parseInt(monthString, 10)-1]}`;

    if (parseInt(yearString, 10) !== yearOfCompetition) {
        formattedDate += `-${yearString}`;
    }

    return formattedDate;
}

export function getPlayerImage(playerName, imageName="imageHeadSmall") {

    return images.players[playerName][imageName];

}

export function getActualScorecard(yearOfCompetition, roundNumber) {
    let pdfFile = "";

    let pdfFilesForYearOfCompetition = actualScorecards.filter(scorecardsForYearOfCompetition => scorecardsForYearOfCompetition.yearOfCompetition === yearOfCompetition);
    pdfFile = pdfFilesForYearOfCompetition[0].scorecards[roundNumber - 1];

    return pdfFile;
}

export function getPositionsOfTotals(playersPointsTotals) {
    let positions = getPositions(playersPointsTotals);
    return PLAYERS_ARRAY.filter((player, playerNumber) => positions[playerNumber] === 1);
}

export function getWins(allRounds, courses, getMajors, playerNumber) {
    let wins = [];

    let allRoundsReversed = [...allRounds].reverse();

    allRoundsReversed.forEach((rounds) => {
        rounds.roundsForYearOfCompetition.forEach((round, roundNumber) => {
            if (round.isMajor === getMajors) {
                let isForPlayerProfile = true;
                let oomRound = getOOMRound(courses, rounds.yearOfCompetition, round, roundNumber, isForPlayerProfile);
                if (oomRound.positions[playerNumber] === POSITION_FOR_WIN) {
                    wins.push(oomRound);
                }
                // let stablefordScores = PLAYERS_ARRAY.map(player => round[player][STABLEFORD_SCORES_ELEMENT]);
                // let positions = getPositions(stablefordScores);
                // if (positions[playerNumber] === POSITION_FOR_WIN) {
                //     wins.push({
                //         dateOfRound: getFormattedDateForRound(0, round.dateOfRound),
                //         courseName: getCorrectCourseName(courses, round.course),
                //         isMajor: round.isMajor,
                //     });
                // }
            }
        });
    });

    return wins;
}

export function getHoleScoreType(allRounds, courses, type, player) {
    let holeScoreType = [];

    let allRoundsReversed = [...allRounds].reverse();

    allRoundsReversed.forEach((rounds) => {
        rounds.roundsForYearOfCompetition.forEach((round, roundNumber) => {
            let course = getCourse(courses, round.course).holes;
            round[player].forEach((scoreForHole, holeNumber) => {
                if (holeNumber > 1 && getScoreByHoleType(scoreForHole, course[holeNumber-2].par) === type) {
                    holeScoreType.push({
                        yearOfCompetition: rounds.yearOfCompetition,
                        roundNumber: roundNumber + 1,
                        dateOfRound: getFormattedDateForRound(0, round.dateOfRound),
                        courseName: getCorrectCourseName(courses, round.course),
                        isMajor: round.isMajor,
                        holeNumber: holeNumber,
                        yardage: course[holeNumber-2].yardage,
                        score: scoreForHole,
                        par: course[holeNumber-2].par
                    })
                }
            });
        });
    });

    return holeScoreType;
}

export function getAverage(allRounds, arrayElement, player) {
    let total = 0;
    let numberOfRounds = 0;

    allRounds.forEach((rounds) => {
        rounds.roundsForYearOfCompetition.forEach((round) => {
            numberOfRounds ++;
            total += round[player][arrayElement];
        });
    });

    return Math.round(total / numberOfRounds);
}

export function getOOMRound(courses, yearOfCompetition, round, roundNumber, isForPlayerProfile = false) {
    const stablefordScores = getStablefordScoresForRound(round);
    const positions = getPositions(stablefordScores);
    const oomPoints = getOOMPoints(stablefordScores, positions, round.isMajor);
    const handicaps = getHandicapsForRound(round);

    return {
        yearOfCompetition: yearOfCompetition,
        roundNumber: roundNumber + 1,
        dateOfRound: getFormattedDateForRound((isForPlayerProfile ? 0 : yearOfCompetition), round.dateOfRound),
        courseName: getCorrectCourseName(courses, round.course),
        isMajor: round.isMajor,
        oomPoints: oomPoints,
        stablefordScores: stablefordScores,
        positions: positions,
        handicaps: handicaps,
        coursePars: helpersScorecard.calculateCourseTotals(getCourse(courses, round.course).holes, "par")
    };
}

export function getNumberOfOOMWins(allRounds) {
    let stablefordScores, positions, oomPoints, oomPointsTotals, oomPositions;
    let oomWins = [0,0,0,0];

    allRounds.forEach((rounds) => {
        oomPointsTotals = [0,0,0,0];
        if (rounds.isSeasonCompleted) {
            rounds.roundsForYearOfCompetition.forEach((round) => {
                stablefordScores = getStablefordScoresForRound(round);
                positions = getPositions(stablefordScores);
                oomPoints = getOOMPoints(stablefordScores, positions, round.isMajor);
                PLAYERS_ARRAY.map((player, i) => oomPointsTotals[i] += oomPoints[i]);
            });
            oomPositions = getPositions(oomPointsTotals);
            PLAYERS_ARRAY.map((player, i) => oomWins[i] += oomPositions[i] === 1);
        }
    });

    return oomWins;
}

export function getYearsOfOOMWins(allRounds, playerNumber) {
    let stablefordScores, positions, oomPoints, oomPointsTotals, oomPositions;
    let yearsOfOOMWins = [];

    let allRoundsReversed = [...allRounds].reverse();

    allRoundsReversed.forEach((rounds) => {
        oomPointsTotals = [0,0,0,0];
        if (rounds.isSeasonCompleted) {
            rounds.roundsForYearOfCompetition.forEach((round) => {
                stablefordScores = getStablefordScoresForRound(round);
                positions = getPositions(stablefordScores);
                oomPoints = getOOMPoints(stablefordScores, positions, round.isMajor);
                PLAYERS_ARRAY.map((player, i) => oomPointsTotals[i] += oomPoints[i]);
            });
            oomPositions = getPositions(oomPointsTotals);
            if (oomPositions[playerNumber] === 1) {
                yearsOfOOMWins.push(rounds.yearOfCompetition);
            }
        }
    });

    return yearsOfOOMWins;
}

export function getOOMHistory(allRounds) {
    let stablefordScores, positions, oomPoints, oomPointsTotals, oomPositions;
    let oomHistory = [];

    let allRoundsReversed = [...allRounds].reverse();

    allRoundsReversed.forEach((rounds) => {
        oomPointsTotals = [0,0,0,0];
        rounds.roundsForYearOfCompetition.forEach((round) => {
            stablefordScores = getStablefordScoresForRound(round);
            positions = getPositions(stablefordScores);
            oomPoints = getOOMPoints(stablefordScores, positions, round.isMajor);
            PLAYERS_ARRAY.map((player, i) => oomPointsTotals[i] += oomPoints[i]);
        });
        oomPositions = getPositions(oomPointsTotals);
        oomHistory.push({
            yearOfCompetition: rounds.yearOfCompetition,
            isSeasonCompleted: rounds.isSeasonCompleted,
            roundsCompleted: rounds.roundsForYearOfCompetition.length,
            positions: oomPositions,
            points: oomPointsTotals,
        });
    });

    return oomHistory;
}

export function getRandomNumber(nToRandomise) {
    return Math.floor(Math.random() * nToRandomise);
}

export function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
}

export function goToTopOfPage() {
    window.scrollTo(0, 0);
}

export function formatDate(dateOfFixtures) {
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // let date = new Date(dateOfFixtures);
    let date = compareDate(dateOfFixtures);

    let day = date.getDate();
    let dayOfWeek = date.getDay();
    let monthIndex = date.getMonth();
    // let year = date.getFullYear();
    // let sDaySuffix;

    // if (day === 1 || day === 21 || day === 31) {
    //     sDaySuffix = "st";
    // } else if (day === 2 || day === 22) {
    //     sDaySuffix = "nd";
    // } else if (day === 3 || day === 23) {
    //     sDaySuffix = "rd";
    // } else {
    //     sDaySuffix = "th";
    // }

    // return dateOfFixtures.substr(0, 4) + day + sDaySuffix + ' ' + monthNames[monthIndex];
    return (dayOfWeek !== 6 ? weekDays[dayOfWeek].substr(0, 3) + ' ' : "") + day + ' ' + monthNames[monthIndex].substr(0, 3) + ' ' + dateOfFixtures.substr(6, 4);
}

function compareDate(dateString){
    // str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
    var day   = parseInt(dateString.substring(0,2), 10);
    var month  = parseInt(dateString.substring(3,5), 10);
    var year   = parseInt(dateString.substring(6,10), 10);
    return new Date(year, month-1, day);
}

export function isDateValid(date) {

    let date2 = new Date(parseInt(date.substr(6,4),10), parseInt(date.substr(3,2), 10) - 1, parseInt(date.substr(0,2), 10));

    return date && !(date2 === "Invalid Date") && !isNaN(date2);
        // date.length === 10 &&
        // !isNaN(date.substr(0,1)) &&
        // !isNaN(date.substr(1,1)) &&
        // date.substr(2,1) === "/" &&
        // !isNaN(date.substr(3,1)) &&
        // !isNaN(date.substr(4,1)) &&
        // date.substr(5,1) === "/" &&
        // !isNaN(date.substr(6,1)) &&
        // !isNaN(date.substr(7,1)) &&
        // !isNaN(date.substr(8,1)) &&
        // !isNaN(date.substr(9,1)) &&
        // (!(date2 === "Invalid Date") && !isNaN(date2));
}

function changeViewPortHeightOfStatsElement(self) {
    let viewPortHeightOfStatsElement = getViewPortHeightOfStatsElement(self.statsBottom);

    if (viewPortHeightOfStatsElement > STATS_MIN_VIEWPOINT_HEIGHT) {
        self.setState({height: viewPortHeightOfStatsElement});
    } else if (viewPortHeightOfStatsElement < STATS_MIN_VIEWPOINT_HEIGHT && self.state.height > STATS_MIN_VIEWPOINT_HEIGHT) {
        self.setState({height: STATS_MIN_VIEWPOINT_HEIGHT});
    }
}

export function changeViewPortHeightOfStatsElementOnMount(self) {
    changeViewPortHeightOfStatsElement(self);
}

export function changeViewPortHeightOfStatsElementOnUpdate(self, prevState) {
    let viewPortHeightOfStatsElement = getViewPortHeightOfStatsElement(self.statsBottom);
    if (prevState.height !== viewPortHeightOfStatsElement) changeViewPortHeightOfStatsElement(self);
}

export function getViewPortHeightOfStatsElement(statsBottom) {
    let viewportOffset = statsBottom.getBoundingClientRect();
    let temp = Math.round((viewportOffset.bottom + window.pageYOffset + STATS_BOTTOM_MARGIN) / window.innerHeight * 100);
    return temp;
}

export function getPositionInArrayOfObjects(array, objectProperty, objectValue) {
    let i = 0;
    let len;

    for (i = 0, len = array.length; i < len; i++) {
        if (array[i][objectProperty] === objectValue) return i;
    }
    return -1;
}

export function deepSortAlpha(args) {
    // empArray.sort(multiSort( 'lastname','firstname')) Reverse with '-lastname'
    let sortOrder = 1;
    let prop = "";
    let aa = "";
    let bb = "";

    return function (a, b) {

        for (var i = 0; i < args.length; i++) {

            if (args[i][0] === '-') {
                prop = args[i].substr(1);
                sortOrder = -1;
            } else {
                sortOrder = (args[i] === "teamName") ? 1 : -1;
                prop = args[i]
            }

            aa = a[prop];
            bb = b[prop];

            if (aa < bb) return -1 * sortOrder;
            if (aa > bb) return 1 * sortOrder;
        }

        return 0
    }
}