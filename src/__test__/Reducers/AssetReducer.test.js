import AssetReducer, { initialState } from "../../Redux/Reducer/AssetReducer";

describe('it should check assets reducers', () => {

    it('it should check for RESET_ALL', () => {

        const modifyState = {
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
            bankAmountError: '',
            assetError: ''
        }
        const action = {
            type: 'RESET_ALL',

        }
        const result = AssetReducer(modifyState, action);
        expect(result).toStrictEqual(initialState);
    })


    it('it should check for ASSET_LIST', () => {
        const action = {
            type: 'ASSET_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(AssetReducer(initialState, action)).toStrictEqual({
            ...initialState,
            assetList: [],
            getAssetStatusCode: 200,
        })
    })

    it('it should clear CLEAR_GET_ASSET_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_GET_ASSET_STATUS_CODE'
        }

        expect(AssetReducer({ ...initialState, getAssetStatusCode: 200 }, action)).toStrictEqual({
            ...initialState,
            getAssetStatusCode: 0,

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

        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            GetRoomList: [],
            getRoomStatusCode: 200,

        })
    })


    it('It should be clear REMOVE_GET_ROOMS', () => {
        const action = {
            type: 'REMOVE_GET_ROOMS',

        }
        expect(AssetReducer({ ...initialState, getRoomStatusCode: 200 }, action)).toStrictEqual({
            ...initialState,
            getRoomStatusCode: 0,

        })

    })

    it('It should be clear NO_ASSET_LIST', () => {
        const action = {
            type: 'NO_ASSET_LIST',
            payload: {
                statusCode: 201
            }
        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            NoDataAssetStatusCode: 201,
        })
    })

    it(' It should be clear CLEAR_NO_ASSET_LIST', () => {
        const action = {
            type: 'CLEAR_NO_ASSET_LIST'
        }
        expect(AssetReducer({ ...initialState, NoDataAssetStatusCode: 201 }, action)).toStrictEqual({
            ...initialState,
            NoDataAssetStatusCode: 0,
        })
    })

    it('It should be clear ADD_ASSET', () => {
        const action = {
            type: 'ADD_ASSET',
            payload: {
                statusCode: 200
            }
        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            addAssetStatusCode: 200,

        })

    })


    it('It should be clear CLEAR_ADD_ASSET_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ADD_ASSET_STATUS_CODE'
        }
        expect(AssetReducer({ ...initialState, addAssetStatusCode: 200 }, action)).toStrictEqual({
            ...initialState,
            addAssetStatusCode: 0,

        })
    })

    it('It should be clear BANK_AMOUNT_ERROR', () => {
        const action = {
            type: 'BANK_AMOUNT_ERROR',
            payload: 'Invalid bank amount'
        }

        expect(AssetReducer(initialState, action)).toStrictEqual({
            ...initialState,
            bankAmountError: 'Invalid bank amount'
        })
    })



    it('It should be clear CLEAR_BANK_AMOUNT_ERROR', () => {

        const action = {
            type: 'CLEAR_BANK_AMOUNT_ERROR',
            payload: ''
        }

        expect(AssetReducer(initialState, action)).toStrictEqual({
            ...initialState,
            bankAmountError: ''
        })

    })


    it('It should be clear DELETE_ASSET', () => {
        const action = {
            type: 'DELETE_ASSET',
            payload: {
                statusCode: 200
            }
        }
        expect(AssetReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteAssetStatusCode: 200,

        })

    })


    it('It should be clear CLEAR_DELETE_ASSET_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_DELETE_ASSET_STATUS_CODE',

        }
        expect(AssetReducer({ ...initialState, deleteAssetStatusCode: 200 }, action)).toStrictEqual({
            ...initialState,
            deleteAssetStatusCode: 0,

        })

    })


    it('It should be clear ASSIGN_ASSET', () => {
        const action = {
            type: 'ASSIGN_ASSET',
            payload: {
                statusCode: 200
            }

        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            addAssignAssetStatusCode: 200,
        })

    })


    it('It should be clear CLEAR_ASSIGN_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ASSIGN_STATUS_CODE',

        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            addAssignAssetStatusCode: 0,

        })

    })

    it('It should be clear SERIAL_NUMBER_ERROR', () => {
        const action = {
            type: 'SERIAL_NUMBER_ERROR',
            payload: 'Already Serial Number Here'

        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            alreadySerialNumberHere: 'Already Serial Number Here',

        })

    })

    it('It should be clear CLEAR_SERIAL_NUMBER_ERROR', () => {
        const action = {
            type: 'CLEAR_SERIAL_NUMBER_ERROR',
            payload: ''

        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            alreadySerialNumberHere: '',

        })

    })

    it('It should be clear ASSET_NAME_ERROR', () => {
        const action = {
            type: 'ASSET_NAME_ERROR',
            payload: 'Already Asset Name here'

        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            alreadyAssetNameHere: 'Already Asset Name here',

        })

    })

    it('It should be clear CLEAR_ASSET_NAME_ERROR', () => {
        const action = {
            type: 'CLEAR_ASSET_NAME_ERROR',
            payload: ''

        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            alreadyAssetNameHere: '',

        })

    })

    it('It should be clear  Unknown action', () => {
        const action = {
            type: 'UNKNOWN',


        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
        })

    })


    it('It should be ASSET_ERROR', () => {
        const action = {
            type: 'ASSET_ERROR',
            payload: 'already here'
        }
        expect(AssetReducer({ ...initialState}, action )).toStrictEqual({
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
            bankAmountError: '',
            assetError: 'already here'
        })
    })

    it('It should be CLEAR_ASSET_ERROR', () => {
        const action = {
            type: 'CLEAR_ASSET_ERROR',
            payload: ''
        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
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
            bankAmountError: '',
            assetError: ''
        })
    })

})