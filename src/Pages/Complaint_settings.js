import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Closebtn from '../Assets/Images/CloseCircle-Linear-32px.png';
import Swal from 'sweetalert2';
import { MdError } from "react-icons/md"; 



   const ComplaintSettings = () => {

      const state = useSelector(state => state)
      const dispatch = useDispatch()

      console.log("state", state);

  const [type, setType] = useState('');
  const [typeerrmsg, setTypeErrmsg] = useState('')

  const [types, setTypes] = useState([]);


  const handleType = (e) => {
    setType(e.target.value)
    if(!e.target.value){
      setTypeErrmsg("Please Enter a complaint Type")
    }
    else {
      setTypeErrmsg('')
    }
  }

  const addType = () => {

    if (!type){
      setTypeErrmsg("Please Enter  a complaint Type")
      return;
    }

    if (type !== '') {
      if (type.trim()) {
        setTypes([...types, type]);
        dispatch({ type: 'COMPLAINT-TYPE-ADD', payload: { complaint_name: type } })
        setType('');
      }
    }

    

  };

  
  



  useEffect(() => {
    if (state.Settings.addComplaintSuccessStatusCode === 200 || state.Settings.deletecomplaintStatuscode === 200) {
      setTimeout(() => {
        dispatch({ type: 'COMPLAINT-TYPE-LIST' })
        console.log("get complainttype list executed")
      }, 100)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_COMPLAINT_STATUS_CODE' })
      }, 1000)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_COMPLAINTTYPE_STATUS_CODE' })
      }, 1000)
    }
  }, [state.Settings.addComplaintSuccessStatusCode, state.Settings.deletecomplaintStatuscode])

  const handleDeleteType = (item) => {
    console.log("deleteitem", item)
    if (item) {
      Swal.fire({
        icon: 'warning',
        title: 'Do you want to delete the ComplaintType ?',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch({
            type: 'DELETE-COMPLAINT-TYPE',
            payload: {
              id: item.id
            },
          });
          console.log("deleteexecuted");
       
        }
      });

    }

  }

  const [complainttypelist, setComplainttypelist] = useState([])
  console.log("complainttypelist", complainttypelist);

  useEffect(() => {
    dispatch({ type: 'COMPLAINT-TYPE-LIST' })

  }, [])

  useEffect(() => {
    if (state.Settings.getcomplainttypeStatuscode === 200) {
      setComplainttypelist(state.Settings.Complainttypelist.complaint_types)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_GET_COMPLAINTTYPE_STATUS_CODE' })
      }, 100)
    }


  }, [state.Settings.getcomplainttypeStatuscode])

  return (
    <div>
      <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }} >Complaint type</Form.Label>
          <Form.Control
            style={{ padding: '20px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 }}
            type="text"
            placeholder="Enter a complaint type"
            value={type}
            onChange={(e) => handleType(e)}
          />

            {typeerrmsg.trim() !== "" && (
              <div>
         <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {typeerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {typeerrmsg}
    </p>
  </div>
)}
        </Form.Group>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Button
          style={{ fontSize: 16, fontFamily: 'Montserrat', backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 500, borderRadius: 12, width: 200 }}
          onClick={addType}
        >
          + Add type
        </Button>
        <div className="mt-3">
          <h5 style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Existing complaint types</h5>
          <div className="mt-4 mb-2 d-flex flex-wrap">
            {complainttypelist.length > 0 && complainttypelist.map((item, index) => (
              <p key={index} className='m-1 mt-3' style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>
                <span style={{ backgroundColor: '#FFEFCF', padding: '8px 12px', color: '#222222', borderRadius: '14px' }}>
                  {item.complaint_name} <span style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} onClick={() => handleDeleteType(item)}><img src={Closebtn} height={15} width={15} /></span>
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintSettings;
