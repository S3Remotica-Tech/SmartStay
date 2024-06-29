
const initialState = {
   assetList: [],
   getAssetStatusCode:0,
   addAssetStatusCode:0
}

const AssetReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ASSET_LIST':
            return { ...state,assetList: action.payload.response ,getAssetStatusCode:action.payload.statusCode}
           case 'CLEAR_GET_ASSET_STATUS_CODE' :
            return { ...state, getAssetStatusCode : 0}
            case 'ADD_ASSET':
                return {...state, addAssetStatusCode:action.payload.statusCode}
                case 'CLEAR_ADD_ASSET_STATUS_CODE':
                    return {...state, addAssetStatusCode:0}
       
    }
    return state;
}
export default AssetReducer;