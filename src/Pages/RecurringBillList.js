import React, { useState ,useRef, useEffect} from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import User from '../Assets/Images/New_images/profile-picture.png';
import Edit from '../Assets/Images/Edit-Linear-32px.png';
import Delete from '../Assets/Images/Trash-Linear-32px.png';


    const RecurringBillList = (props) => {
        
        const [recurringBillDeletePermission,setRecurringBillDeletePermission]=useState("")
        const [recurringBillEditPermission,setRecurringBillEditPermission]=useState("")

    useEffect(() => {
            console.log("===billrolePermission[0]", props.billrolePermission);
            if (
                props.billrolePermission[0]?.is_owner == 1 ||
                props.billrolePermission[0]?.role_permissions[11]?.per_delete == 1
            ) {
                setRecurringBillDeletePermission("");
            } else {
                setRecurringBillDeletePermission("Permission Denied");
            }
          }, [ props.billrolePermission]);
          useEffect(() => {
            console.log("=== props.billrolePermission[0]",  props.billrolePermission);
            if (
                props.billrolePermission[0]?.is_owner == 1 ||
                props.billrolePermission[0]?.role_permissions[11]?.per_edit == 1
            ) {
                setRecurringBillEditPermission("");
            } else {
                setRecurringBillEditPermission("Permission Denied");
            }
          }, [ props.billrolePermission]);
        console.log("props",props);

        const [showDots, setShowDots] = useState('')

        const handleShowDots = () => {
            setShowDots(!showDots)
        }


        const handleDelete = () => {
            props.handleDeleteRecurringbills(props.item); 
          }

        const handleShowform = (props) => {
            props.OnHandleshowform(props)
        }
    
    
        const handleInvoicepdf = (item) => {
            console.log("invoicecall", item);
            props.OnHandleshowInvoicePdf(item)
        }


        let Dated = new Date(props.item.invoice_date);
        console.log("Dated..?", Dated);
    
        let day = Dated.getDate();
        let month = Dated.getMonth() + 1; // Months are zero-based
        let year = Dated.getFullYear();
    
        let formattedDate = `${day}/${month}/${year}`;
        console.log("Formatted Date:", formattedDate);
    
    
    
        let dueDated = new Date(props.item.DueDate);
        console.log("dueDated..?", dueDated);
    
        let daydue = dueDated.getDate();
        let monthdue = dueDated.getMonth() + 1; // Months are zero-based
        let yeardue = dueDated.getFullYear();
    
        let formattedDueDate = `${daydue}/${monthdue}/${yeardue}`;
        console.log("Formatted Date:", formattedDueDate);
    
        let nextinvoiceDated = new Date(props.item.next_invoice_date);
        console.log("dueDated..?", nextinvoiceDated);
    
        let nextinvoiceday = nextinvoiceDated.getDate();
        let nextinvoicemonth = nextinvoiceDated.getMonth() + 1; // Months are zero-based
        let nextinvoiceyear = nextinvoiceDated.getFullYear();
    
        let formattedNextInvoiceDate = `${nextinvoiceday}/${nextinvoicemonth}/${nextinvoiceyear}`;
        console.log("Formatted next invoice Date:", formattedNextInvoiceDate);
    
    
        const popupRef = useRef(null);
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowDots(false);
            }
          };
          
          useEffect(() => {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
          }, []);

     return (

      <>

<tr key={props.item.id} style={{ color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal", lineHeight: "normal", alignItems: 'center', marginTop: '10px', flexWrap:"wrap" }} className='m-2' >
        
            
                <td  className="table-cells" style={{ border: "none", flexWrap:"wrap", }}>
                    <div className="d-flex  align-items-center">
                        <div className="d-flex  align-items-center">
                            <span ><img
                                src={
                                    props.item.user_profile && props.item.user_profile !== "0"
                                        ? props.item.user_profile
                                        : User
                                }
                                style={{ height: 40, width: 40 }}
                            />
                            </span></div>
                            <div className="Invoice_Name" style={{ fontFamily: 'Gilroy', fontSize: '16px', marginLeft: '8px', color: "#1E45E1", fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600,cursor:"pointer" }}  
                            // onClick={()=>handleDownload(props.item)}
                          
                            >{props.item.user_name}</div><br />
                        
                    </div>
                </td>
                {/* <td style={{   border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000",fontFamily: "Gilroy" }}  className=''>#{props.item.Invoices == null || props.item.Invoices == '' ? '0.00' : props.item.Invoices}</td> */}
                <td style={{   border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000",fontFamily: "Gilroy" }}><span style={{ backgroundColor: "#EBEBEB",  borderRadius: "60px", lineHeight: "1.5em", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy",padding:"8px 12px" }}>{formattedDate}</span></td>
                <td style={{  border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000",fontFamily: "Gilroy" }}><span style={{ backgroundColor: "#EBEBEB",  borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" ,padding:"8px 12px"}}>{formattedDueDate}</span></td>
                <td style={{  border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000",fontFamily: "Gilroy" }}><span style={{ backgroundColor: "#EBEBEB",  borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" ,padding:"8px 12px"}}>{formattedNextInvoiceDate}</span></td>
                <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000",fontFamily: "Gilroy" }} > ₹{props.item.total_amount.toLocaleString('en-IN')}</td>
              
                    <td style={{  textAlign: 'center', verticalAlign: 'middle', border: "none" }} className=''>
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={handleShowDots}>
                                <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

                                {showDots && <>
                                    <div ref={popupRef} style={{ cursor: "pointer", backgroundColor: "#fff", position: "absolute", right: 50, top: 20, width: 163, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center", zIndex: showDots ? 1000 : 'auto' }}>
                                        <div style={{ backgroundColor: "#fff" }} className=''>

                                        {/* <div className='mb-3 d-flex justify-content-start align-items-center gap-2'
                                                style={{ backgroundColor: "#fff" }}>
                                                <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222", cursor: 'pointer' }} >Edit</label>
                                            </div> */}
                                            <div
  className={"mb-3 d-flex justify-content-start align-items-center gap-2 "}
  style={{
    // backgroundColor: recurringBillEditPermission ? "#f9f9f9" : "#fff",
    cursor: recurringBillEditPermission ? "not-allowed" : "pointer",
  }}
//   onClick={() => {
//     if (!recurringBillEditPermission) {
//       handleEdit();
//     }
//   }}
>
  <img
    src={Edit}
    style={{
      height: 16,
      width: 16,
      filter: recurringBillEditPermission ? "grayscale(100%)" : "none", // Dim the icon if disabled
    }}
    alt="Edit"
  />
  <label
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Gilroy, sans-serif",
      color: recurringBillEditPermission ? "#ccc" : "#222222", // Change text color if disabled
      cursor: recurringBillEditPermission ? "not-allowed" : "pointer",
    }}
  >
    Edit
  </label>
</div>

<div
  className={`mb-2 d-flex justify-content-start align-items-center gap-2 ${recurringBillDeletePermission ? 'disabled' : ''}`}
  style={{
    // backgroundColor: recurringBillDeletePermission ? "#f9f9f9" : "#fff",
    cursor: recurringBillDeletePermission ? "not-allowed" : "pointer",
  }}
  onClick={() => {
    if (!recurringBillDeletePermission) {
      handleDelete();
    }
  }}
>
  <img
    src={Delete}
    style={{
      height: 16,
      width: 16,
      filter: recurringBillDeletePermission ? "grayscale(100%)" : "none", // Dim the icon if disabled
    }}
    alt="Delete"
  />
  <label
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Gilroy, sans-serif",
      color: recurringBillDeletePermission ? "#ccc" : "#FF0000", // Change text color if disabled
      cursor: recurringBillDeletePermission ? "not-allowed" : "pointer",
    }}
  >
    Delete
  </label>
</div>
                  

                                           
                                            {/* <div className='mb-2 d-flex justify-content-start align-items-center gap-2'
                                                style={{ backgroundColor: "#fff" }}>
                                                <img src={Delete} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#FF0000", cursor: 'pointer' }}
                                                   onClick={handleDelete}>
                                                    Delete</label>
                                            </div> */}
                                                 </div>
                                                     </div>
                                                           </>}


                            </div>
                        </div>
                    </td>
                


  

                

            </tr>
    </>
)
}
export default RecurringBillList;