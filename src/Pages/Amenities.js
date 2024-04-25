import React, { useEffect, useState } from 'react'
import CryptoJS from "crypto-js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaPlus } from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';
import { BsExclamationOctagonFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import AmenitiesView from '../Pages/AmenitiesView'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
// import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Swal from 'sweetalert2';
import img2 from '../Assets/Images/edit.png';
import "./Amenities.css";


function Amenities() {


    const state = useSelector(state => state)
    const dispatch = useDispatch();


    useEffect(() => {
        // dispatch({ type: 'HOSTELLIST' })
        dispatch({ type: 'AMENITIESLIST' })
        dispatch({ type: 'AMENITIESNAME' })
    }, [])

    console.log("state for Amenities", state)

    const LoginId = localStorage.getItem("loginId")

    const [Loginid,setLoginid] = useState('');
     console.log("loginid",Loginid); 

    useEffect(() => {
      if (LoginId) {
        try{
          const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
          const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
          const parsedData = decryptedString;
          setLoginid(parsedData)
        }
          catch(error){
         console.log("Error decrypting loginid",error);
          }
      }
  
    }, [LoginId])


    const [showModal, setShowModal] = useState(false);
    const [amenitiesName, setAmenitiesName] = useState('')
    console.log("amenitiesName",amenitiesName);
    const [amount, setAmount] = useState('')
    const [active, setActive] = useState(false)
    const [edit, setEdit] = useState('')
    const [selectedHostel, setSelectedHostel] = useState({ id: '', name: '' });
    const [status, setStatus] = useState('')
    const [showTable, setShowTable] = useState(false)
    const [filteredamenities,setFilteredAmenities]= useState([])

    const handleHostelChange = (e) => {
        const selectedIndex = e.target.selectedIndex;
        setShowTable(true)
        console.log("selectedIndex", selectedIndex)
        setSelectedHostel({
            id: e.target.value,
            name: e.target.options[selectedIndex].text
        });
        const filteredamenities = state.InvoiceList.AmenitiesList.filter(item => item.Hostel_Id == e.target.value);
        console.log('filteredamenities',filteredamenities);
        setFilteredAmenities(filteredamenities);

    };
    const handleAmenitiesChange = (event, newValue) => {
        if (newValue) {
            setAmenitiesName(newValue);
        } 
        else {
            setAmenitiesName(event.target.value);
        }
    };
    


    const handleAmountChange = (e) => {
        setAmount(e.target.value)
    }

    const handleSetAsDefault = (e) => {
        console.log("Switch", e.target.checked)
        setActive(e.target.checked);
    }

    const handleShowModal = () => {
        setShowModal(true);
        setEdit('ADD')
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value)
    }




    const handleAmenitiesSetting = () => {
        dispatch({ type: 'AMENITIESSETTINGS', payload: { AmenitiesName: amenitiesName, Amount: amount, setAsDefault: active, Hostel_Id: selectedHostel.id, Status: status ,createdBy:Loginid} })
        setAmenitiesName('')
        setAmount('')
        handleCloseModal()
    }

    const handleEdit = (item) => {
        console.log("amenities edit", item)

        setShowModal(true)
        setEdit('EDIT')
        console.log("edit", edit)
        setAmenitiesName(item.AmenitiesName)
        setAmount(item.Amount)
        setActive(item.setAsDefault)
        setStatus(item.Status)
        setSelectedHostel({
            id: item.Hostel_Id,

        });
    }


useEffect(()=>{
if(state.InvoiceList?.statusCode === 200){
    dispatch({ type: 'AMENITIESLIST' })
   }
setTimeout(()=>{
dispatch({type: 'CLEAR_AMENITIES_SETTINS_STATUSCODE'})
},300)
},[state.InvoiceList?.statusCode])


const TurnOn = state.InvoiceList?.Amenities?.map((item)=>{
    return item
})



const [filteredHostelList, setFilteredHostelList] = useState([]);
console.log("filteredHostelList",filteredHostelList);

useEffect(() => {
if (LoginId) {
    try {
        const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        const parsedData = decryptedString;
        console.log("parsedData", parsedData);

        const filteredList = state.UsersList?.hostelList?.filter((view) => {
            console.log("created_By:", view.created_By); 
            console.log("parsedData:", parsedData); 
            return view.created_By == parsedData;
        });
        console.log("filteredDataforLoginID", filteredList);
        setFilteredHostelList(filteredList);

    } catch (error) {
        console.error('Error decrypting LoginId:', error);
    }
}
}, [LoginId,state.UsersList?.hostelList ]);

console.log("UsersList:", state.UsersList?.hostelList);


console.log("TurnOn",TurnOn)


// const filter = createFilterOptions();
// const [value, setValue] = React.useState(null);
// const [open, toggleOpen] = React.useState(false);
// console.log("value",value);

// const handleClose = () => {
//     setDialogValue({
//       title: ''
//     });
//     toggleOpen(false);
//   };

//   const [dialogValue, setDialogValue] = React.useState({
//     title: ''  
//   });
//   console.log("dialogValue",dialogValue);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setValue({
//       title: dialogValue.title
//     });
//     handleClose();
//   };

    return (
        <div className='Amenities'>
            <div className='d-flex justify-content-between'>

                <div>
                    <h4 style={{ fontSize: 20, fontWeight: 600 }}>Amenities Settings</h4>
                    {/* <p style={{ color: '#67686C' }}>Lorem ipsum dolor sit amet consectetur.</p> */}
                </div>

                <div class="" >
                    <Button variant="outline-primary" onClick={handleShowModal} style={{ width: "fit-content" }}><FaPlus className="me-1" />Create Amenities </Button>
                </div>

            </div>
            <div className='row'>
                <div className='col-lg-6 col-12'>
                    <Form.Group className="mb-3">
                        <Form.Label style={{ fontSize: 14, fontWeight: 600, }}>Select Hostel</Form.Label>
                        <Form.Select aria-label="Default select example" value={selectedHostel.id} onChange={(e) => handleHostelChange(e)} style={{ fontSize: 14, fontWeight: 600, backgroundColor: "#E6EDF5" }}>

                            <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
                            { filteredHostelList && filteredHostelList.map((item) => (
                                <>
                                    <option key={item.id} value={item.id} >{item.Name}</option></>
                            ))}

                        </Form.Select>
                    </Form.Group>
                </div>
            </div> 

            {showTable && <>
                <div class="table-responsive mt-4" style={{ width: "100%" }}>

                    <table class="table text-center" >
                        <thead style={{ backgroundColor: "#E6EDF5", color: "#91969E", fontSize: "10px" }}>
                            <tr >
                                <th scope="col" style={{textAlign:'left'}}>Hostel Name</th>
                                <th scope="col">Amenities Name</th>
                                <th scope="col">Amount <BsExclamationOctagonFill className='ms-1' /></th>
                                <th scope="col">Set as Default <BsExclamationOctagonFill className='ms-1' /></th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: 13 }}>

                            {filteredamenities.length > 0 && filteredamenities.map((item, index) => (
                                                            <AmenitiesView item={item} modalEditAmenities={handleEdit} selectedHostel={selectedHostel} />
                            ))}

                        </tbody>
                    </table>
                </div>
                </>}


            



            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#F5F5FF" }} className="text-center">
                    <Modal.Title style={{ fontSize: 18 }} className="text-center">{edit === 'EDIT' ? 'Update Amenities' : 'Create Amenities'}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className='mb-3 ps-2  pe-2'>
                        <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Select PG</label>
                        <Form.Select aria-label="Default select example" value={selectedHostel.id} onChange={(e) => handleHostelChange(e)} style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa" }}>

                            <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
                            {filteredHostelList && filteredHostelList.map((item) => (
                                <>
                                    <option key={item.id} value={item.id} >{item.Name}</option></>
                            ))}

                        </Form.Select>
                    </div>
                    {/* <div className='mb-3 ps-2  pe-2'>
                        <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Amenities Name</label>

                        <Form.Select aria-label="Default select example" value={amenitiesName} onChange={(e) => handleAmenitiesChange(e)} style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa" }}>
                        <option style={{ fontSize: 14, fontWeight: 600, }} >Select Amenities Name</option>
                         {state.InvoiceList.AmenitiesName.map((item) => (
                                <>
                              <option key={item.id} value={item.id} >{item.Amnities_Name}</option></>
                               ))}

                          </Form.Select>

                    </div> */}

                    <React.Fragment>
      <Autocomplete
    value={amenitiesName}
    onChange={handleAmenitiesChange}
        id="free-solo-dialog-demo"
        options={state?.InvoiceList?.AmenitiesName.map((item) => item.Amnities_Name)}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option}</li>}
        style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa",width:'97%',marginLeft:'1%' }}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Amenities Name" />}
      />
    </React.Fragment>

                    <div className='mb-3 ps-2 pe-2'>
                        <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Amount</label>
                        <Form.Control
                            placeholder="Amount"
                            aria-label="Recipient's username"
                            className='border custom-input'
                            aria-describedby="basic-addon2"
                            value={amount}
                            onChange={(e) => handleAmountChange(e)}
                            style={{
                                fontSize: 12,
                                fontWeight: "530",
                                opacity: 1,
                                borderRadius: "4px",
                                color: "gray",
                                '::placeholder': { color: "gray", fontSize: 12 }
                            }}

                        />
                    </div>

                    <div className='d-flex justify-content-between  ps-2 pe-2 '>
                        <label className='mb-3 ' style={{ fontSize: 14, fontWeight: 650 }} >Set as Default</label>
                        <Form.Check type="switch" id="custom-switch" checked={active} onChange={(e) => handleSetAsDefault(e)} />
                    </div>
                    {edit === 'EDIT' && <>

                        <div className='mb-3 ps-2  pe-2'>
                            <label className='mb-1' style={{ fontSize: 14, fontWeight: 650 }}>Select Status</label>
                            <Form.Select aria-label="Default select example" value={status} onChange={(e) => handleStatusChange(e)} style={{ fontSize: 13, fontWeight: 600, backgroundColor: "#f8f9fa" }}>
                                <option style={{ fontSize: 14, fontWeight: 600, }} >Select Status</option>

                                <option value="1" >Active</option>
                                <option value="0" >In Active</option>
                            </Form.Select>
                        </div>

                    </>}

                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="outline-primary" onClick={handleCloseModal} size="sm" style={{ borderRadius: 8, width: '100px', marginRight: '15px' }}>
                        Cancel
                    </Button>
                    <Button variant="primary" size="sm" style={{ borderRadius: 8, width: '100px' }} onClick={handleAmenitiesSetting} >
                    {edit === 'EDIT' ? 'Update' : 'Create'} 
                    </Button>

                </Modal.Footer>
            </Modal>



        </div>

    )
}

export default Amenities