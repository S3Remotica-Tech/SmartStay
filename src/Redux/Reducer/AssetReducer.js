
const initialState = {
    assetList: [],
    getAssetStatusCode: 0,
    addAssetStatusCode: 0,
    deleteAssetStatusCode: 0,
    GetRoomList: [],
    addAssignAssetStatusCode: 0,
    alreadySerialNumberHere: ''
}

const AssetReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ASSET_LIST':
            return { ...state, assetList: action.payload.response, getAssetStatusCode: action.payload.statusCode }
        case 'CLEAR_GET_ASSET_STATUS_CODE':
            return { ...state, getAssetStatusCode: 0 }
        case 'ADD_ASSET':
            return { ...state, addAssetStatusCode: action.payload.statusCode }
        case 'CLEAR_ADD_ASSET_STATUS_CODE':
            return { ...state, addAssetStatusCode: 0 }
        case 'DELETE_ASSET':
            return { ...state, deleteAssetStatusCode: action.payload.statusCode }
        case 'CLEAR_DELETE_ASSET_STATUS_CODE':
            return { ...state, deleteAssetStatusCode: 0 }
        case 'GET_ROOMS':
            return { ...state, GetRoomList: action.payload.response }
        case 'ASSIGN_ASSET':
            return { ...state, addAssignAssetStatusCode: action.payload.statusCode }
        case 'CLEAR_ASSIGN_STATUS_CODE':
            return { ...state, addAssignAssetStatusCode: 0 }

        case 'SERIAL_NUMBER_ERROR':
            return { ...state, alreadySerialNumberHere: action.payload }
        case 'CLEAR_SERIAL_NUMBER_ERROR':
            return { ...state, alreadySerialNumberHere: '' }
    }
    return state;
}
export default AssetReducer;