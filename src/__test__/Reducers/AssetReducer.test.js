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

        expect(AssetReducer({ ...initialState, getAssetStatusCode: 200 }, action)).toStrictEqual({
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
            getRoomStatusCode: 200,
            bankAmountError: ''
        })
    })


    it('It should be clear REMOVE_GET_ROOMS', () => {
        const action = {
            type: 'REMOVE_GET_ROOMS',

        }
        expect(AssetReducer({ ...initialState, getRoomStatusCode: 200 }, action)).toStrictEqual({
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

    it('It should be clear NO_ASSET_LIST', () => {
        const action = {
            type: 'NO_ASSET_LIST',
            payload: {
                statusCode: 201
            }
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
            NoDataAssetStatusCode: 201,
            getRoomStatusCode: 0,
            bankAmountError: ''
        })
    })

    it(' It should be clear CLEAR_NO_ASSET_LIST', () => {
        const action = {
            type: 'CLEAR_NO_ASSET_LIST'
        }
        expect(AssetReducer({ ...initialState, NoDataAssetStatusCode: 201 }, action)).toStrictEqual({
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

    it('It should be clear ADD_ASSET', () => {
        const action = {
            type: 'ADD_ASSET',
            payload: {
                statusCode: 200
            }
        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            assetList: [],
            getAssetStatusCode: 0,
            addAssetStatusCode: 200,
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


    it('It should be clear CLEAR_ADD_ASSET_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ADD_ASSET_STATUS_CODE'
        }
        expect(AssetReducer({ ...initialState, addAssetStatusCode: 200 }, action)).toStrictEqual({
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

    it('It should be clear BANK_AMOUNT_ERROR', () => {
        const action = {
            type: 'BANK_AMOUNT_ERROR',
            payload: 'Invalid bank amount'
        }

        expect(AssetReducer(initialState, action)).toStrictEqual({
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
            bankAmountError: 'Invalid bank amount'
        })
    })



    it('It should be clear CLEAR_BANK_AMOUNT_ERROR', () => {

        const action = {
            type: 'CLEAR_BANK_AMOUNT_ERROR',
            payload: ''
        }

        expect(AssetReducer(initialState, action)).toStrictEqual({
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


    it('It should be clear DELETE_ASSET', () => {
        const action = {
            type: 'DELETE_ASSET',
            payload: {
                statusCode: 200
            }
        }
        expect(AssetReducer(initialState, action)).toStrictEqual({
            assetList: [],
            getAssetStatusCode: 0,
            addAssetStatusCode: 0,
            deleteAssetStatusCode: 200,
            GetRoomList: [],
            addAssignAssetStatusCode: 0,
            alreadySerialNumberHere: '',
            alreadyAssetNameHere: '',
            NoDataAssetStatusCode: 0,
            getRoomStatusCode: 0,
            bankAmountError: ''
        })

    })


    it('It should be clear CLEAR_DELETE_ASSET_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_DELETE_ASSET_STATUS_CODE',

        }
        expect(AssetReducer({ ...initialState, deleteAssetStatusCode: 200 }, action)).toStrictEqual({
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


    it('It should be clear ASSIGN_ASSET', () => {
        const action = {
            type: 'ASSIGN_ASSET',
            payload: {
                statusCode: 200
            }

        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            assetList: [],
            getAssetStatusCode: 0,
            addAssetStatusCode: 0,
            deleteAssetStatusCode: 0,
            GetRoomList: [],
            addAssignAssetStatusCode: 200,
            alreadySerialNumberHere: '',
            alreadyAssetNameHere: '',
            NoDataAssetStatusCode: 0,
            getRoomStatusCode: 0,
            bankAmountError: ''
        })

    })


    it('It should be clear CLEAR_ASSIGN_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_ASSIGN_STATUS_CODE',

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
            bankAmountError: ''
        })

    })

    it('It should be clear SERIAL_NUMBER_ERROR', () => {
        const action = {
            type: 'SERIAL_NUMBER_ERROR',
            payload: 'Already Serial Number Here'

        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            assetList: [],
            getAssetStatusCode: 0,
            addAssetStatusCode: 0,
            deleteAssetStatusCode: 0,
            GetRoomList: [],
            addAssignAssetStatusCode: 0,
            alreadySerialNumberHere: 'Already Serial Number Here',
            alreadyAssetNameHere: '',
            NoDataAssetStatusCode: 0,
            getRoomStatusCode: 0,
            bankAmountError: ''
        })

    })

    it('It should be clear CLEAR_SERIAL_NUMBER_ERROR', () => {
        const action = {
            type: 'CLEAR_SERIAL_NUMBER_ERROR',
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
            bankAmountError: ''
        })

    })

    it('It should be clear ASSET_NAME_ERROR', () => {
        const action = {
            type: 'ASSET_NAME_ERROR',
            payload: 'Already Asset Name here'

        }
        expect(AssetReducer({ ...initialState }, action)).toStrictEqual({
            assetList: [],
            getAssetStatusCode: 0,
            addAssetStatusCode: 0,
            deleteAssetStatusCode: 0,
            GetRoomList: [],
            addAssignAssetStatusCode: 0,
            alreadySerialNumberHere: '',
            alreadyAssetNameHere: 'Already Asset Name here',
            NoDataAssetStatusCode: 0,
            getRoomStatusCode: 0,
            bankAmountError: ''
        })

    })

    it('It should be clear CLEAR_ASSET_NAME_ERROR', () => {
        const action = {
            type: 'ASSET_NAME_ERROR',
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
            bankAmountError: ''
        })

    })




})