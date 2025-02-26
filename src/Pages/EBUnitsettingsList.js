import React, { useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from '../Assets/Images/New_images/edit.png';
import Hostel from  "../Assets/Images/Logo-Icon.png"
import Image from 'react-bootstrap/Image';
import PropTypes from "prop-types";



const EBBillingUnitlist = (props) => {


    const [showDots, setShowDots] = useState(false)

    const handleShowDots = () => {
        setShowDots(!showDots)

    }


    const handleEditEbUnit = (item) => {
        props.modalEditEbunit(item)
    }


    return (
        <>
            <tr style={{ lineHeight: "40px" }}>
            <td className='ps-1 ps-lg-3' style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>
            <Image
            src={Hostel}
            roundedCircle
            style={{
              height: 30,
              width: 30,
              borderRadius: '50%',
            }}

          
          />
            </td>

          
                <td className='ps-1 ps-lg-2' style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{props.item.Name}</td>
                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy", alignItems: 'center' }}>{props.item.unit} KW </td>
                <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy", alignItems: 'center' }}>₹ {props.item.amount}</td>

                <td>   <div>
                    <div style={{ height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={handleShowDots}>
                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                        {showDots && <>
                            <div
  style={{
    backgroundColor: props.ebEditPermission ? "#F1F1F1" : "#FFFFFF",
    position: "absolute",
    right: 45,
    top: 3,
    width: 100,
    height: 42,
    border: "1px solid #EBEBEB",
    borderRadius: 10,
    display: "flex",
    justifyContent: "start",
    paddingLeft: "10px",
    cursor: props.ebEditPermission ? "not-allowed" : "pointer",
  }}
  onClick={() => {
    if (!props.ebEditPermission) {
      handleEditEbUnit(props.item);
    }
  }}
>
  <div>
    <img
      src={Edit}
      style={{
        height: 16,
        width: 16,
        filter: props.ebEditPermission ? "grayscale(100%)" : "none", 
      }}
    />
    <label
      style={{
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "Gilroy",
        color: props.ebEditPermission ? "#A9A9A9" : "#222222", 
        cursor: props.ebEditPermission ? "not-allowed" : "pointer",
      }}
    >
      Edit
    </label>
  </div>
</div>


                        </>}

                    </div>
                </div></td>
            </tr>
        </>
    )


}
EBBillingUnitlist.propTypes = {
  modalEditEbunit: PropTypes.func.isRequired,
  ebEditPermission: PropTypes.func.isRequired,
  item: PropTypes.func.isRequired,
};

export default EBBillingUnitlist;