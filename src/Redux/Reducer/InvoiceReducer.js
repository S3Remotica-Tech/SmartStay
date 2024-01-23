const initialState = {
    Invoice: [],
    message:''
    }
    
    const InvoiceReducer = (state = initialState, action) => {
        switch(action.type) {
            case 'INVOICE_LIST':
                return {...state, Invoice: action.payload}
            case 'ADDINVOICE_DETAILS':
                return {...state, message:action.payload.message}
        }
        return state;
    } 
 export default InvoiceReducer;