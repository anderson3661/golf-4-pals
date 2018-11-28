import React, { Component } from "react";
import { connect } from 'react-redux'

import {PLAYERS_ARRAY, PLAYERS_FULL_NAMES_ARRAY, EAGLE, BIRDIE} from '../../utilities/constants';
import * as helpers from '../../utilities/helper-functions/helpers';

import images from '../../utilities/data/images';

import OOMHistory from './stats-oom-history';
import Wins from './stats-wins';
import HoleScoreType from './stats-hole-score-type';
import BestRounds from './stats-best-rounds';

import "./player-profile.scss";


class PlayerProfile extends Component {
    
    componentDidMount() {
        helpers.goToTopOfPage();
    }
    
    getPlayerImage = (playerNumber) => {
        const image = images.players[PLAYERS_ARRAY[playerNumber]].imagePuttingCloseUpOfPlayer;
    
        return {
            backgroundImage: `url(${ image })`
        }
    }

    render() {
    
        const playerNumber = parseInt(this.props.match.params.playerNumber, 10);
        const player = PLAYERS_ARRAY[playerNumber];

        return (

            <div className="container-img-and-profile">

                <div className="img" style={this.getPlayerImage(playerNumber)}>
                    <div className="img-text transparent">{PLAYERS_FULL_NAMES_ARRAY[playerNumber]}</div>
                </div>

                <div className="container-player-profile">

                    <OOMHistory playerNumber={playerNumber} {...this.props} />

                    <BestRounds player={player} playerNumber={playerNumber} {...this.props} />
                    
                    <Wins isMajors={true} playerNumber={playerNumber} {...this.props} />
                    <Wins isMajors={false} playerNumber={playerNumber} {...this.props} />

                    <HoleScoreType scoreType={EAGLE} player={player} {...this.props} />
                    <HoleScoreType scoreType={BIRDIE} player={player} {...this.props} />

                </div>

            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)})

export default connect(mapStateToProps, null)(PlayerProfile);