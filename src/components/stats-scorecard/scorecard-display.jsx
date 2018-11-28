import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import {PLAYERS_ARRAY} from '../../utilities/constants';
import * as helpers from '../../utilities/helper-functions/helpers';

import WinnerStar from '@material-ui/icons/Star';

import './scorecard.scss';


const ScorecardDisplay = (props) => {

    let holeNumber;
    let scorePrefix;
    let scoreClass

    const {yearOfCompetition, roundNumber, isMajor, winners, report} = props;

    return (
        <Fragment>

            <div className="report">
                {report && <h2 className="heading">{report.heading}</h2>}
                {report && <div>{ReactHtmlParser(report.commentary)}</div>}
                <p className="roundInfo">{`${yearOfCompetition} Order of Merit - Round ${roundNumber}${isMajor ? ' - MAJOR' : ''}`}</p>
            </div>

            <div className="stats scorecard oom">

                <header className="header">
                    {isMajor &&
                        <span className="major"><WinnerStar className="winnerStar" />
                            <span className="majorText">MAJOR</span>
                        </span>
                    }
                    <span className="courseName">{props.course.courseName}&nbsp;&nbsp;-&nbsp;&nbsp;{helpers.formatDate(props.playersScores.dateOfRound)}</span>
                    <span
                        className="winners">Winner{winners.length > 1 ? "s" : ""}
                        {winners.map((player, i) => (<img key={i} className="img-winners" src={helpers.getPlayerImage(player)} alt="" />))}
                    </span>
                </header>

                <table className="scorecard">

                    <colgroup>
                    <col />
                        <col />
                        <col />
                        <col className="yards" />
                        <col />
                    </colgroup>

                    <thead>

                        <tr className="headings">
                            <th className="holeNumber">Hole</th>
                            <th className="holeName">Name</th>
                            <th className="par">Par</th>
                            <th className="yardage">Yellow Yards</th>
                            <th className="strokeIndex">Stroke Index</th>
                            {PLAYERS_ARRAY.map((player, i) => <th key={i} className="names">{player.toProperCase()}{'\n'}( {props.playersScores[player][0]} )</th>)}
                        </tr>

                    </thead>

                    <tbody>

                        {props.course.holes.map((round, i) => {

                            holeNumber = i + 1;

                            return (
                                <Fragment key={i}>

                                    {holeNumber === 10 && <DisplayTotals className="subTotalsRow" rowTitle="OUT" holesType="frontNine" {...props} />}

                                    <tr className="hole">                            
                                        <td>{holeNumber}</td>
                                        <td>{props.course.holes[holeNumber-1].holeName}</td>
                                        <td>{props.course.holes[holeNumber-1].par}</td>
                                        <td>{props.course.holes[holeNumber-1].yardage}</td>
                                        <td className="strokeIndex">{props.course.holes[holeNumber-1].strokeIndex}</td>

                                        {props.scoresAndPoints.map((scoreAndPoints, j) => {
                                            scorePrefix = scoreAndPoints[holeNumber-1].substring(0,1);
                                            scoreClass = (scorePrefix === "P" ? "key-par" : (scorePrefix === "B" ? "key-birdie" : (scorePrefix === "E" ? "key-eagle" : "")));
                                            return <td key={j} className={scoreClass}>{scoreAndPoints[holeNumber-1].substring(1)}</td>
                                        })}
                                    </tr>

                                </Fragment>
                            )
                        })}

                        <DisplayTotals className="subTotalsRow" rowTitle="IN" holesType="backNine" {...props} />

                        <DisplayTotals className="totalsRow" rowTitle="TOTAL" holesType="allHoles" {...props} />

                        <tr className="key">
                            <td colSpan="4" className="actualScorecard"><a href = {helpers.getActualScorecard(yearOfCompetition, roundNumber)} target = "_blank" rel="noopener noreferrer">Download Actual Scorecard</a></td>
                            <td colSpan="5">Colour Key: <span className="key-par">Par</span><span className="key-birdie">Birdie</span><span className="key-eagle">Eagle</span></td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </Fragment>
    )

}

const DisplayTotals = (props) => {
    let winners = helpers.getPositionsOfTotals(props.playersPointsTotals[props.holesType]);
    return (
        <tr className={props.className}>
            <td>{props.rowTitle}</td>
            <td></td>
            <td>{props.courseParTotals[props.holesType]}</td>
            <td>{props.courseYardageTotals[props.holesType]}</td>
            <td>&nbsp;</td>
            {props.playersPointsTotals[props.holesType].map((points, playerNumber) => (
                <td key={playerNumber}><span className={winners.includes(PLAYERS_ARRAY[playerNumber]) ? "totals-winners" : ""}>{points}</span></td>)
            )}
        </tr>
    )
}


ScorecardDisplay.propTypes = {
    yearOfCompetition: PropTypes.number.isRequired,
    roundNumber: PropTypes.number.isRequired,
    isMajor: PropTypes.bool.isRequired,
    winners: PropTypes.array.isRequired,
    report: PropTypes.object.isRequired
}


export default ScorecardDisplay;