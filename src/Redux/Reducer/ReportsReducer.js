export const initialState = {
    getReportsList: '',
    getSuccessReports: 0
}


const ReportsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_ALL':
            return initialState;
        case 'GET_REPORTS_REDUCER':
            return { ...state, getReportsList: action.payload.response, getSuccessReports: action.payload.statusCode }
        case 'CLEAR_GET_REPORTS_REDUCER':
            return { ...state, getSuccessReports: 0 }
        default:
            return state;
    }
}
export default ReportsReducer;