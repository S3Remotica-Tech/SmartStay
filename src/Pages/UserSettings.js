import { useState, useEffect } from "react";
// import Button from 'react-bootstrap/Button';
import { Table } from "react-bootstrap";
import {
  Button,
  Offcanvas,
  Form,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import "./Amenities.css";
import { useDispatch, useSelector } from "react-redux";





function UserSettings() {
  const state = useSelector((state) => state);
  console.log("UserSettings...", state);
  const dispatch = useDispatch();

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [mobile,setMobile]=useState("")
  const [role,setRole]=useState("")
  const [description,setDescription]=useState("")

const handleName=(e)=>{
  setName(e.target.value)
}
const handleEmail=(e)=>{
  setEmail(e.target.value)
}
const handleMobile=(e)=>{
  setMobile(e.target.value)
}
const handleRole=(e)=>{
  setRole(e.target.value)
}
const handleDescription=(e)=>{
  setDescription(e.target.value)
}

// const handleSubmit=()=>{
//   dispatch({
//     type: "ADDSTAFFUSER",
//     payload: {  },
//   });
// }


  useEffect(()=>{
    dispatch({ type: "GETUSERSTAFF" });
  },[])

  return (
    <>
      <div className="d-flex flex-column flex-sm-column flex-md-row  flex-lg-row col-lg-12">
        <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
          <div
            className="col-lg-11 col-md-11 col-sm-12 col-xs-12"
            style={{
              border: "1px solid #ced4da",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "-10px",
              }}
            >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Name{" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <FormControl
                    id="form-controls"
                    placeholder="Enter name"
                    type="text"
                      value={name}
                      onChange={(e) => handleName(e)}
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Email{" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <FormControl
                    id="form-controls"
                    placeholder="Enter name"
                    type="text"
                      value={email}
                      onChange={(e) => handleEmail(e)}
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Mobile.{" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <FormControl
                    id="form-controls"
                    placeholder="Enter name"
                    type="text"
                      value={mobile}
                      onChange={(e) => handleMobile(e)}
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput5"
                >
                  <Form.Label
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#222",
                      fontStyle: "normal",
                      lineHeight: "normal",
                    }}
                  >
                    Role
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="border"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      lineHeight: "18.83px",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 65,
                      borderRadius: 8,

                    }}
                    value={role}
                    onChange={(e) => handleRole(e)}

                  >
                    <option>Select a permission</option>
                    <option>Admin</option>
                    <option>Agent</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Description{" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <FormControl
                    id="form-controls"
                    placeholder="Enter name"
                    type="text"
                      value={description}
                      onChange={(e) => handleDescription(e)}
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
              </div>
            </div>
            {/* <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'> */}
            <Button
              className="w-100"
              // onClick={handleSubmit}
              style={{
                fontFamily: "Montserrat",
                fontSize: 16,
                fontWeight: 500,
                backgroundColor: "#1E45E1",
                color: "white",
                height: 56,
                letterSpacing: 1,
                borderRadius: 12,
              }}
            >
              + Create user{" "}
            </Button>
            {/* </div> */}
          </div>
        </div>

        {/* <hr style={{ border: '1px solid #ced4da', transform: 'rotate(180deg)' }} /> */}

        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ms-lg-5 ms-sm-0 ms-0 mt-sm-2">
        <Table
  responsive="md"
  className="Table_Design"
  style={{
    tableLayout: "auto",
    borderRadius: "24px",
    border: "1px solid #DCDCDC",
  }}
>
  <thead style={{ backgroundColor: "#E7F1FF" }}>
    <tr>
      <th
        style={{
          color: "#222",
          fontWeight: 600,
          fontSize: "14px",
          fontFamily: "Gilroy",
          borderTopLeftRadius: "24px",
          textAlign: "left",
          paddingLeft:20
        }}
      >
        Users
      </th>
      <th
        style={{
          color: "#222",
          fontWeight: 600,
          fontSize: "14px",
          fontFamily: "Gilroy",
          padding: "10px",
          textAlign: "left",
        }}
      >
        Email
      </th>
      <th
        style={{
          color: "#222",
          fontWeight: 600,
          fontSize: "14px",
          fontFamily: "Gilroy",
          padding: "10px",
          textAlign: "left",
        }}
      >
        Mobile
      </th>
      <th
        style={{
          color: "#222",
          fontWeight: 600,
          fontSize: "14px",
          fontFamily: "Gilroy",
          padding: "10px",
          textAlign: "left",
        }}
      >
        Role
      </th>
      <th
        style={{
          padding: "10px",
          borderTopRightRadius: "24px",
          textAlign: "center",
        }}
      ></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td
       
        style={{
          fontWeight: 500,
          fontSize: "16px",
          fontFamily: "Gilroy",
          textAlign: "left",
          paddingLeft:20,
          whiteSpace: "nowrap"
        }}
      >
        umesh yadav
      </td>
      <td
        style={{
          fontWeight: 500,
          fontSize: "16px",
          fontFamily: "Gilroy",
          textAlign: "left",
        }}
      >
        Admin
      </td>
      <td
        style={{
          fontWeight: 500,
          fontSize: "16px",
          fontFamily: "Gilroy",
          textAlign: "left",
        }}
      >
        9090909090
      </td>
      <td
        style={{
          fontWeight: 500,
          fontSize: "16px",
          fontFamily: "Gilroy",
          textAlign: "left",
        }}
      >
        Admin
      </td>
      <td style={{ textAlign: "center" }}>
        <div
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            border: "1px solid #EFEFEF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PiDotsThreeOutlineVerticalFill
            style={{ height: "20px", width: "20px" }}
          />
        </div>
      </td>
    </tr>
  </tbody>
</Table>

        </div>
      </div>
    </>
  );
}

export default UserSettings;
