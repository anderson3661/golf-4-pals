import courses from './courses';
import allRounds from './rounds';
import allReports from './reports';

const APP_DATA_LOCAL_STORAGE = "golf_exLandEPlayers_AppInfo";

const SELECTED_YEAR_ORDER_OF_MERIT = 2007;
const SELECTED_YEAR_NEAREST_THE_PINS = 2007;
const SELECTED_YEAR_SCORES_BY_HOLE = 2007;
const SELECTED_YEAR_STORY_OF_THE_SEASON = 2007;
const SELECTED_COURSE_SCORES_BY_HOLE = 'Rookwood';
const SELECTED_COURSE_SCORES_BY_COURSE = 'Rookwood';
const SELECTED_PAR_SCORES_BY_HOLE = 4;

export function getAppData() {
    let appData = {};
    let confirmationMessage = "";
    let appDataFromLocalStorage = "";

    if (typeof (Storage) !== "undefined") {

        // localStorage.removeItem(APP_DATA_LOCAL_STORAGE);     //Use to clear file on Firebase if necessary, especially if object has new properties

        appDataFromLocalStorage = localStorage.getItem(APP_DATA_LOCAL_STORAGE);

        if (appDataFromLocalStorage === null) {
            setAppData(appData, true);
        } else {
            appData = JSON.parse(appDataFromLocalStorage);
        }

    } else {
        confirmationMessage = "Sorry ... cannot use this application because your browser doesn't support local storage";
    }

    return {appData: appData, confirmationMessage}

}

function setAppData(appData, useDefaults) {
    appData.courses = courses;
    appData.allRounds = allRounds;
    appData.allReports = allReports;

    if (useDefaults) {
        appData.miscInfo = {
            selectedYearOrderOfMerit: SELECTED_YEAR_ORDER_OF_MERIT,
            selectedYearNearestThePins: SELECTED_YEAR_NEAREST_THE_PINS,
            selectedYearScoresByHole: SELECTED_YEAR_SCORES_BY_HOLE,
            selectedYearStoryOfTheSeason: SELECTED_YEAR_STORY_OF_THE_SEASON,
            selectedCourseScoresByHole: SELECTED_COURSE_SCORES_BY_HOLE,
            selectedCourseScoresByCourse: SELECTED_COURSE_SCORES_BY_COURSE,
            selectedParScoresByHole: SELECTED_PAR_SCORES_BY_HOLE,
            dataStorage: 'Browser'
        };
    }

}

export function saveAppData(appData, confirmSaveMessage = false) {
    localStorage.setItem(APP_DATA_LOCAL_STORAGE, JSON.stringify(appData));
    return confirmSaveMessage ? "Changes saved" : "";
}

export function deleteAppData() {
    deleteFromLocalStorage();
}

function deleteFromLocalStorage() {
    localStorage.removeItem(APP_DATA_LOCAL_STORAGE);
    // getAppData();
}