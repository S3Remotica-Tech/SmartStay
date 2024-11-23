import React, { useEffect, useState, useRef } from 'react';
// import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../Assets/Images/New_images/trash.png';
import Assign from '../Assets/Images/New_images/assign.png';
import Profile from '../Assets/Images/New_images/profile-picture.png';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash } from 'iconsax-react';

function ExpensesListTable(props) {


  const [showDots, setShowDots] = useState('')
  const popupRef = useRef(null);
  const state = useSelector(state => state)
  const dispatch = useDispatch();

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


  const handleShowDots = () => {
    setShowDots(!showDots)
  }

  const handleEditExpense = (item) => {
    props.OnEditExpense(item)
  }


  const handleDelete = (id) => {
    props.handleDelete(id)

  }


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


  console.log("props ##############", props)


  return (
    <tr style={{ fontFamily: "Gilroy", border: "none" }} key={props.item.id}>

      <td style={{ color: "black", fontWeight: 500 ,verticalAlign: 'middle', textAlign:"center",border: "none"}}>
      <input type='checkbox' className="custom-checkbox" style={customCheckboxStyle} />
    </td>
      {/* <td style={{ textAlign: 'center', verticalAlign: 'middle',border: "none" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ backgroundColor: "#EBEBEB", fontWeight: 500, padding: 8, borderRadius: 60, fontSize: 14, width: "fit-content",fontFamily: "Gilroy" }} >
          {moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}
        </div >
      </div>

    </td> */}
      <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{moment(props.item.purchase_date).format('DD MMM YYYY').toUpperCase()}</td>

      {/* <td style={{border: "none"}}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "between", flex:"wrap", gap:2, width:"100%" }}>
       <Image src={props.item.Vendor_profile ? props.item.Vendor_profile : Profile} roundedCircle style={{height:40, width:40}}/>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#222222" ,fontFamily: "Gilroy"}}>{props.item.Vendor_Name || "N/A"}</div>
      </div>
    </td> */}
      <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#FFEFCF", fontWeight: 500, width: "fit-content", padding: 8, borderRadius: 10, fontSize: 14, display: "flex", justifyContent: "center", width: "fit-content", fontFamily: "Gilroy" }}>{props.item.category_Name}</div>
        </div>
      </td>
      {/* <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000",fontFamily: "Gilroy" }}>{props.item.asset_id || "N/A"}</td> */}
      <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{props.item.description || "-"}</td>
      <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{props.item.unit_count}</td>
      <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{props.item.unit_amount}</td>


      {/* <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000",fontFamily: "Gilroy" }}>{props.item.purchase_amount}</td> */}
      <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#EBEBEB", fontWeight: 500, padding: 8, borderRadius: 60, fontSize: 14, width: "fit-content", fontFamily: "Gilroy" }} >
            {props.item.purchase_amount}
          </div >
        </div>

      </td>

      <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none" }}>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={{ backgroundColor: "#D9E9FF", fontWeight: 500, padding: 8, borderRadius: 60, fontSize: 14, width: "fit-content", fontFamily: "Gilroy" }} >
            {props.item.payment_mode}
          </div >
        </div>

      </td>


      <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none" }} className=''>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EBEBEB", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={handleShowDots}>
            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

            {showDots && <>
              <div ref={popupRef} style={{ cursor: "pointer", backgroundColor: "#f9f9f9", position: "absolute", right: 50, top: 20, width: 163, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center", zIndex: showDots ? 1000 : 'auto' }}>
                <div style={{ backgroundColor: "#f9f9f9" }} className=''>


                <div
  className="mb-2 d-flex justify-content-start align-items-center gap-2 "
  onClick={() => {
    if (!props.expenceEditPermission) {
      handleEditExpense(props.item);
    }
  }}
  style={{
    // backgroundColor: props.expenceEditPermission ? "#f1f1f1" : "#f9f9f9",
    cursor: props.expenceEditPermission ? "not-allowed" : "pointer",
  }}
>
  <div>
    <Edit
      size="16"
      color={props.expenceEditPermission ? "#A9A9A9" : "#1E45E1"} // Dim icon color when disabled
    />
  </div>
  <div>
    <label
      style={{
        cursor: props.expenceEditPermission ? "not-allowed" : "pointer",
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "Gilroy",
        color: props.expenceEditPermission ? "#A9A9A9" : "#222222", // Dim label color when disabled
      }}
    >
      Edit
    </label>
  </div>
</div>

<div
  className="mb-1 d-flex justify-content-start align-items-center gap-2"
  style={{
    // backgroundColor: props.expenceDeletePermission ? "#f1f1f1" : "#f9f9f9",
    cursor: props.expenceDeletePermission ? "not-allowed" : "pointer",
  }}
  onClick={() => {
    if (!props.expenceDeletePermission) {
      handleDelete(props.item.id);
    }
  }}
>
  <div>
    <Trash
      size="16"
      color={props.expenceDeletePermission ? "#A9A9A9" : "red"} // Dim icon color when disabled
    />
  </div>
  <div>
    <label
      style={{
        cursor: props.expenceDeletePermission ? "not-allowed" : "pointer",
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "Gilroy",
        color: props.expenceDeletePermission ? "#A9A9A9" : "#FF0000", // Dim label color when disabled
      }}
    >
      Delete
    </label>
  </div>
</div>

                </div>
              </div>


            </>}


          </div>
        </div>
      </td>
    </tr>
  )
}

export default ExpensesListTable