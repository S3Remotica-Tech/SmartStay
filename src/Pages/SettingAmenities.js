import React, { useRef, useEffect, useState } from 'react'
import CryptoJS from "crypto-js";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { MdError } from "react-icons/md";
import EmptyState from '../Assets/Images/New_images/empty_image.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash , ProfileAdd} from 'iconsax-react';
import Form from 'react-bootstrap/Form';
import AddAmenities from './AmenitiesFile/AddAmenities';
import RecurringEnable from './AmenitiesFile/RecurringEnable';
import AssignAmenities from './AmenitiesFile/AssignAmenities';

function SettingAmenities({hostelid}) {

// state declare//////////////////////////////////////////


    const state = useSelector(state => state)
    const dispatch = useDispatch();

    const [showDots, setShowDots] = useState(false);
    const [openAmenitiesForm, setOpenAmenitiesForm] = useState(false)
    const [IsDisplayAssignAmenities, setIsDisplayAssignAmenities] = useState(false)
const [amenitiesList, setAmenitiesList] =useState([])
    const popupRef = useRef(null);
    const [editDetails, setEditDetails] = useState('')
const [active, setActive] = useState(false)
    const [isChecked, setIsChecked] = useState(false);
    const [isDisplayRecurring, setIsDisplayRecurring] = useState(false)
    const [amenityDetails, setAmenityDetails] = useState('')
    const [switchStates, setSwitchStates] = useState({});
    const [deleteAmenities, setDeleteAmenities] = useState(false)
    const [deleteID, setDeleteID]  = useState('')
    const [assignAmenitiesDetails, setAssignAmenitiesDetails] = useState('')

// function declare///////////////////////////////////////////////////////////

const handleEditAmenities = (amenity) =>{
setEditDetails(amenity)
setOpenAmenitiesForm(true)
}

console.log("switchStates",switchStates)

const handleToggle = (amenity) => {
    setIsChecked(!isChecked);
    setSwitchStates((prev) => ({
        ...prev,
        [amenity.id]: !prev[amenity.id],
    }));
    setAmenityDetails(amenity)
    console.log(`Switch toggled for amenity ID ${amenity.id}:`, !switchStates[amenity.id]);
};


    const handleDotsClick = (index) => {
        setShowDots((prev) => (prev === index ? null : index));
    };



    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowDots(false);
        }
    };

  

    const handleOpenAmenities = () =>{
        setOpenAmenitiesForm(true)
        setEditDetails('')
    }

    const handleCloseAmenities = () =>{
        setOpenAmenitiesForm(false)
    }

    const handleCloseRecurringPopUp = () =>{
        setIsDisplayRecurring(false)
    }


    const handleDisplayAssignAmenities = (amenity) =>{
        setIsDisplayAssignAmenities(true)
        setAssignAmenitiesDetails(amenity)
    }
    const handleDisplayAssignAmenitiesClose = () =>{
        setIsDisplayAssignAmenities(false)
    }


const handleDeleteAmenities = (amen) =>{
console.log("amen",amen)
setDeleteID(amen.id)
setDeleteAmenities(true)
}

const handleCloseDeleteFormAmenities = () =>{
    setDeleteAmenities(false)
}


const handleDeleteAmenitiesConfirm = () =>{
    if(deleteID){
        dispatch({ type: 'DELETEAMENITIES', payload: { am_id : deleteID, hostel_id : hostelid }})

    }
}


// Useeffect Declare /////////////////////////////////

useEffect(()=>{
    const initialSwitchStates =  amenitiesList.reduce((acc, amenity) => {
        acc[amenity.id] = amenity.recuring === 1; 
        return acc;
    }, {})


    setSwitchStates(initialSwitchStates);

},[amenitiesList])




useEffect(() => {
    dispatch({ type: 'AMENITIESLIST' ,payload:{ hostel_id : hostelid }})
  
  }, [])



useEffect(()=>{
    if(state.InvoiceList.AmenitiesList.length > 0 ) {
        setAmenitiesList(state.InvoiceList.AmenitiesList)
    }

},[state.InvoiceList.AmenitiesList])




useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);
useEffect(()=>{
    if(isChecked){
        setIsDisplayRecurring(true)
    }

},[isChecked])


