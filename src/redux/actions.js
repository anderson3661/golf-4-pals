// ACTION TYPE CONSTANTS

export const APP_LOAD_INITIAL_DATA = 'APP_LOAD_INITIAL_DATA';
export const ADMIN_UPDATE = 'ADMIN_UPDATE';
export const ADMIN_RESET_APP = 'ADMIN_RESET_APP';
export const CREATE_COURSE = 'CREATE_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const CREATE_ROUND = 'CREATE_ROUND';
export const UPDATE_ROUND = 'UPDATE_ROUND';
export const DELETE_ROUND = 'DELETE_ROUND';
export const UPDATE_SELECTED_COURSE = 'UPDATE_SELECTED_COURSE';
export const UPDATE_SELECTED_YEAR = 'UPDATE_SELECTED_YEAR';
export const UPDATE_SELECTED_PAR = 'UPDATE_SELECTED_PAR';


// ACTION CREATORS

export const appLoadInitialData = data => ({type: APP_LOAD_INITIAL_DATA, data});
export const adminUpdate = data => ({type: ADMIN_UPDATE, data});
export const adminResetApp = data => ({type: ADMIN_RESET_APP, data});
export const createCourse = data => ({type: CREATE_COURSE, data});
export const updateCourse = data => ({type: UPDATE_COURSE, data});
export const deleteCourse = data => ({type: DELETE_COURSE, data});
export const createRound = data => ({type: CREATE_ROUND, data});
export const updateRound = data => ({type: UPDATE_ROUND, data});
export const deleteRound = data => ({type: DELETE_ROUND, data});
export const updateSelectedCourse = data => ({type: UPDATE_SELECTED_COURSE, data});
export const updateSelectedYear = data => ({type: UPDATE_SELECTED_YEAR, data});
export const updateSelectedPar = data => ({type: UPDATE_SELECTED_PAR, data});