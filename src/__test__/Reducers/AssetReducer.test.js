import AssetReducer, { initialState } from "../../Redux/Reducer/AssetReducer";

describe('it should check assets reducers', () => {

    it('it should check for ASSET_LIST', () => {
        const action = {
            type: 'ASSET_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(AssetReducer(initialState, action)).toStrictEqual({
            assetList: [],
            getAssetStatusCode: 200,
            addAssetStatusCode: 0,
            deleteAssetStatusCode: 0,
            GetRoomList: [],
            addAssignAssetStatusCode: 0,
            alreadySerialNumberHere: '',
            alreadyAssetNameHere: '',
            NoDataAssetStatusCode: 0,
            getRoomStatusCode: 0,
            bankAmountError: ''
        })
    })

    it('it should clear CLEAR_GET_ASSET_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_GET_ASSET_STATUS_CODE'
        }

        expect(AssetReducer({...initialState, getAssetStatusCode: 200}, action)).toStrictEqual({
            assetList: [],
            getAssetStatusCode: 0,
            addAssetStatusCode: 0,
            deleteAssetStatusCode: 0,
            GetRoomList: [],
            addAssignAssetStatusCode: 0,
            alreadySerialNumberHere: '',
            alreadyAssetNameHere: '',
            NoDataAssetStatusCode: 0,
            getRoomStatusCode: 0,
            bankAmountError: ''
        })
    })

    it('it should clear GET_ROOMS', () => {
        const action = {
            type: 'GET_ROOMS', 
            payload: {
                response: [],
                statusCode: 200
            }
        }

        expect(AssetReducer({...initialState}, action)).toStrictEqual({
            assetList: [],
            getAssetStatusCode: 0,
            addAssetStatusCode: 0,
            deleteAssetStatusCode: 0,
            GetRoomList: [],
            addAssignAssetStatusCode: 0,
            alreadySerialNumberHere: '',
            alreadyAssetNameHere: '',
            NoDataAssetStatusCode: 0,
            getRoomStatusCode: 200,
            bankAmountError: ''
        })
    })
})