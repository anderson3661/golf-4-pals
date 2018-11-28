import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

import {PLAYERS_ARRAY, PLAYERS_FULL_NAMES_ARRAY, EAGLE, BIRDIE, HANDICAP_ELEMENT, STABLEFORD_SCORES_ELEMENT} from '../../utilities/constants';
import * as helpers from '../../utilities/helper-functions/helpers';

import "../../utilities/css/stats.scss";
import "./player-profiles.scss";


const PlayerProfiles = (props) => {

    const {allRounds, courses} = props.appData;

    return (
        <div className="stats-outer">
            <div className="container-main-content-player-profiles">

                {PLAYERS_ARRAY.map((player, playerNumber) => {
                        
                    let numberOfOOMWins = helpers.getNumberOfOOMWins(allRounds);
                    let eagles = helpers.getHoleScoreType(allRounds, courses, EAGLE, player);
                    let birdies = helpers.getHoleScoreType(allRounds, courses, BIRDIE, player);
                    let winsMajor = helpers.getWins(allRounds, courses, true, playerNumber);
                    let winsNonMajor = helpers.getWins(allRounds, courses, false, playerNumber);
                    let avgeStableFordScore = helpers.getAverage(allRounds, STABLEFORD_SCORES_ELEMENT, player);
                    let avgeHandicap = helpers.getAverage(allRounds, HANDICAP_ELEMENT, player);

                    return (
                        <div key={playerNumber} className="container-card">
                            <h2>{PLAYERS_FULL_NAMES_ARRAY[playerNumber]}</h2>
                            <img className="thumbnail" src={helpers.getPlayerImage(PLAYERS_ARRAY[playerNumber], "imageHeadAndShoulders")} alt="" />
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Order of Merit wins:</td>
                                        <td>{numberOfOOMWins[playerNumber]}</td>
                                    </tr>
                                    <tr><td className="spacer"></td></tr>
                                    <tr>
                                        <td>Major Wins:</td>
                                        <td>{winsMajor.length}</td>
                                    </tr>
                                    <tr>
                                        <td>Non-Major Wins:</td>
                                        <td>{winsNonMajor.length}</td>
                                    </tr>
                                    <tr><td className="spacer"></td></tr>
                                    <tr>
                                        <td>Eagles:</td>
                                        <td>{eagles.length}</td>
                                    </tr>
                                    <tr>
                                        <td>Birdies:</td>
                                        <td>{birdies.length}</td>
                                    </tr>
                                    <tr><td className="spacer"></td></tr>
                                    <tr>
                                        <td>Avge Stableford Score:</td>
                                        <td>{avgeStableFordScore}</td>
                                    </tr>
                                    <tr>
                                        <td>Avge Handicap:</td>
                                        <td>{avgeHandicap}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="playerProfile"><NavLink to={`/playerprofile/${playerNumber}`}>Full Profile</NavLink></p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)})


PlayerProfiles.propTypes = {
    appData: PropTypes.object.isRequired
}


export default connect(mapStateToProps, null)(PlayerProfiles);