useEffect(() => {
    if (state.InvoiceList?.statusCode === 200 || state.InvoiceList?.AmenitiesUpdateStatusCode == 200) {

        setOpenAmenitiesForm(false)
        dispatch({ type: 'AMENITIESLIST' ,payload:{ hostel_id : hostelid }})
      setTimeout(() => {
        dispatch({ type: 'CLEAR_AMENITIES_SETTINS_STATUSCODE' })
      }, 1000)

      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_AMENITIES_UPDATE' })
      }, 1000)
    }

  }, [state.InvoiceList?.statusCode, state.InvoiceList?.AmenitiesUpdateStatusCode])



  




  useEffect(()=>{
    
if(state.Settings?.addRecurringRole == 200){
    setIsDisplayRecurring(false)
    dispatch({ type: 'AMENITIESLIST' ,payload:{ hostel_id : hostelid }})
   
setTimeout(()=>{
dispatch({ type: 'REMOVE_STATUS_CODE_SETTINGS_ADD_RECURRING'})
},2000)
}

  },[state.Settings?.addRecurringRole])

useEffect(()=>{
    if(state.InvoiceList?.deleteAmenitiesSuccessStatusCode == 200){

        dispatch({ type: 'AMENITIESLIST' ,payload:{ hostel_id : hostelid }})

 setDeleteAmenities(false)

        setTimeout(()=>{
dispatch({ type: 'REMOVE_DELETE_AMENITIES_STATUS_CODE'})
        },2000)
    }

},[state.InvoiceList?.deleteAmenitiesSuccessStatusCode])





    return (
        <div className="container">
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <label style={{ fontFamily: "Gilroy", fontSize: 20, color: "#222", fontWeight: 600, }}>Amenities</label>


                </div>
                <div>
                    <Button
onClick={handleOpenAmenities}
                        style={{fontFamily: "Gilroy", fontSize: 14,backgroundColor: "#1E45E1",color: "white",fontWeight: 600, borderRadius: 8, padding: "16px 20px 16px 20px", }}
                        >
                            
                       
                        {" "}
                        + Add Amenities
                    </Button>
                </div>
            </div>
            <div className='container mt-4 mb-3'>


                <div className='row row-gap-3'>
                    {
                        amenitiesList.length > 0 && amenitiesList.map((amenity, index)=>(

                       
                    <div className='col-lg-8 col-md-8 col-xs-12 col-sm-12 col-12 p-0' >
                        <Card style={{ border: "1px solid #dcdcdc", borderRadius: 16, }}>
                            <Card.Body>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <label style={{ fontFamily: "Gilroy", fontSize: 16, color: "#222", fontWeight: 600, }}>Amenities Information</label>
                                    </div>
                                    <div>

                                        <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: showDots ? 1000 : 'auto' }}
                                            onClick={()=>handleDotsClick(index)}
                                        >
                                            <PiDotsThreeOutlineVerticalFill style={{ height: 18, width: 18 }} />

                                            {showDots === index && <>

                                                <div ref={popupRef} style={{ cursor: "pointer", backgroundColor: "#F9F9F9", position: "absolute", right: 0, top: 50, width:170, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 15, alignItems: "center" }}>
                                                    <div >
                                                    <div
                                                    // onClick={()=>handleDisplayAssignAmenities(amenity)}
                                                    onClick={() => {
                                                        if (amenity.setAsDefault !== 1) {
                                                            handleDisplayAssignAmenities(amenity);
                                                        }
                                                    }}
                                                            className="d-flex gap-2 mb-2 align-items-center"
                                                            
                                                            style={{
                                                                cursor: amenity.setAsDefault === 1 ? "not-allowed" : "pointer",
                                                                opacity: amenity.setAsDefault === 1 ? 0.5 : 1,
                                                            }}
                                                            
                                                            
                                                            >
                                                            <div>
                                                            <ProfileAdd size="16" color="#1E45E1" />
                                                            </div>
                                                            <div>
                                                                <label
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 600,
                                                                        fontFamily: "Gilroy",
                                                                        color: "#222222",
                                                                        cursor: amenity.setAsDefault === 1 ? "not-allowed" : "pointer",
                                                                    }}
                                                                >
                                                                 Assign Amenities
                                                                </label>
                                                            </div>
                                                        </div>



                                                        <div
                                                            className="d-flex gap-2 mb-2 align-items-center"
                                                            
                                                            onClick={()=>handleEditAmenities(amenity)}
                                                            >
                                                            <div>
                                                                <Edit size="16" color="#1E45E1" />
                                                            </div>
                                                            <div>
                                                                <label
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 600,
                                                                        fontFamily: "Gilroy",
                                                                        color: "#222222",
                                                                        cursor: "pointer"
                                                                    }}
                                                                >
                                                                    Edit
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="d-flex gap-2 mb-2 align-items-center"
                                                            onClick={()=>handleDeleteAmenities(amenity)}
                                                        >

                                                            <div>
                                                                <Trash
                                                                    size="16"
                                                                    color="red"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 600,
                                                                        fontFamily: "Gilroy",
                                                                        color: "#FF0000",
                                                                        cursor: "pointer"
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
                                </div>

                                <hr style={{ border: "1px solid #E7E7E7", margin: "0.5rem 0" }} />
                                <div class="row row-gap-3">
                                    <div class="col-lg-4 col-md-4 col-12">
                                        <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Name</p>
                                        <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{amenity.Amnities_Name}</p>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-12">
                                        <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Amount</p>
                                        <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>₹{amenity.Amount}</p>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-12">
                                        <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Assigned</p>
                                        <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{'-'}</p>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-12">
                                        <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Recuring</p>

                                                <div>
                                                    <Form.Check
                                                        type="switch"
                                                        label="Recurring"
                                                           checked={switchStates[amenity.id] || false} 
                                                        onChange={() => handleToggle(amenity)} 
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-12">
                                                <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Calculation type</p>
                                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>Monthly</p>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-12">
                                                <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Calculation start date</p>
                                        <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{amenity.startdate}</p>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-12">
                                        <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Calculation End date</p>
                                        <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{amenity.enddate}</p>
                                    </div>





                                </div>

                            </Card.Body>
                        </Card>
                    </div>
                     ))
                    }
                </div>

            </div>

