import * as actions from './actions';
import * as helpers from '../utilities/helper-functions/helpers';

const initialState = {
    //Load new data for the app in the App component rather than in this reducer because error/confirmation messages can be displayed easier in the App component
    // appData: new Data().getAppData()
};

export function updateAdminReducer(state = initialState, action) {
    let newState;
    let courses;
    let allRounds;
    let allReports;
    let courseArrayNumber;
    let roundDetails;
    let newAllRoundsLatestYear;
    let newAllReportsLatestYear;

    switch (action.type) {

        case actions.APP_LOAD_INITIAL_DATA :
        case actions.ADMIN_RESET_APP :
            // console.log('state: ', state);
            // console.log('action.data: ', action.data);
            newState = Object.assign({}, state, action.data);
            // console.log('newState: ', newState);

            return newState;

        case actions.ADMIN_UPDATE :
        case actions.UPDATE_SELECTED_COURSE :
        case actions.UPDATE_SELECTED_YEAR :
        case actions.UPDATE_SELECTED_PAR :
            newState = Object.assign({}, state);

            //Loop through the object, i.e. miscInfo
            Object.keys(action.data).forEach(e => {
                newState.appData.miscInfo[e] = action.data[e];
            });

            return newState;

        case actions.CREATE_COURSE :
            newState = {
                ...state,
                appData: {
                    ...state.appData,
                    courses: [...state.appData.courses, action.data]
                }
            }

            return newState;

        case actions.CREATE_ROUND :
            allRounds = state.appData.allRounds;
            allReports = state.appData.allReports;
            
            newAllRoundsLatestYear = helpers.updateRoundsForYearOfCompetition(allRounds, "CREATE", action.data);
            newAllReportsLatestYear = helpers.updateReportsForYearOfCompetition(allRounds, allReports, "CREATE", action.data);

            newState = {
                ...state,
                appData: {
                    ...state.appData,
                    allRounds: [newAllRoundsLatestYear, ...allRounds.slice(1)],
                    allReports: [newAllReportsLatestYear, ...allReports.slice(1)]
                }
            }

            return newState;

        case actions.UPDATE_COURSE :
            courses = state.appData.courses;
            courseArrayNumber = action.data.courseArrayNumber;

            newState = {
                ...state,
                appData: {
                    ...state.appData,
                    courses: helpers.updateElementInArray(courses, courseArrayNumber, action.data.course)
                }
            }

            return newState;

        case actions.UPDATE_ROUND :
            allRounds = state.appData.allRounds;
            allReports = state.appData.allReports;
            roundDetails = action.data.roundDetails;

            newAllRoundsLatestYear = helpers.updateRoundsForYearOfCompetition(allRounds, "UPDATE", action.data);
            newAllReportsLatestYear = helpers.updateReportsForYearOfCompetition(allRounds, allReports, "UPDATE", action.data);

            newState = {
                ...state,
                appData: {
                    ...state.appData,
                    allRounds: [newAllRoundsLatestYear, ...allRounds.slice(1)],
                    allReports: [newAllReportsLatestYear, ...allReports.slice(1)]
                }
            }

            return newState;

        case actions.DELETE_COURSE :
            courses = state.appData.courses;
            courseArrayNumber = action.data.courseArrayNumber;

            newState = {
                ...state,
                appData: {
                    ...state.appData,
                    courses: helpers.deleteElementFromArray(courses, courseArrayNumber)
                }
            }

            return newState;

        case actions.DELETE_ROUND :
            allRounds = state.appData.allRounds;
            allReports = state.appData.allReports;
            roundDetails = action.data.roundDetails;

            newState = {
                ...state,
                appData: {
                    ...state.appData,
                    allRounds: helpers.deleteElementFromRoundsArray(allRounds, roundDetails),
                    allReports: helpers.deleteElementFromReportsArray(allRounds, allReports, roundDetails)
                }
            }

            return newState;

        default:
            return state;
    }
}