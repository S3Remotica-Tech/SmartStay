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


})