{
    openAmenitiesForm && <AddAmenities show={handleOpenAmenities} handleClose={handleCloseAmenities } hostelid={hostelid}   editDetails = {editDetails} />
}
{
    isDisplayRecurring && <RecurringEnable show={isDisplayRecurring} handleCloseRecurring={handleCloseRecurringPopUp} hostelid={hostelid} amenityDetails={amenityDetails} />
}
{
    IsDisplayAssignAmenities && <AssignAmenities  show={IsDisplayAssignAmenities} handleClose={handleDisplayAssignAmenitiesClose} hostelid={hostelid}  assignAmenitiesDetails={assignAmenitiesDetails}              /> 
}




{ deleteAmenities && 
    <Modal
    show={deleteAmenities}
    onHide={handleCloseDeleteFormAmenities}
    centered
    backdrop="static"
    style={{
      width: 388,
      height: 250,
      marginLeft: "500px",
      marginTop: "200px",
    }}
  >
    <Modal.Header style={{ borderBottom: "none" }}>
      <Modal.Title
        style={{
          fontSize: "18px",
          fontFamily: "Gilroy",
          textAlign: "center",
          fontWeight: 600,
          color: "#222222",
          flex: 1,
        }}
      >
        Delete Amenities?
      </Modal.Title>
    </Modal.Header>

    <Modal.Body
      style={{
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "Gilroy",
        color: "#646464",
        textAlign: "center",
        marginTop: "-20px",
      }}
    >
      Are you sure you want to delete this Amenities?
    </Modal.Body>

    <Modal.Footer
      style={{
        justifyContent: "center",
        borderTop: "none",
        marginTop: "-10px",
      }}
    >
      <Button
        style={{
          width: 160,
          height: 52,
          borderRadius: 8,
          padding: "12px 20px",
          background: "#fff",
          color: "#1E45E1",
          border: "1px solid #1E45E1",
          fontWeight: 600,
          fontFamily: "Gilroy",
          fontSize: "14px",
          marginRight: 10,
        }}
        onClick={handleCloseDeleteFormAmenities}
      >
        Cancel
      </Button>
      <Button
        style={{
          width: 160,
          height: 52,
          borderRadius: 8,
          padding: "12px 20px",
          background: "#1E45E1",
          color: "#FFFFFF",
          fontWeight: 600,
          fontFamily: "Gilroy",
          fontSize: "14px",
        }}
        onClick={handleDeleteAmenitiesConfirm}
      >
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
}










        </div>
    )
}
export default SettingAmenities;