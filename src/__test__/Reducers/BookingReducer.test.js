import BookingReducer, {initialState} from "../../Redux/Reducer/BookingReducer";


describe('It should be check booking reducer', () => {

    it('it should check for ADD_USER_BOOKING', () => {
        const action = {
            type: 'ADD_USER_BOOKING',
            payload: {
                statusCode: 200
            }
        }
        expect(BookingReducer(initialState, action)).toStrictEqual({
            addBookind: [],
            statusCodeForAddBooking: 200,
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
            ErrorAssignBooking:""
        })
    })

    it('it should check for CLEAR_ADD_USER_BOOKING', () => {
        const action = {
            type: 'CLEAR_ADD_USER_BOOKING',
                   }
        expect(BookingReducer(initialState, action)).toStrictEqual({
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
            ErrorAssignBooking:""
        })
    })

    it('it should check for BOOKING_PHONE_ERROR', () => {
        const action = {
            type: 'BOOKING_PHONE_ERROR',
            payload:"already phone number"
                   }
        expect(BookingReducer(initialState, action)).toStrictEqual({
            addBookind: [],
            statusCodeForAddBooking: 0,
            CustomerBookingList: [],
            statusCodeGetBooking: 0,
            bookingError: "",
            deleteBooking: [],
            statusCodeForDeleteBooking: "",
            assignBookingUser: [],
            statusCodeForAssignBooking: 0,
            bookingPhoneError: "already phone number",
            bookingEmailError: "",
            availableBedBooking: [],
            statusCodeForBedBooking: "",
            ErrorAssignBooking:""
        })
    })

    it('it should check for CLEAR_PHONE_ERROR', () => {
        const action = {
            type: 'CLEAR_PHONE_ERROR',
            payload:""
                   }
        expect(BookingReducer(initialState, action)).toStrictEqual({
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
            ErrorAssignBooking:""
        })
    })

    it('it should check for BOOKING_EMAIL_ERROR', () => {
        const action = {
            type: 'BOOKING_EMAIL_ERROR',
            payload:"already email exist"
                   }
        expect(BookingReducer(initialState, action)).toStrictEqual({
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
            bookingEmailError: "already email exist",
            availableBedBooking: [],
            statusCodeForBedBooking: "",
            ErrorAssignBooking:""
        })
    })

    it('it should check for CLEAR_EMAIL_ERROR', () => {
        const action = {
            type: 'CLEAR_EMAIL_ERROR',
            payload:""
                   }
        expect(BookingReducer(initialState, action)).toStrictEqual({
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
            ErrorAssignBooking:""
        })
    })


    it('it should check for CLEAR_ERROR_BOOKING', () => {
        const action = {
            type: 'CLEAR_ERROR_BOOKING',
            payload:""
                   }
        expect(BookingReducer(initialState, action)).toStrictEqual({
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
            ErrorAssignBooking:""
        })
    })


    it('it should check for BOOKING_LIST', () => {
        const action = {
            type: 'BOOKING_LIST',
            payload:{
                response: [],
                statusCode: 200
            }
                   }
        expect(BookingReducer(initialState, action)).toStrictEqual({
            addBookind: [],
            statusCodeForAddBooking: 0,
            CustomerBookingList: [],
            statusCodeGetBooking: 200,
            bookingError: "",
            deleteBooking: [],
            statusCodeForDeleteBooking: "",
            assignBookingUser: [],
            statusCodeForAssignBooking: 0,
            bookingPhoneError: "",
            bookingEmailError: "",
            availableBedBooking: [],
            statusCodeForBedBooking: "",
            ErrorAssignBooking:""
        })
    })


    it('it should check for CLEAR_BOOKING_LIST', () => {
        const action = {
            type: 'CLEAR_BOOKING_LIST',
           
                   }
        expect(BookingReducer({...initialState, statusCodeGetBooking: 200}, action)).toStrictEqual({
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
            ErrorAssignBooking:""
        })
    })



    it('it should check for DELETE_BOOKING', () => {
        const action = {
            type: 'DELETE_BOOKING',
            payload:{
                statusCode: 200
            }
           
                   }
        expect(BookingReducer({...initialState,}, action)).toStrictEqual({
            addBookind: [],
            statusCodeForAddBooking: 0,
            CustomerBookingList: [],
            statusCodeGetBooking: 0,
            bookingError: "",
            deleteBooking: [],
            statusCodeForDeleteBooking: 200,
            assignBookingUser: [],
            statusCodeForAssignBooking: 0,
            bookingPhoneError: "",
            bookingEmailError: "",
            availableBedBooking: [],
            statusCodeForBedBooking: "",
            ErrorAssignBooking:""
        })
    })


    it('it should check for CLEAR_DELETE_BOOKING', () => {
        const action = {
            type: 'CLEAR_DELETE_BOOKING',
                     
                   }
        expect(BookingReducer({...initialState,statusCodeForDeleteBooking: 200}, action)).toStrictEqual({
            addBookind: [],
            statusCodeForAddBooking: 0,
            CustomerBookingList: [],
            statusCodeGetBooking: 0,
            bookingError: "",
            deleteBooking: [],
            statusCodeForDeleteBooking: 0,
            assignBookingUser: [],
            statusCodeForAssignBooking: 0,
            bookingPhoneError: "",
            bookingEmailError: "",
            availableBedBooking: [],
            statusCodeForBedBooking: "",
            ErrorAssignBooking:""
        })
    })

   

    it('it should check for  ASSIGN_USER_BOOKING', () => {
        const action = {
            type: 'ASSIGN_USER_BOOKING',
            payload:{
                statusCode: 200
            }
                     
                   }
        expect(BookingReducer({...initialState}, action)).toStrictEqual({
            addBookind: [],
            statusCodeForAddBooking: 0,
            CustomerBookingList: [],
            statusCodeGetBooking: 0,
            bookingError: "",
            deleteBooking: [],
            statusCodeForDeleteBooking: "",
            assignBookingUser: [],
            statusCodeForAssignBooking:200,
            bookingPhoneError: "",
            bookingEmailError: "",
            availableBedBooking: [],
            statusCodeForBedBooking: "",
            ErrorAssignBooking:""
        })
    })

    it('it should check for  CLEAR_ASSIGN_USER_BOOKING', () => {
        const action = {
            type: 'CLEAR_ASSIGN_USER_BOOKING',
                                
                   }
        expect(BookingReducer({...initialState, statusCodeForAssignBooking:200}, action)).toStrictEqual({
            addBookind: [],
            statusCodeForAddBooking: 0,
            CustomerBookingList: [],
            statusCodeGetBooking: 0,
            bookingError: "",
            deleteBooking: [],
            statusCodeForDeleteBooking: "",
            assignBookingUser: [],
            statusCodeForAssignBooking:0,
            bookingPhoneError: "",
            bookingEmailError: "",
            availableBedBooking: [],
            statusCodeForBedBooking: "",
            ErrorAssignBooking:""
        })
    })
   
    it('it should check for  ERROR_ASSIGN_BOOKING', () => {
        const action = {
            type: 'ERROR_ASSIGN_BOOKING',
            payload:'assign booking error'
                                
                   }
        expect(BookingReducer({...initialState}, action)).toStrictEqual({
            addBookind: [],
            statusCodeForAddBooking: 0,
            CustomerBookingList: [],
            statusCodeGetBooking: 0,
            bookingError: "",
            deleteBooking: [],
            statusCodeForDeleteBooking: "",
            assignBookingUser: [],
            statusCodeForAssignBooking:0,
            bookingPhoneError: "",
            bookingEmailError: "",
            availableBedBooking: [],
            statusCodeForBedBooking: "",
            ErrorAssignBooking:"assign booking error"
        })
    })
   
    it('it should check for  REMOVE_ERROR_ASSIGN_BOOKING', () => {
        const action = {
            type: 'REMOVE_ERROR_ASSIGN_BOOKING',
            payload:''
                                
                   }
        expect(BookingReducer({...initialState}, action)).toStrictEqual({
            addBookind: [],
            statusCodeForAddBooking: 0,
            CustomerBookingList: [],
            statusCodeGetBooking: 0,
            bookingError: "",
            deleteBooking: [],
            statusCodeForDeleteBooking: "",
            assignBookingUser: [],
            statusCodeForAssignBooking:0,
            bookingPhoneError: "",
            bookingEmailError: "",
            availableBedBooking: [],
            statusCodeForBedBooking: "",
            ErrorAssignBooking:""
        })
    })


    it('it should check for  BOOKING_BED_DETAILS', () => {
        const action = {
            type: 'BOOKING_BED_DETAILS',
            payload:{
                statusCode: 200
            }
                                
                   }
        expect(BookingReducer({...initialState}, action)).toStrictEqual({
            addBookind: [],
            statusCodeForAddBooking: 0,
            CustomerBookingList: [],
            statusCodeGetBooking: 0,
            bookingError: "",
            deleteBooking: [],
            statusCodeForDeleteBooking: "",
            assignBookingUser: [],
            statusCodeForAssignBooking:0,
            bookingPhoneError: "",
            bookingEmailError: "",
            availableBedBooking: [],
            statusCodeForBedBooking: 200,
            ErrorAssignBooking:""
        })
    })






})

