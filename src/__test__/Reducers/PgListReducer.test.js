import PgListReducer, { initialState } from "../../Redux/Reducer/PgListReducer";


describe('it should check Pg list reducers', () => {

    it('it should check for MANAGE_PG', () => {
        const action = {
            type: 'MANAGE_PG',
        }
        expect(PgListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            isManageEnable: true,
        })
    })


    it('it should check for REMOVE_MANAGE_PG', () => {
        const action = {
            type: 'REMOVE_MANAGE_PG',
        }
        expect(PgListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            isManageEnable: false,
        })
    })

    it('it should check for DELETE_ANNOUNCEMENT', () => {
        const action = {
            type: 'DELETE_ANNOUNCEMENT',
            payload: {
                statusCode: 200
            }

        }
        expect(PgListReducer(initialState, action)).toStrictEqual({
            ...initialState,
            deleteAnnounmentSuccessStatus: 200,
        })
    })


    it('it should check for REMOVE_DELETE_ANNOUNCEMENT', () => {
        const action = {
            type: 'REMOVE_DELETE_ANNOUNCEMENT',
            payload: {
                statusCode: 0
            }

        }
        expect(PgListReducer({ ...initialState, deleteAnnounmentSuccessStatus: 200 }, action)).toStrictEqual({
            ...initialState,
            deleteAnnounmentSuccessStatus: 0,
        })
    })

    it('it should check for GET_COMMENTS', () => {
        const action = {
            type: 'GET_COMMENTS',
            payload: {
                response: [],
                statusCode: 200
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            getCommentsSuccessStatus: 200,
            CommentsList: [],

        })
    })

    it('it should check for REMOVE_GET_COMMENTS', () => {
        const action = {
            type: 'REMOVE_GET_COMMENTS',
            payload: {
                response: [],
                statusCode: 0
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            getCommentsSuccessStatus: 0,
        })
    })

    it('it should check for CREATE_COMMENTS', () => {
        const action = {
            type: 'CREATE_COMMENTS',
            payload: {
                statusCode: 200
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            addCommentsSuccessStatus: 200,
        })
    })


    it('it should check for REMOVE_CREATE_COMMENTS', () => {
        const action = {
            type: 'REMOVE_CREATE_COMMENTS',
            payload: {
                statusCode: 0
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            addCommentsSuccessStatus: 0,
        })
    })

    it('it should check for CREATE_SUB_COMMENTS', () => {
        const action = {
            type: 'CREATE_SUB_COMMENTS',
            payload: {
                statusCode: 200
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            addSubCommentsSuccessStatus: 200,
        })
    })


    it('it should check for REMOVE_CREATE_SUB_COMMENTS', () => {
        const action = {
            type: 'REMOVE_CREATE_SUB_COMMENTS',
            payload: {
                statusCode: 0
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            addSubCommentsSuccessStatus: 0,
        })
    })



    it('it should check for DELETE_FLOOR', () => {
        const action = {
            type: 'DELETE_FLOOR',
            payload: {
                message: 'this floor have some users'
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deleteFloor: 'this floor have some users',

        })
    })


    it('it should check for CLEAR_DELETE_FLOOR', () => {
        const action = {
            type: 'CLEAR_DELETE_FLOOR',
            message: 'some text message'
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deleteFloor: 'some text message',

        })
    })


    it('it should check for DELETE_HOSTEL_IMAGES', () => {
        const action = {
            type: 'DELETE_HOSTEL_IMAGES',
            payload: {
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            dleteHostelImagesStatusCode: 200,

        })
    })


    it('it should check for CLEAR_DELETE_HOSTEL_IMAGES', () => {
        const action = {
            type: 'CLEAR_DELETE_HOSTEL_IMAGES',
            payload: {
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            dleteHostelImagesStatusCode: 0,

        })
    })


    it('it should check for OCCUPIED_CUSTOMER', () => {
        const action = {
            type: 'OCCUPIED_CUSTOMER',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 200,
        })
    })

    it('it should check for CLEAR_OCCUPED_CUSTOMER_STATUSCODE', () => {
        const action = {
            type: 'CLEAR_OCCUPED_CUSTOMER_STATUSCODE',
            payload: {
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            OccupiedCustomerGetStatusCode: 0,

        })
    })



    it('it should check for DELETE_ROOM', () => {
        const action = {
            type: 'DELETE_ROOM',
            payload: {
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForDeleteRoom: 200,
        })
    })



    it('it should check for CLEAR_DELETE_ROOM', () => {
        const action = {
            type: 'CLEAR_DELETE_ROOM',
            payload: {
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState, statusCodeForDeleteRoom: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeForDeleteRoom: 0,

        })
    })



    it('it should check for PG_LIST', () => {
        const action = {
            type: 'PG_LIST',
            payload: {
                message: "some text message",
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            message: 'some text message',
            createPgStatusCode: 200
        })
    })


    it('it should check for CLEAR_PG_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_PG_STATUS_CODE',
            payload: {

                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            createPgStatusCode: 0,

        })
    })


    it('it should check for  AFTER_CREATE_PG_MSG', () => {
        const action = {
            type: 'AFTER_CREATE_PG_MSG',
            message: "some text message"

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            createPGMessage: 'some text message',

        })
    })



    it('it should check for  DELETE_PG', () => {
        const action = {
            type: 'DELETE_PG',
            payload: {
                statusCode: 200
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            deletePgSuccessStatusCode: 200,

        })
    })

    it('it should check for  CLEAR_DELETE_PG_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_DELETE_PG_STATUS_CODE',
            payload: {
                statusCode: 0
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            createPgStatusCode: 0,

        })
    })

    it('it should check for  CREATE_ROOM', () => {
        const action = {
            type: 'CREATE_ROOM',
            payload: {
                floorId: 1,
                roomId: 201,
                number_of_beds: 5,
                statusCode: 200
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            room_Id: 201,
            number_Of_Bed: 5,
            floor_Id: 1,
            roomCreationSuccess: true,
            statusCodeCreateRoom: 200,

        })
    })


    it('it should check for  CLEAR_CREATE_ROOM_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_CREATE_ROOM_STATUS_CODE',
            payload: {
                statusCode: 0
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            roomCreationSuccess: false,
            statusCodeCreateRoom: 0,

        })
    })


    it('it should check for  CHECK_ROOM', () => {
        const action = {
            type: 'CHECK_ROOM',
            payload: []

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            checkRoomList: [],

        })
    })




    it('it should check for  CHECK_EB', () => {
        const action = {
            type: 'CHECK_EB',
            payload: []

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            checkEBList: [],
        })
    })

    it('it should check for  CREATE_EB', () => {
        const action = {
            type: 'CREATE_EB',
            payload: {
                response: [],
                statusCode: 200
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            createEBList: [],
            AddEBstatusCode: 200

        })
    })


    it('it should check for  CLEAR_EB', () => {
        const action = {
            type: 'CLEAR_EB',
            payload: {
                statusCode: 0
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            AddEBstatusCode: 0,


        })
    })


    it('it should check for  EB_LIST', () => {
        const action = {
            type: 'EB_LIST',
            payload: []

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            EB_Customerlist: [],

        })
    })




    it('it should check for  EB_STARTMETER_LIST', () => {
        const action = {
            type: 'EB_STARTMETER_LIST',
            payload: {
                response: [],
                statusCode: 200
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForEbRoomList: 200,

        })
    })


    it('it should check for  CLEAR_EB_STARTMETER_LIST', () => {
        const action = {
            type: 'CLEAR_EB_STARTMETER_LIST',
            payload: {
                response: [],
                statusCode: 0
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForEbRoomList: 0,

        })
    })



    it('it should check for  EB_CUSTOMER_EBLIST', () => {
        const action = {
            type: 'EB_CUSTOMER_EBLIST',
            payload: {
                response: [],
                statusCode: 200
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 200,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0

        })
    })

    it('it should check for  CLEAR_EB_CUSTOMER_EBLIST', () => {
        const action = {
            type: 'CLEAR_EB_CUSTOMER_EBLIST',
            payload: {
                response: [],
                statusCode: 0
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })

    it('it should check for EB_ERROR', () => {
        const action = {
            type: 'EB_ERROR',
            payload: "eb error"

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: 'eb error',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


    it('it should check for CLEAR_EB_ERROR', () => {
        const action = {
            type: 'CLEAR_EB_ERROR',
            payload: ""

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


    it('it should check for ALREADY_ROOM_ERROR', () => {
        const action = {
            type: 'ALREADY_ROOM_ERROR',
            payload: "already room exist"

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: 'already room exist',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })

    it('it should check for CLEAR_ALREADY_ROOM_ERROR', () => {
        const action = {
            type: 'CLEAR_ALREADY_ROOM_ERROR',
            payload: ""

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: '',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


 


    it('it should check for UPDATE_MESSAGE_AFTER_CREATION', () => {
        const action = {
            type: 'UPDATE_MESSAGE_AFTER_CREATION',
            message: 'some text message'
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: 'some text message',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


    it('it should check for BED_DETAILS', () => {
        const action = {
            type: 'BED_DETAILS',
            payload: {
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: 200,
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


    it('it should check for NO_USER_BED', () => {
        const action = {
            type: 'NO_USER_BED',
            payload: {
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 200,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })

    it('it should check for CLEAR_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE',
            payload: {
                statusCode: ' '
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: ' ',
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


    it('it should check for CLEAR_STATUS_CODE_BED', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_BED',
            payload: {
                statusCode: ' '
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: ' ',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })



    it('it should check for CREATE_PG_DASHBOARD', () => {
        const action = {
            type: 'CREATE_PG_DASHBOARD',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 200,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })



    it('it should check for CLEAR_CREATE_PG_DASHBOARD', () => {
        const action = {
            type: 'CLEAR_CREATE_PG_DASHBOARD',
            payload: {
                response: [],
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


    it('it should check for ROOM_COUNT', () => {
        const action = {
            type: 'ROOM_COUNT',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 200,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


    it('it should check for CLEAR_STATUS_CODE_ROOM_COUNT', () => {
        const action = {
            type: 'CLEAR_STATUS_CODE_ROOM_COUNT',
            payload: {
                response: [],
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


    it('it should check for NO_ROOMS', () => {
        const action = {
            type: 'NO_ROOMS',
            payload: {
                statusCode: 201
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 201,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


    it('it should check for CLEAR_NO_ROOM_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_NO_ROOM_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })

    it('it should check for CREATE_BED', () => {
        const action = {
            type: 'CREATE_BED',
            payload: {
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 200,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })

    it('it should check for CLEAR_CREATE_BED_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_CREATE_BED_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })

    it('it should check for DELETE_BED', () => {
        const action = {
            type: 'DELETE_BED',
            payload: {
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 200,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })



    it('it should check for CLEAR_DELETE_BED_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_DELETE_BED_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })

    it('it should check for ALREADY_BED', () => {
        const action = {
            type: 'ALREADY_BED',
            payload: {
                response: 1
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 1,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })

    it('it should check for CLEAR_ALREADY_BED', () => {
        const action = {
            type: 'CLEAR_ALREADY_BED',
            payload: {
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })

    it('it should check for DELETE_PG_ERROR', () => {
        const action = {
            type: 'DELETE_PG_ERROR',
            payload: "this pg have some users"
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: 'this pg have some users',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


    it('it should check for CLEAR_DELETE_PG_ERROR', () => {
        const action = {
            type: 'CLEAR_DELETE_PG_ERROR',
            payload: ""
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


    it('it should check for DELETE_BED_ERROR', () => {
        const action = {
            type: 'DELETE_BED_ERROR',
            payload: "this bed already user occupied"
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: 'this bed already user occupied',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })

    it('it should check for CLEAR_DELETE_BED_ERROR', () => {
        const action = {
            type: 'CLEAR_DELETE_BED_ERROR',
            payload: ""
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })


    it('it should check for UPDATE_FLOOR', () => {
        const action = {
            type: 'UPDATE_FLOOR',
            payload: {
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 200,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })

    it('it should check for CLEAR_UPDATE_FLOOR_STATUS_CODE', () => {
        const action = {
            type: 'CLEAR_UPDATE_FLOOR_STATUS_CODE',
            payload: {
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })



    it('it should check for UPDATE_FLOOR_ERROR', () => {
        const action = {
            type: 'UPDATE_FLOOR_ERROR',
            payload: "already floor name exist"
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: 'already floor name exist',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    })



    it('it should check for CLEAR_UPDATE_FLOOR_ERROR', () => {
        const action = {
            type: 'CLEAR_UPDATE_FLOOR_ERROR',
            payload: ""
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )

    it('it should check for EDIT_ELECTRICITY', () => {
        const action = {
            type: 'EDIT_ELECTRICITY',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 200,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )



    it('it should check for CLEAR_EDIT_ELECTRICITY', () => {
        const action = {
            type: 'CLEAR_EDIT_ELECTRICITY',
            payload: {
                response: [],
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )



    it('it should check for ERROR_EDIT_ELECTRICITY', () => {
        const action = {
            type: 'ERROR_EDIT_ELECTRICITY',
            payload: "eb edit error"
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: 'eb edit error',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )


    it('it should check for CLEAR_ERROR_EDIT_ELECTRICITY', () => {
        const action = {
            type: 'CLEAR_ERROR_EDIT_ELECTRICITY',
            payload: ""
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )


    it('it should check for DELETE_ELECTRICITY', () => {
        const action = {
            type: 'DELETE_ELECTRICITY',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 200,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )



    it('it should check for CLEAR_DELETE_ELECTRICITY', () => {
        const action = {
            type: 'CLEAR_DELETE_ELECTRICITY',
            payload: {
                response: [],
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )



    it('it should check for DASHBOARD_FILTER_DETAILS', () => {
        const action = {
            type: 'DASHBOARD_FILTER_DETAILS',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 200,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )

    it('it should check for CLEAR_DASHBOARD_FILTER_DETAILS', () => {
        const action = {
            type: 'CLEAR_DASHBOARD_FILTER_DETAILS',
            payload: {
                response: [],
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )


    it('it should check for DASHBOARD_FILTER_CASHBACK', () => {
        const action = {
            type: 'DASHBOARD_FILTER_CASHBACK',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 200,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )

    it('it should check for CLEAR_DASHBOARD_FILTER_DETAILS_CASHBACK', () => {
        const action = {
            type: 'CLEAR_DASHBOARD_FILTER_DETAILS_CASHBACK',
            payload: {
                response: [],
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )

    it('it should check for DASHBOARD_FILTER_REVENUE', () => {
        const action = {
            type: 'DASHBOARD_FILTER_REVENUE',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 200,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )


    it('it should check for  CLEAR_DASHBOARD_FILTER_REVENUE', () => {
        const action = {
            type: 'CLEAR_DASHBOARD_FILTER_REVENUE',
            payload: {
                response: [],
                statusCode: 0
            }
        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )



    it('it should check for  CLEAR_DASHBOARD', () => {
        const action = {
            type: 'CLEAR_DASHBOARD',

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )


    it('it should check for  ADD_HOSTEL_BASED', () => {
        const action = {
            type: 'ADD_HOSTEL_BASED',
            payload: {
                statusCode: 200
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 200,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )

    it('it should check for  CLEAR_ADD_HOSTEL_BASED', () => {
        const action = {
            type: 'CLEAR_ADD_HOSTEL_BASED',
            payload: {
                statusCode: 0
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )



    it('it should check for   EDIT_HOSTEL_BASED', () => {
        const action = {
            type: 'EDIT_HOSTEL_BASED',
            payload: {
                statusCode: 200
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 200,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )


    it('it should check for   CLEAR_EDIT_HOSTEL_BASED', () => {
        const action = {
            type: 'CLEAR_EDIT_HOSTEL_BASED',
            payload: {
                statusCode: 0
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )



    it('it should check for   DELETE_HOSTEL_BASED', () => {
        const action = {
            type: 'DELETE_HOSTEL_BASED',
            payload: {
                statusCode: 200
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 200,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )



    it('it should check for   CLEAR_DELETE_HOSTEL_BASED', () => {
        const action = {
            type: 'CLEAR_DELETE_HOSTEL_BASED',
            payload: {
                statusCode: 0
            }

        }
        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbCustomer: 0,
            nostatusCodeforEbHostelBased: 0,
            statusCodeForEBRoombasednodata: 0
        })
    }
    )




    it('It should check  EB_CUSTOMER_HOSTEL_EBLIST', () => {
        const action = {
            type: 'EB_CUSTOMER_HOSTEL_EBLIST',
            payload: {
                statusCode: 200,
                data: [{ id: 1, name: "Test Hostel" }]
            }
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            getHostelBasedRead: action.payload,
            getStatusCodeForHostelBased: 200
        });
    });



    it('it should check CLEAR_EB_CUSTOMER_HOSTEL_EBLIST', () => {
        const action = {
            type: 'CLEAR_EB_CUSTOMER_HOSTEL_EBLIST',
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            getStatusCodeForHostelBased: 0
        });
    });






    it('it should check SAME_DATE_ALREADY', () => {
        const action = {
            type: 'SAME_DATE_ALREADY',
            payload: {
                response: 'date already exist'
            }
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            dateAlready: 'date already exist'
        });
    });


    it('it should check CLEAR_SAME_DATE_ALREADY', () => {
        const action = {
            type: 'CLEAR_SAME_DATE_ALREADY',
            payload: {
                response: ''
            }
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            dateAlready: ''
        });
    });




    it('it should check EDIT_SAME_DATE_ALREADY', () => {
        const action = {
            type: 'EDIT_SAME_DATE_ALREADY',
            payload: {
                response: 'date already exist'
            }
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            editDateAlready: 'date already exist'
        });
    });


    it('it should check CLEAR_EDIT_SAME_DATE_ALREADY', () => {
        const action = {
            type: 'CLEAR_EDIT_SAME_DATE_ALREADY',
            payload: {
                response: ''
            }
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            editDateAlready: ''
        });
    });



    it('it should check ANNOUNCEMENT_LIST', () => {
        const action = {
            type: 'ANNOUNCEMENT_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            announcementList: [],
            statuscodeForAnnounceMentList: 200

        });
    });



    it('it should check CLEAR_ANNOUNCEMENT_LIST', () => {
        const action = {
            type: 'CLEAR_ANNOUNCEMENT_LIST',
            payload: {
                response: [],
                statusCode: 0
            }
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            announcementList: [],
            statuscodeForAnnounceMentList: 0

        });
    });



    // ///////////////////////////////


    it('it should check for ADD_ANNOUNCEMENT', () => {
        const action = {
            type: 'ADD_ANNOUNCEMENT',
            payload: {
                response: [],
                statusCode: 200
            }
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            addAnnounceMent: [],
            statuscodeForAddAnnouncement: 200
        });
    });

    it('should handle CLEAR_ADD_ANNOUNCEMENT', () => {
        const action = {
            type: 'CLEAR_ADD_ANNOUNCEMENT',
            payload: {
                response: [],
                statusCode: 0
            }
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statuscodeForAddAnnouncement: 0
        });
    });


    it('it should check for  SAME_TITLE', () => {
        const action = {
            type: 'SAME_TITLE',
            payload: {
                response: 'title already exist'
            }
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            TitleAlready: 'title already exist'
        });
    });


    it('it should check CLEAR_SAME_TITLE', () => {
        const action = {
            type: 'CLEAR_SAME_TITLE',
            payload: {
                response: ''
            }
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            TitleAlready: ''
        });
    });


    it('it should check TITTLE_UNIQUE', () => {
        const action = {
            type: 'TITTLE_UNIQUE',
            payload: {
                response: 'Title is unique'
            }
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            TittleUnique: 'Title is unique'
        });
    });




    it('it should check CLEAR_TITTLE_UNIQUE', () => {
        const action = {
            type: 'CLEAR_TITTLE_UNIQUE'
        };

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            TittleUnique: ''
        });
    });



    it('it should check for NO_ROOM_BASED', () => {

        const action = {
            type: 'NO_ROOM_BASED',
            payload: {
                statusCode: 200
            }
        }

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            statusCodeForEBRoombasednodata: 200,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            nostatusCodeforEbCustomer: 0,
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbHostelBased: 0,



        })








    })



    it('it should check for CLEAR_NO_ROOM_BASED', () => {

        const action = {
            type: 'CLEAR_NO_ROOM_BASED',

        }

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            statusCodeForEBRoombasednodata: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            nostatusCodeforEbCustomer: 0,
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbHostelBased: 0,



        })








    })


    it('it should check for  NO_HOSTEL', () => {

        const action = {
            type: 'NO_HOSTEL',
            payload: {
                statusCode: 200
            }
        }

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            statusCodeForEBRoombasednodata: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            nostatusCodeforEbCustomer: 200,
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbHostelBased: 0,



        })








    })

    it('it should check for CLEAR_NOHOSTEL', () => {

        const action = {
            type: 'CLEAR_NOHOSTEL',
            payload: {
                statusCode: 0
            }
        }

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            statusCodeForEBRoombasednodata: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            nostatusCodeforEbCustomer: 0,
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbHostelBased: 0,



        })








    })


    it('it should check for NO_EB_HOSTEL_BASED', () => {

        const action = {
            type: 'NO_EB_HOSTEL_BASED',
            payload: {
                statusCode: 200
            }
        }

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            statusCodeForEBRoombasednodata: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            nostatusCodeforEbCustomer: 0,
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbHostelBased: 200,



        })








    })

    it('it should check for CLEAR_NO_EB_HOSTEL_BASED', () => {

        const action = {
            type: 'CLEAR_NO_EB_HOSTEL_BASED',
            payload: {
                statusCode: 0
            }
        }

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            statusCodeForEBRoombasednodata: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            nostatusCodeforEbCustomer: 0,
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbHostelBased: 0,



        })








    })

   
    it('it should check for  NO_DASHBOARD_LIST', () => {

        const action = {
            type: 'NO_DASHBOARD_LIST',
            payload: {
                statusCode: 200
            }
        }

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            statusCodeForEBRoombasednodata: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            nostatusCodeforEbCustomer: 0,
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 200,
            nostatusCodeforEbHostelBased: 0,



        })








    })


    it('it should check for CLEAR_NO_DASHBOARD_LIST', () => {

        const action = {
            type: 'CLEAR_NO_DASHBOARD_LIST',
            payload: {
                statusCode: 0
            }
        }

        expect(PgListReducer({ ...initialState }, action)).toStrictEqual({
            Name: '',
            phoneNumber: '',
            email_Id: '',
            location: '',
            number_Of_Floor: '',
            room_Id: '',
            number_Of_Bed: '',
            message: '',
            floor_Id: '',
            checkRoomList: [],
            checkEBList: [],
            createEBList: [],
            EB_Customerlist: [],
            EB_startmeterlist: [],
            statusCodeForEbRoomList: 0,
            statusCodeForEBRoombasednodata: 0,
            createRoomMessage: '',
            errMessage: "",
            roomCount: [],
            roomCreationSuccess: false,
            createPGMessage: '',
            bedDetailsForUser: [],
            statusCode: '',
            errorForBed: "",
            errorStatusCode: 0,
            statusCodeCreateRoom: 0,
            dashboardDetails: [],
            deleteFloor: '',
            deleteRoom: '',
            deleteBed: '',
            roomCountStatusCode: 0,
            noRoomsInFloorStatusCode: 0,
            createPgStatusCode: 0,
            createBedStatusCode: 0,
            alreadyBedAvailable: 0,
            statusCodeForDeleteRoom: 0,
            statusCodeDeleteBed: 0,
            AddEBstatusCode: 0,
            ebError: '',
            deletePgSuccessStatusCode: 0,
            alreadyRoomHere: ' ',
            deletePgError: '',
            deleteBedError: '',
            updateFloorSuccessStatusCode: 0,
            alreadyfloorNameHere: '',
            OccupiedCustomer: [],
            OccupiedCustomerGetStatusCode: 0,
            EB_customerTable: [],
            nostatusCodeforEbCustomer: 0,
            statusCodeforEbCustomer: 0,
            dleteHostelImagesStatusCode: 0,
            statusCodeForEditElectricity: 0,
            editElectricity: [],
            statusCodeForDeleteElectricity: 0,
            deleteElectricity: [],
            ebEditError: '',
            dashboardFilter: [],
            statusCodeForDashboardFilter: 0,
            dashboardFilterCashback: [],
            statusCodeForDashboardFilterCashBack: 0,
            dashboardFilterRevenu: [],
            statusCodeForDashboardFilterRevenue: 0,
            addHostelBasedReading: [],
            statusCodeForAddHostelBased: 0,
            editHostelBasedReading: [],
            statusCodeForEditHostelBased: 0,
            getHostelBasedRead: [],
            getStatusCodeForHostelBased: 0,
            deleteHostelBasedReading: [],
            statusCodeForDeleteHostelBased: 0,
            dateAlready: '',
            editDateAlready: '',
            isManageEnable: null,
            announcementList: [],
            statuscodeForAnnounceMentList: 0,
            statuscodeForAddAnnouncement: 0,
            addAnnounceMent: [],
            TitleAlready: '',
            statuscodeForDashboard: 0,
            TittleUnique: '',
            deleteAnnounmentSuccessStatus: 0,
            getCommentsSuccessStatus: 0,
            addCommentsSuccessStatus: 0,
            CommentsList: [],
            addSubCommentsSuccessStatus: 0,
            NoDashboardStatusCode: 0,
            nostatusCodeforEbHostelBased: 0,



        })








    })



})