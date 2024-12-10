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
    const [checkedValues, setCheckedValues] = useState({});

// function declare///////////////////////////////////////////////////////////

const handleEditAmenities = (amenity) =>{
setEditDetails(amenity)
setOpenAmenitiesForm(true)
}

console.log("checkedValues",checkedValues)

const handleToggle = (amenity) => {
    setIsChecked(!isChecked);
    setCheckedValues((prev) => ({
        ...prev,
        [amenity.id]: !prev[amenity.id],
    }));
    setAmenityDetails(amenity)
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


    const handleDisplayAssignAmenities = () =>{
        setIsDisplayAssignAmenities(true)
    }
    const handleDisplayAssignAmenitiesClose = () =>{
        setIsDisplayAssignAmenities(false)
    }

// Useeffect Declare /////////////////////////////////

useEffect(() => {
    const initialCheckedState = {};
    amenitiesList.forEach((amenity) => {
        initialCheckedState[amenity.id] = amenity.active; 
    });
    setCheckedValues(initialCheckedState);
}, [amenitiesList]);



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
      dispatch({ type: 'AMENITIESLIST' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_AMENITIES_SETTINS_STATUSCODE' })
      }, 1000)

      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_AMENITIES_UPDATE' })
      }, 1000)
    }

  }, [state.InvoiceList?.statusCode, state.InvoiceList?.AmenitiesUpdateStatusCode])



  useEffect(()=>{
    if(state.InvoiceList?.addRecurringRole == 200){
        dispatch({ type: 'AMENITIESLIST' })
    }

  },[state.InvoiceList?.addRecurringRole])

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

                       
                    <div className='col-lg-10 col-md-10 col-xs-12 col-sm-12 col-12 p-0' >
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
                                                    onClick={handleDisplayAssignAmenities}
                                                            className="d-flex gap-2 mb-2 align-items-center">
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
                                                                        cursor: "pointer"
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
                                                id={`custom-switch-${amenity.id}`}
                                                checked={checkedValues[amenity.id] || false}
                                                onChange={()=>handleToggle(amenity)}

                                            />
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-4 col-12">
                                        <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Calculation type</p>
                                        <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>10</p>
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
    IsDisplayAssignAmenities && <AssignAmenities show={IsDisplayAssignAmenities} handleClose={handleDisplayAssignAmenitiesClose} hostelid={hostelid}/> 
}
        </div>
    )
}
export default SettingAmenities;