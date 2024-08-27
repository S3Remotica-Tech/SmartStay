import React, { useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from '../Assets/Images/New_images/edit.png';
import Hostel from  "../Assets/Images/Logo-Icon.png"
import Image from 'react-bootstrap/Image';



const InvoiceSettingsList = (props) => {


    const [showDots, setShowDots] = useState(false)

    const handleShowDots = () => {
        setShowDots(!showDots)
        console.log("handle edit works");

    }


    const handleEditInvoice = (item) => {
        props.modalEditInvoice(item)
    }

    console.log("props invoicesett***********", props)

    return (
        <>
            <tr style={{ lineHeight: "40px" }}>
            <td className='ps-1 ps-lg-3' style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>
            <Image
            src={props.item.profile ? props.item.profile : Hostel}
            roundedCircle
            style={{
              height: 30,
              width: 30,
              borderRadius: '50%',
            }}

          
          />
            </td>
                <td className='ps-1 ps-lg-2' style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{props.item.Name}</td>
                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy", alignItems: 'center' }}>{props.item.prefix ? props.item.prefix :'-'}</td>
                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy", alignItems: 'center' }}>{props.item.suffix ? props.item.suffix :'-'}</td>

                <td>   <div>
                    <div style={{ height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={handleShowDots}>
                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                        {showDots && <>
                            <div style={{ backgroundColor: "#FFFFFF", position: "absolute", right: 45, top: 3, width: 100, height: 42, border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", paddingLeft: '10px' }}>

                                <div onClick={() => handleEditInvoice(props.item)}>
                                    <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#222222" }} >Edit</label>

                                </div>


                            </div>


                        </>}

                    </div>
                </div></td>
            </tr>
        </>
    )


}
export default InvoiceSettingsList;