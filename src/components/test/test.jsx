import React from "react";
import { connect } from 'react-redux'
import CircularIndeterminate from '../loading/loading';

import "./test.scss";


class Test extends React.Component {
    
    render() {
        return (
            <CircularIndeterminate />
        );
      }
}

const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)})

export default connect(mapStateToProps, null)(Test);