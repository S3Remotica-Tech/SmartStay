import React, { useState ,useEffect } from "react";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import imageCompression from 'browser-image-compression';
import Cookies from 'universal-cookie';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Button from 'react-bootstrap/Button';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Men from '../Assets/Images/men.jpg';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Eye, EyeSlash } from 'iconsax-react';
import Logout from '../Assets/Images/LogoutCurve-Linear-32px.png'


const Accountsettings = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState('');


    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const cookies = new Cookies()
    // const tokenCookies = cookies.get('token');

    // const state = useSelector(state => state.UsersList)
  const stateData = useSelector(state => state.createAccount)


    const [selectedTab, setSelectedTab] = useState('Personal');
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [Address, setAddress] = useState("")
    const [Country, setCountry] = useState("")
    const [City, setCity] = useState("")
    const [statee, setStatee] = useState("")
    const [id, setId] = useState("")
    const [updateval, setUpdateval] = useState("")
    const [login_Password, setLogin_Password] = useState("")


    const [value, setValue] = React.useState('1');

    const handleChanges = (event, newValue) => {
        setValue(newValue);
    }

    const handleName = (e) => {
        setFirstName(e.target.value)
      }
    const handlelastName = (e) => {
        setLastName(e.target.value)
    }  
    const handlePhone = (e) => {
        setPhone(e.target.value)
    }
    const handleAddress = (e) => {
        setAddress(e.target.value)
    }

    const handleEmailId = (e) => {
        setEmail(e.target.value)
      }

    useEffect(() => {
        if (state.createAccount.statusCodeTwo === 200) {
            dispatch({ type: 'ACCOUNTDETAILS' });
            setTimeout(() => {
                dispatch({ type: 'CLEAR_STATUS_CODE_TWO_STEP' })
            }, 100)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_STATUSCODE' });
            }, 200);
        }

    }, [state.createAccount.statusCodeTwo])


    // useEffect(() => {
    //     const UserIsEnable = state.createAccount.accountList[0].user_details.isEnable


    //     if (UserIsEnable === 1) {
    //         setIsChecked(true);

    //         localStorage.setItem("IsEnable", '');


    //     } else {
    //         setIsChecked(false);
    //     }
    // }, [state.createAccount.accountList])


    useEffect(() => {
        const FIlteredProfile = state.createAccount?.accountList[0].user_details
        console.log("FIlteredProfile",FIlteredProfile);
        if (FIlteredProfile.profile) {
            const ProfileImage = FIlteredProfile.profile
            const CustomerFirstName = FIlteredProfile.first_name
            const CustomerLastName = FIlteredProfile.last_name
            const PhoneNUmber = FIlteredProfile.mobileNo
            const UserEmail = FIlteredProfile.email_Id
            const UserAddress = FIlteredProfile.Address

            setFirstName(CustomerFirstName)
            setLastName(CustomerLastName)
            setPhone(PhoneNUmber)
            setEmail(UserEmail)
            setAddress(UserAddress)

            setProfilePicture(ProfileImage)
        } else {
            setProfilePicture(Men)
        }

    }, [state.createAccount?.accountList])



    const tokenCookies = cookies.get('token');


    // console.log("state.createAccount.statusCodeForAccount == 200",state.createAccount.statusCodeForAccount == 200)


    useEffect(() => {
        if (state.createAccount.statusCodeForAccount == 200) {
            dispatch({ type: 'ACCOUNTDETAILS' })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_STATUS_CODE_ACCOUNT' })
            }, 2000)

            setTimeout(() => {
                dispatch({ type: 'CLEAR_ACCOUNT_STATUS_CODE' })
            }, 1000)

        } else {
            console.log("create account not working")
        }
    }, [state.createAccount?.statusCodeForAccount])

    console.log("state for settings", state)

    const handleImageChange = async (event) => {
        const file = event.target.files[0];

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true
        };
        try {
            const compressedFile = await imageCompression(file, options);
            setSelectedImage(compressedFile);
        } catch (error) {
            console.error('Image compression error:', error);
        }
    };

    
    useEffect(() => {
        if (stateData.statusCodeForAccountList == 200) {
    
          const loginInfo = stateData.accountList[0].user_details
    
          console.log("loginInfo", loginInfo)
          if (loginInfo) {
            const LoginId = loginInfo.id;
            const NameId = loginInfo.Name;
            const phoneId = loginInfo.mobileNo;
            const emilidd = loginInfo.email_Id;
            const Is_Enable = loginInfo.isEnable;
            const Pass_word = loginInfo.password;
    
            const encryptedLoginId = CryptoJS.AES.encrypt(LoginId.toString(), 'abcd').toString();
            // const encryptedname = CryptoJS.AES.encrypt(NameId.toString(), 'abcd').toString();
            const encryptedphone = CryptoJS.AES.encrypt(phoneId.toString(), 'abcd').toString();
            const encryptedemail = CryptoJS.AES.encrypt(emilidd.toString(), 'abcd').toString();
            const encryptIsEnable = CryptoJS.AES.encrypt(Is_Enable.toString(), 'abcd').toString();
            const encryptPassword = CryptoJS.AES.encrypt(Pass_word.toString(), 'abcd').toString();
    
            localStorage.setItem("loginId", encryptedLoginId);
            // localStorage.setItem("NameId", encryptedname);
            localStorage.setItem("phoneId", encryptedphone);
            localStorage.setItem("emilidd", encryptedemail);
            localStorage.setItem("IsEnable", encryptIsEnable);
            localStorage.setItem("Password", encryptPassword);
    
            console.log("Is_Enable *****", Is_Enable)
    
            if (Is_Enable == 0) {
              const encryptData = CryptoJS.AES.encrypt(JSON.stringify(true), 'abcd');
              localStorage.setItem("login", encryptData.toString());
            } else {
              const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), 'abcd');
              localStorage.setItem("login", encryptData.toString());
            }
          } else {
            console.log("No data found")
          }
          setTimeout(() => {
            dispatch({ type: 'CLEAR_ACCOUNT_STATUS_CODE' })
          }, 100)
        }
    
      }, [stateData.statusCodeForAccountList])


      const handleLogout = () => {
        Swal.fire({
          icon: 'warning',
          title: 'Do you want LogOut?',
          confirmButtonText: 'Ok',
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch({ type: 'LOG_OUT' })
    
            const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), 'abcd')
            localStorage.setItem("login", encryptData.toString())
            localStorage.setItem("loginId", '')
            localStorage.setItem("NameId", '')
            localStorage.setItem("phoneId", '')
            localStorage.setItem("emilidd", '')
          }
        })
      }

    const handleSaveUpdate = () => {
        if (selectedImage) {
            dispatch({
                type: 'CREATE_ACCOUNT',
                payload: { name: firstname, mobileNo: phone, emailId: email, Address: Address, Country: Country, City: City, State: statee, id: id, profile: selectedImage }
            });
            Swal.fire({
                text: "Update successfully",
                icon: "success",
                timer: 1000,
            });
        } else {
            dispatch({
                type: 'CREATE_ACCOUNT',
                payload: { name: firstname, mobileNo: phone, emailId: email, Address: Address, Country: Country, City: City, State: statee, id: id }
            });
            Swal.fire({
                text: "Update successfully",
                icon: "success",
                timer: 1000,
            });
        }

        setFirstName('');
        setPhone('');
        setEmail('');
        setAddress('');
        setCountry('');
        setCity("");
        setStatee("");
    }

    const [password, setpassword] = useState('')
    const [showPassword, setShowpassword] = useState(false)

    const handlePasswordChange = (e) => {
        dispatch({ type: 'CLEAR_PASSWORD_ERROR' })
        setpassword(e.target.value)
      }

    const togglePasswordVisibility = () => {
      setShowpassword(!showPassword);
    };

    

  

    return (

        <div className="container" style={{marginLeft:'30px'}}>
            <h3 style={{marginLeft:'10px'}}>AccountSettings</h3>


            <div className='d-flex justify-content-start gap-3 align-items-center '>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "auto", height: "auto", borderRadius: 100, padding: 5, marginBottom: '20px' }}>


                    <Image
                        src={selectedImage ? URL.createObjectURL(selectedImage) : profilePicture == null ? Men : profilePicture}
                        roundedCircle
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: '50%',
                        }}
                    />
                    <div style={{ marginLeft: '30px', marginTop: '10px' }}>
                        <h2 style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Profile Picture</h2>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} id="upload-photo" />
                        <p onClick={() => document.getElementById('upload-photo').click()} style={{ fontFamily: 'Gilroy', fontSize: 16, fontWeight: 600, color: "#1E45E1", fontStyle: 'normal', lineHeight: 'normal' }}>Update image</p>

                    </div>
                </div>
            </div>


            <TabContext value={value}>
                <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                    <TabList onChange={handleChanges} aria-label="lab API tabs example" style={{ marginLeft: '20px' }}>
                        <Tab label="Edit profile" value="1" className='me-3' style={{ fontSize: 16, fontFamily: "Gilroy", color: '#4B4B4B', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500 }} />
                        <Tab label="Account setting" value="2" className='me-3' style={{ fontSize: 16, fontFamily: "Gilroy", color: '#4B4B4B', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500 }} />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                            <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>First name</Form.Label>

                                    <Form.Control
                                        style={{ padding: '20px', marginTop: '10px' }}
                                        type="text"
                                        placeholder="Enter first name"
                                        value={firstname} onChange={handleName}
                                    />

                                </Form.Group>
                            </div>

                            <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>last name</Form.Label>

                                    <Form.Control
                                        style={{ padding: '20px', marginTop: '10px' }}
                                        type="text"
                                        placeholder="Enter lastname"
                                        value={lastname} onChange={handlelastName}
                                    // value={type}
                                    // onChange={(e) => setType(e.target.value)}
                                    />

                                </Form.Group>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                            <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>email</Form.Label>

                                    <Form.Control
                                        style={{ padding: '20px', marginTop: '10px' }}
                                        type="text"
                                        placeholder="Enter email"
                                        value={email} onChange={handleEmailId}
                                    />

                                </Form.Group>
                            </div>


                            <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>phone no</Form.Label>

                                    <Form.Control
                                        style={{ padding: '20px', marginTop: '10px' }}
                                        type="text"
                                        placeholder="Enter phone"
                                        value={phone} onChange={handlePhone}
                                    />

                                </Form.Group>
                            </div>
                        </div>
                        <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Address</Form.Label>

                                <Form.Control
                                    style={{ padding: '20px', marginTop: '10px' }}
                                    type="text"
                                    placeholder="Enter Address"
                                    value={Address} onChange={handleAddress}
                                />

                            </Form.Group>
                        </div>


                        <div style={{ marginTop: '30px' }}>
                            <Button onClick={handleSaveUpdate} style={{ fontFamily: 'Montserrat', fontSize: 16, fontWeight: 500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing: 1, borderRadius: 12, width: 170, padding: "18px, 10px, 18px, 10px" }}>
                                Save Changes</Button>
                        </div>

                        <div style={{ marginTop: '50px' , display:'flex' , flexDirection:'row'}}>

                           <div> <img  src={Logout} height={20} width={20}/> </div> 
                       <p onClick={handleLogout}  style={{color:'red', fontWeight:500, fontSize:'18px' , paddingBottom:'5px', marginLeft:'5px'}}>Log out</p>
                        </div>


                    </>
                </TabPanel>
                <TabPanel value="2">

                    <div style={{display:'flex', flexDirection:'row'}}>
                        <div className="me-3">
                            <label>Current Password</label>
                        <InputGroup>
                    <Form.Control
                      size="lg"
                      value={password} onChange={(e) => handlePasswordChange(e)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    //   disabled={showOtpVerification}
                      style={{
                        position: "relative",
                        boxShadow: "none",
                        border: "1px solid rgba(217, 217, 217, 1)",
                        fontSize: 16,
                        fontWeight: 500,
                        color: "rgba(34, 34, 34, 1)",
                        fontFamily: "Gilroy",
                        borderRight: "none"
                      }}
                           />
                    <InputGroup.Text    onClick={togglePasswordVisibility} style={{ background: "transparent", border: "1px solid rgba(217, 217, 217, 1)", cursor: "pointer" , borderLeft: "none"}}>
                    {showPassword ? (
               <Eye size="20" color="rgba(30, 69, 225, 1)" />
            ) : (
             
              <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
            )}
                    </InputGroup.Text>

                  </InputGroup>
                        </div>


                        <div>
                        <label>New Password</label>
                        <InputGroup>
                    <Form.Control
                      size="lg"
                      value={password} onChange={(e) => handlePasswordChange(e)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    //   disabled={showOtpVerification}
                      style={{
                        position: "relative",
                        boxShadow: "none",
                        border: "1px solid rgba(217, 217, 217, 1)",
                        fontSize: 16,
                        fontWeight: 500,
                        color: "rgba(34, 34, 34, 1)",
                        fontFamily: "Gilroy",
                        borderRight: "none"
                      }}
                           />
                    <InputGroup.Text    onClick={togglePasswordVisibility} style={{ background: "transparent", border: "1px solid rgba(217, 217, 217, 1)", cursor: "pointer" , borderLeft: "none"}}>
                    {showPassword ? (
               <Eye size="20" color="rgba(30, 69, 225, 1)" />
            ) : (
             
              <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
            )}
                    </InputGroup.Text>

                  </InputGroup>
                        </div>
                    </div>
                    <div style={{ marginTop: '30px' }}>
                            <Button  style={{ fontFamily: 'Montserrat', fontSize: 16, fontWeight: 500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing: 1, borderRadius: 12, width: 170, padding: "18px, 10px, 18px, 10px" }}>
                                Save Changes</Button>
                        </div>

                </TabPanel>

            </TabContext>


        </div>

    )
}
export default Accountsettings;