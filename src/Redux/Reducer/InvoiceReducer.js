const initialState = {
    Invoice: []
    
    }
    
    const InvoiceReducer = (state = initialState, action) => {
        console.log("action",action);
        switch(action.type) {
            case 'INVOICE_LIST':
                return {...state, Invoice: action.payload}
        }
        return state;
    } 
 export default InvoiceReducer;