import BookingReducer, { initialState } from "../../Redux/Reducer/BookingReducer";


describe('It should be check booking reducer', () => {

    it('it should check for RESET_ALL', () => {

        const modifyState = {
            addBookind: [],
            statusCodeForAddBooking: 0,
            CustomerBookingList: [],
            statusCodeGetBooking: 0,
            bookingError: "",
            deleteBooking: [],
            statusCodeForDeleteBooking: "",
            assignBookingUser: [],
            statusCodeForAssignBooking: 0,
            bookingPhoneError: "",
            bookingEmailError: "",
            availableBedBooking: [],
            statusCodeForBedBooking: "",
            ErrorAssignBooking: ""
        }
        const action = {
            type: 'RESET_ALL',

        }
        const result = BookingReducer(modifyState, action);
        expect(result).toStrictEqual(initialState);
    })



    it('it should check for ADD_USER_BOOKING', () => {
        const action = {
            type: 'ADD_USER_BOOKING',
            payload: {
                statusCode: 200
            }
        }
        expect(BookingReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForAddBooking: 200,

        })
    })

    it('it should check for CLEAR_ADD_USER_BOOKING', () => {
        const action = {
            type: 'CLEAR_ADD_USER_BOOKING',
        }
        expect(BookingReducer(initialState, action)).toStrictEqual({
            ...initialState,
            statusCodeForAddBooking: 0,
        })
    })

    it('it should check for BOOKING_PHONE_ERROR', () => {
        const action = {
            type: 'BOOKING_PHONE_ERROR',
            payload: "already phone number"
        }
        expect(BookingReducer(initialState, action)).toStrictEqual({
            ...initialState,
            bookingPhoneError: "already phone number",
        })
    })

    it('it should check for CLEAR_PHONE_ERROR', () => {
        const action = {
            type: 'CLEAR_PHONE_ERROR',
            payload: ""
        }
        expect(BookingReducer(initialState, action)).toStrictEqual({
            ...initialState,
            bookingPhoneError: "",
        })
    })

    it('it should check for BOOKING_EMAIL_ERROR', () => {
        const action = {
            type: 'BOOKING_EMAIL_ERROR',
            payload: "already email exist"
        }
        expect(BookingReducer(initialState, action)).toStrictEqual({
            ...initialState,
            bookingEmailError: "already email exist",
        })
    })

    it('it should check for CLEAR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_ERROR',
            payload: ""
        }
        expect(BookingReducer(initialState, action)).toStrictEqual({
            ...initialState,
            bookingEmailError: "",

        })
    })


    it('it should check for CLEAR_ERROR_BOOKING', () => {
        const action = {
            type: 'CLEAR_ERROR_BOOKING',
            payload: ""
        }
        expect(BookingReducer(initialState, action)).toStrictEqual({
            ...initialState,
            bookingError: "",
        })
    })


    it('it should check for BOOKING_LIST', () => {
        const action = {
            type: 'BOOKING_LIST',
            payload: {
                response: [],
                statusCode: 200
            }
        }
        expect(BookingReducer(initialState, action)).toStrictEqual({
            ...initialState,
            CustomerBookingList: [],
            statusCodeGetBooking: 200,

        })
    })


    it('it should check for CLEAR_BOOKING_LIST', () => {
        const action = {
            type: 'CLEAR_BOOKING_LIST',

        }
        expect(BookingReducer({ ...initialState, statusCodeGetBooking: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeGetBooking: 0,

        })
    })



    it('it should check for DELETE_BOOKING', () => {
        const action = {
            type: 'DELETE_BOOKING',
            payload: {
                statusCode: 200
            }

        }
        expect(BookingReducer({ ...initialState, }, action)).toStrictEqual({
            ...initialState,
            statusCodeForDeleteBooking: 200,

        })
    })


    it('it should check for CLEAR_DELETE_BOOKING', () => {
        const action = {
            type: 'CLEAR_DELETE_BOOKING',

        }
        expect(BookingReducer({ ...initialState, statusCodeForDeleteBooking: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeForDeleteBooking: 0,

        })
    })



    it('it should check for  ASSIGN_USER_BOOKING', () => {
        const action = {
            type: 'ASSIGN_USER_BOOKING',
            payload: {
                statusCode: 200
            }

        }
        expect(BookingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForAssignBooking: 200,
        })
    })

    it('it should check for  CLEAR_ASSIGN_USER_BOOKING', () => {
        const action = {
            type: 'CLEAR_ASSIGN_USER_BOOKING',

        }
        expect(BookingReducer({ ...initialState, statusCodeForAssignBooking: 200 }, action)).toStrictEqual({
            ...initialState,
            statusCodeForAssignBooking: 0,

        })
    })

    it('it should check for  ERROR_ASSIGN_BOOKING', () => {
        const action = {
            type: 'ERROR_ASSIGN_BOOKING',
            payload: 'assign booking error'

        }
        expect(BookingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            ErrorAssignBooking: "assign booking error"
        })
    })

    it('it should check for  REMOVE_ERROR_ASSIGN_BOOKING', () => {
        const action = {
            type: 'REMOVE_ERROR_ASSIGN_BOOKING',
            payload: ''

        }
        expect(BookingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            ErrorAssignBooking: ""
        })
    })


    it('it should check for  BOOKING_BED_DETAILS', () => {
        const action = {
            type: 'BOOKING_BED_DETAILS',
            payload: {
                statusCode: 200
            }

        }
        expect(BookingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
            statusCodeForBedBooking: 200,

        })
    })

    it('It should be clear  Unknown action', () => {
        const action = {
            type: 'UNKNOWN',


        }
        expect(BookingReducer({ ...initialState }, action)).toStrictEqual({
            ...initialState,
        })

    })




})

