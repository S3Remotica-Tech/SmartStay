import React, { useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import User from '../Assets/Images/Ellipse 1.png';
import Edit from '../Assets/Images/Edit-Linear-32px.png';
import Delete from '../Assets/Images/Trash-Linear-32px.png';
import Assign from '../Assets/Images/MoneyAdd-Linear-32px.png'
import moment from 'moment';
import squre from '../Assets/Images/New_images/minus-square.png';




const InvoiceTable = (props) => {

    console.log("props", props);

    const Tablebodystyle = {
       
        fontFamily: 'Gilroy',
        color: "#000",
        fontSize: "14px",
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: 'normal'
    }


    const customCheckboxStyle = {
        appearance: 'none',
        width: '20px',
        height: '20px',
        backgroundColor: '#fff',
        border: '2px solid #DCDCDC',
        borderRadius: '4px',
        display: 'inline-block',
        position: 'relative',
    };

    const [showDots, setShowDots] = useState('')

    const handleShowDots = () => {
        setShowDots(!showDots)
    }


    const handleShowform = (props) => {
        // console.log("item", props.item)
        props.OnHandleshowform(props)
    }


    const handleInvoicepdf = (item) => {
        console.log("invoicecall", item);
        props.OnHandleshowInvoicePdf(item)
    }
    let Dated = new Date(props.item.Date);
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





    return (

        <>
            <tr key={props.item.id} style={{ color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal", lineHeight: "normal", alignItems: 'center', marginTop: '10px' }} className='m-2' >
            <td style={{ textAlign: "center", padding: "10px" }}>
                  <img src={squre} height={20} width={20} style={{marginTop:5}}/>
                </td>
                <td>
                    <div className="d-flex row align-items-center mt-2">
                        <div style={{ display: 'flex' }}>
                            <span ><img src={User} style={{ height: 40, width: 40, marginTop: '-7px' }} /></span>
                            <div style={{ fontFamily: 'Gilroy', fontSize: '16px', wordWrap: 'break-word', marginLeft: '8px', color: "#222", fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600 }}>{props.item.Name}</div><br />
                        </div>
                    </div>
                </td>
                <td style={{color:'#2E76E3', cursor: 'pointer', fontFamily: 'Gilroy', fontSize: '16px', marginLeft: '8px', fontStyle: 'normal', lineHeight: 'normal', fontWeight: 500 }} onClick={() => handleInvoicepdf(props.item)} className='pt-3'>#{props.item.Invoices == null || props.item.Invoices == '' ? '0.00' : props.item.Invoices}</td>
                {/* <td style={Tablebodystyle}><span style={{ backgroundColor: '#EBEBEB', padding: '8px 16px 8px 16px', color: '#000', borderRadius: '60px',fontSize:14,width:110,height:32 }} >{moment(props.item.Date).format('DD MMM YYYY').toUpperCase()}</span></td> */}
                <td style={{paddingTop:20}}><span style={{ backgroundColor: "#EBEBEB", padding:"8px 16px 8px 16px", borderRadius: "60px", lineHeight: "1.5em", marginTop: "20", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>{formattedDate}</span></td>
                <td style={{paddingTop:20}}><span style={{ backgroundColor: "#EBEBEB", padding:"8px 16px 8px 16px", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}>{formattedDueDate}</span></td>

                {/* <td style={Tablebodystyle}><span style={{ backgroundColor: '#EBEBEB', padding: '8px 16px 8px 16px', color: '#222222', borderRadius: '60px',fontSize:14,width:110,height:32 }} >{moment(props.item.DueDate).format('DD MMM YYYY').toUpperCase()}</span></td> */}
                <td style={{ fontFamily: 'Gilroy', fontSize: '16px', color: "#000", fontStyle: 'normal', lineHeight: 'normal', fontWeight: 500, paddingTop: '17px' }} > ₹{props.item.Amount.toLocaleString('en-IN')}</td>
                <td style={{ fontFamily: 'Gilroy', fontSize: '16px', color: "#000", fontStyle: 'normal', lineHeight: 'normal', fontWeight: 500, paddingTop: '17px' }} >₹{props.item.BalanceDue.toLocaleString('en-IN')}</td>
                <td style={{
                    paddingTop: 20,
                    color: props.item.BalanceDue === 0 ? "green" : "red",
                    fontWeight: 500
                }}>
                    {props.item.BalanceDue === 0 ? <span style={{ backgroundColor: '#D9FFD9', padding: '8px 12px', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy' }}>Paid</span> : <span
                        // onClick={() => handleShow(props.item)}
                        style={{ cursor: 'pointer', backgroundColor: '#FFD9D9', fontFamily: 'Gilroy', padding: '8px 12px', color: '#000', borderRadius: '14px' }}>Unpaid</span>}</td>






                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={handleShowDots}  >
                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />


                        {showDots && <>
                            <div style={{ cursor: "pointer", backgroundColor: "#fff", position: "absolute", right: 40, top: 1,bottom:0, width: 163, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center", zIndex: showDots ? 1000 : 'auto' }}>
                                <div style={{ backgroundColor: "#fff" }} className=''>

                                    <div className='mb-2 d-flex justify-content-start align-items-center gap-2'
                                        onClick={() => { handleShowform(props) }}
                                        style={{ backgroundColor: "#fff" }}
                                    >
                                        <img src={Assign} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222" }} >Record Payment</label>
                                       
                                    </div>

                                    <div className='mb-2 d-flex justify-content-start align-items-center gap-2'
                                        // onClick={() => handleEdit(props.item)}
                                        style={{ backgroundColor: "#fff" }}
                                    >
                                        <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222" }} >Edit</label>
                                    </div>
                                    <div className='mb-1 d-flex justify-content-start align-items-center gap-2'
                                        style={{ backgroundColor: "#fff" }}
                                    // onClick={() => handleDelete(props.item)}
                                    >
                                        <img src={Delete} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#FF0000" }}>Delete</label>
                                    </div>
                                </div>
                            </div>


                        </>}

                    </div>
                </div>


                {/* <td onClick={handleShowDots} style={{ height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", marginTop: '6px' }}>
                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                        {showDots && <>
                          <div style={{ backgroundColor: "#FFFFFF", position: "absolute", right: 100, top: 100, width: 163, height: 92, border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 15, alignItems: "center" }}>
                            <div>

                              <div className='mb-2'
                                onClick={() => { handleShowForm(item) }}
                              >
                                <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222" }} >Record Payment</label>
                              </div>
                              <div className='mb-2'
                              >
                                <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222" }} >Edit</label>
                              </div>
                              <div  >
                                <img style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#FF0000" }}>Delete</label>
                              </div>
                            </div>
                          </div>


                        </>}
                      </td> */}

            </tr>
        </>


    )
}
export default InvoiceTable;