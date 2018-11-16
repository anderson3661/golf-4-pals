import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import * as helpers from '../../utilities/helper-functions/helpers';


const HoleScoreType = (props) => {

    const {allRounds, courses } = props.appData;
    const {scoreType, player} = props;

    const scores = helpers.getHoleScoreType(allRounds, courses, scoreType, player);

    return (
        <div className="container-card">

            {scores.length === 0 ?

                <h2 className="heading">{scoreType.toProperCase()} - None</h2>

                :

                <Fragment>
                    <h2 className="heading">{scoreType.toProperCase()}</h2>
                    <div className="stats holeScoreType">

                        <table>
                            <thead>
                                <tr className="headings">
                                    <th>Year of Competition</th>
                                    <th>Round</th>
                                    <th>Date</th>
                                    <th></th>
                                    <th className="courseName">Course</th>
                                    <th>Hole</th>
                                    <th>Yardage</th>
                                    <th>Par</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores.map((type, i) => {
                                    return (
                                        <tr key={i} className="holeRow">
                                            <td className="yearOfCompetition">{type.yearOfCompetition}</td>
                                            <td className="roundNumber">{type.roundNumber}</td>
                                            <td className="dateOfRound">{type.dateOfRound}</td>
                                            <td className="spacer"></td>
                                            <td className="courseName"><NavLink to={`/scorecard/${type.yearOfCompetition}/${type.roundNumber}`}>{ type.courseName }</NavLink></td>
                                            <td className="holeNumber">{type.holeNumber}</td>
                                            <td className="yardage">{type.yardage}</td>
                                            <td className="par">{type.par}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        <p className="winsSummary">Total:<span>{scores.length}</span></p>

                    </div>
                </Fragment>

            }

        </div>        
    )
}


HoleScoreType.propTypes = {
    appData: PropTypes.object.isRequired,
    scoreType: PropTypes.string.isRequired,
    player: PropTypes.string.isRequired
}


export default HoleScoreType;