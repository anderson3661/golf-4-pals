import React, {Component} from "react";

import {APP_TITLE, VISIBILITY_VISIBLE, VISIBILITY_HIDDEN} from '../../utilities/constants';
import * as helpers from '../../utilities/helper-functions/helpers';
import images from '../../utilities/data/images';

import "../../utilities/css/scroll-help.scss";
import "./home.scss";


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibility: VISIBILITY_VISIBLE
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        helpers.goToTopOfPage();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleScroll(e) {

        let visibility = (window.pageYOffset < 200) ? VISIBILITY_VISIBLE : VISIBILITY_HIDDEN;

        if (visibility !== this.state.visibility) {
            this.setState({visibility: visibility});
        }
    }


    render() {

        return (

            <div className="home">

                <div className="img1">
                    <div className="img-text mainHeader">
                        <span>{APP_TITLE}</span>
                        {/* <p>Scroll down to continue</p> */}
                    </div>
                    {/* <div className="scroll-help" style={{visibility: this.state.visibility}}> */}
                    <div className={`scroll-help ${this.state.visibility}`}>
                        <div className="image">
                            <span>Scroll down to view more</span>
                        </div>
                        <div className="indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>

                <section className="section section-light">
                    <h2 className="section-left">How It Came To Be</h2>
                    <p>The four first got to know each other through football in the 1990s.  Steve Pearce and Martin Anderson both worked for 
                        London & Edinburgh Insurance in Broadwater (Worthing) and both played for the Company football team. Dave Bishop and
                        Jack Fergus also played for the team, as outsiders.  Towards the end of the 1990s Pearce, Bishop and Fergus retired from
                        football but continued to spectate.
                    </p>
                    <p>The mid-1990s saw the four joining the popular Company golf society, which played once a month at courses in the South of England
                        (i.e. Sussex, Surrey, Kent and Hampshire), and further cemented their friendship.
                    </p>
                    <p>Around 2003 Martin Anderson retired from playing football, and the four started to play golf.  To add a more competitive element
                        to the already competitive rounds, the Order of Merit competition you see in this application was started in 2004.
                    </p>
                </section>

                <div className="img2">
                    <div className="img-text inverse"><span>The 19th Hole</span></div>
                </div>

                <section className="section section-light">
                    <h2>How It Works</h2>
                    <p>
                        The players compete for an Order of Merit.  This comprises 20 rounds, typically over the course of a calendar year, 
                        although this can be extended due to other commitments.  Within each round points are awarded based on the number of 
                        Stableford points scored, and additional points are awarded based on each player's finishing position. Within 
                        the 20 rounds there are also 4 'majors', which are agreed by the players before the start of the appropriate round, and for which 
                        finishing position points are doubled.  Handicaps are also agreed before the start of a round.
                    </p>
                    <div className="howItWorks">
                        <table className="stablefordScore">
                            <tbody>
                                <tr>
                                    <td>Stableford Score</td>
                                    <td>Order of Merit Points</td>
                                </tr>
                                <tr>
                                    <td>40+</td>
                                    <td>7</td>
                                </tr>
                                <tr>
                                    <td>38-39</td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td>36-37</td>
                                    <td>5</td>
                                </tr>
                                <tr>
                                    <td>33-35</td>
                                    <td>4</td>
                                </tr>
                                <tr>
                                    <td>30-32</td>
                                    <td>3</td>
                                </tr>
                                <tr>
                                    <td>27-29</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>24-26</td>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="finishingPosition">
                            <tbody>
                                <tr>
                                    <td>Finishing Position</td>
                                    <td>Order of Merit Points</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>1st</td>
                                    <td>3</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>2nd</td>
                                    <td>2</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>3rd</td>
                                    <td>1</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>
                                <tr>
                                    <td colSpan="3">N.B. Order of Merit points are doubled in majors</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        The 4 players are shown below, in alphabetical order of first name.  This convention is used throughout the application.
                    </p>
                </section>

                {/* <section id="wrapper" className="skewed">
                    <div className="layer top">
                        <div className="content-wrap">
                            <div className="content-body">
                                <h1>First view of the sea</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quibusdam dolorem molestiae voluptatum! Aliquam eaque odit, alias cum dolore corporis.</p>
                            </div>
                            <img src={require("../../assets/images/miscellaneous/lawn3.jpg")} alt="" />
                        </div>
                    </div>

                    <div className="layer bottom">
                        <div className="content-wrap">
                            <div className="content-body">
                                <h1>First view of Finisterre</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quibusdam dolorem molestiae voluptatum! Aliquam eaque odit, alias cum dolore corporis.</p> -->
                            </div>
                            <img src={require("../../assets/images/miscellaneous/lawn3.jpg")} alt="" />
                        </div>
                    </div>

                    <div className="handle"></div>
                </section> */}

                <div className="img3">
                    <div className="img-text inverse"><span>Dave Bishop</span></div>
                </div>

                <section className="section section-dark playerProfile">
                    <div className="playerProfileImage-container">
                        <div className="playerProfileImage">
                            <img src={helpers.getPlayerImageForHome(images, "dave")} alt=""></img>
                        </div>
                        <h2>Dave Bishop</h2>
                    </div>
                    <div className="playerProfileSummary">
                        <p>Tall, elegant, and with probably the swing that is the most pleasing to the eye of all the four players.</p>
                        <p>Dave is long off the tee, and often likes to take his driver out to give him that extra distance.</p>
                        <p>However, Dave's greatest weakness is the inconsistency of the swing, and shots can often go off the straight and narrow.</p>                        
                        <p>Dave is extremely laid back, and his laissez-faire attitude to life is reflected in his golf, which always makes him a pleasure to play of round of golf with.</p>
                    </div>
                </section>

                <div className="img4">
                    <div className="img-text inverse"><span>Jack Fergus</span></div>
                </div>

                <section className="section section-dark playerProfile">
                    <div className="playerProfileImage-container">
                        <div className="playerProfileImage">
                            <img src={helpers.getPlayerImageForHome(images, "jack")} alt=""></img>
                        </div>
                        <h2>Jack Fergus</h2>
                    </div>
                    <div className="playerProfileSummary">
                        <p>A stereotypical proud Scotsman and the oldest of the players, by quite a considerable margin, Jack nevertheless belies his aging years and body on the golf course.</p>
                        <p>Jack's game is subject to periods of brilliance, or dross.  That is often reflected in his mood as well, and it's fair to say that the other players often prefer to see him winning!!</p>
                        <p>Hitting a good length of the tee, Jack's approach play to the green can be a strength, as with his short game.  But when off his game, it can all fall apart.</p>
                        <p>One of the highlights (or lowlights) of each round, whether pre-round or post-round, is the moment when Jack tells his latest joke (or if you're unlucky jokes).</p>
                    </div>
                </section>

                <div className="img5">
                    <div className="img-text inverse"><span>Martin Anderson</span></div>
                </div>

                <section className="section section-dark playerProfile">
                    <div className="playerProfileImage-container">
                        <div className="playerProfileImage">
                            <img src={helpers.getPlayerImageForHome(images, "martin")} alt=""></img>
                        </div>
                        <h2>Martin Anderson</h2>
                    </div>
                    <div className="playerProfileSummary">
                        <p>Unpredictable is probably the best word to sum up Martin's golf.</p>
                        <p>Able to hit a long ball off the tee, able to play good approach shots and able to produce a decent short game; unfortunately one of these facets is likely to go wrong during any round.</p>
                        <p>During one memorable summer when Martin was able to practice twice a week at West Chiltington, whilst taking his soon to Air Cadets at Storrington, he proved that he can play good golf by bringing his handicap down to 12.  However, it quickly went back up when the practice stopped!</p>
                        <p>Martin is the statistician of the group, maintains this website, and organises other associated competitions.</p>
                    </div>
                </section>

                <div className="img6">
                    <div className="img-text inverse"><span>Steve Pearce</span></div>
                </div>

                <section className="section section-dark playerProfile">
                    <div className="playerProfileImage-container">
                        <div className="playerProfileImage">
                            <img src={helpers.getPlayerImageForHome(images, "steve")} alt=""></img>
                        </div>
                        <h2>Steve Pearce</h2>
                    </div>
                    <div className="playerProfileSummary">
                        <p>Consistantly the best player out of the four, Steve's game is, funnily enough, based on consistancy.</p>
                        <p>Hitting a good straight ball off the tee, and whilst not being the longest, you are more often than not likely to see Steve hitting his second shot from the fairway.</p>
                        <p>Following on from that, Steve's main strengths are his approach play and short game, which can both usually be relied on to deliver the goods.</p>
                        <p>Like Dave, Steve also has a laid back attitude to his golf, playing each hole on it's merits, and rarely having a bad run of holes.</p>
                    </div>
                </section>

                {/* <div className="img8">
                    <div className="img-text inverse"><span>The 19th Hole</span></div>
                </div>

                <section className="section section-dark"> */}
                    
                {/* </section> */}

                <div className="img8">
                    {/* <div className="img-text"><span>{APP_TITLE}</span></div> */}
                    <div className="img-text"><span>The 19th Hole</span></div>
                </div>

            </div>

        )
    }
}

export default Home;