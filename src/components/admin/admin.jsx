import React, { Component } from 'react';
import { connect } from 'react-redux';

import { adminResetApp } from '../../redux/actions';

import * as helpers from '../../utilities/helper-functions/helpers';
import { getAppData as helperGetAppData, deleteAppData as helperDeleteAppData } from '../../utilities/data/data';

import ConfirmationDialog from '../dialogs/confirmationDialog';
import ConfirmationYesNo from '../dialogs/confirmYesNo';

import Button from "@material-ui/core/Button";

import '../stats-scorecard/scorecard.css';
import './admin.css';

class Admin extends Component {

    state = {
        dialogResetAppYesNoIsOpen: false,
        dialogResetAppYesSelected: false,
        dialogResetAppConfirmIsOpen: false
    }

    componentDidMount() {
        helpers.goToTopOfPage();
    }

    handleResetApp = () => {
        this.setState({dialogResetAppYesNoIsOpen: true});
    }

    handleDialogYesNoCloseResetApp = (value) => {
        this.setState({ dialogResetAppYesSelected: value, dialogResetAppYesNoIsOpen: false }, () => {
            if (this.state.dialogResetAppYesSelected) {
                const { dispatch } = this.props;
                helperDeleteAppData();              // Delete the stored app data
                let data = helperGetAppData(true);
                // console.log('Data :', data);

                dispatch(adminResetApp(data));

                this.setState({dialogResetAppConfirmIsOpen: true});
            }
        });
    }

    handleDialogConfirmCloseResetApp = () => {
        this.setState({ dialogResetAppConfirmIsOpen: false })
    }

    render() {

        const {dialogResetAppYesNoIsOpen, dialogResetAppYesSelected, dialogResetAppConfirmIsOpen} = this.state;

        return (

            <div className="stats-outer">

                <div className="stats scorecard admin">

                    <div className="admin-inner">

                        <header className="header">Administration</header>

                    </div>

                    <div className="buttons">
                        <Button variant="contained" color="secondary" id="resetApp" onClick={this.handleResetApp}>Reset App</Button>
                            <ConfirmationYesNo message="Are you sure you want to reset the app ?" dialogYesNoSelectedIsYes={dialogResetAppYesSelected} open={dialogResetAppYesNoIsOpen} onClose={this.handleDialogYesNoCloseResetApp} />
                            <ConfirmationDialog message="App has been reset" open={dialogResetAppConfirmIsOpen} onClose={this.handleDialogConfirmCloseResetApp} />
                    </div>

                </div>

            </div>

        )
    }

}

const mapStateToProps = (state, ownProps) => ({appData: Object.assign({}, state.appData)})

export default connect(mapStateToProps, null)(Admin);