import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAppData as helperGetAppData } from './utilities/data/data';
import Header from './components/nav/header';
import Footer from './components/nav/footer';
import NotMobileFriendly from './components/not-mobile-friendly/not-mobile-friendly';
import Routes from './components/nav/routes';
import { appLoadInitialData } from './redux/actions';

import './App.scss';
// import './utilities/css/nav.css';
// import './utilities/css/stats.css';


class App extends Component {

    constructor(props) {
        super(props);
        const {dispatch} = this.props;
        
        //Load new data for the app here rather than in the reducer because error/confirmation messages can be displayed easier here
        let data = helperGetAppData();
        // console.log('App props: ', data);
        dispatch(appLoadInitialData(data));
    }
  
    render() {
        return (
            <Router>
                <div className="outer-container">
                    <Header />
                    <Routes />
                    <Footer />
                    <NotMobileFriendly />
                </div>                   
            </Router>
        );
    }
}


//Call this function to connect to Redux and get a handle to dispatch (used above), so can pass null for the 2 parameters
App = connect(null, null)(App)

export default App;