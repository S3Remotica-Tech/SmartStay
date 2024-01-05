import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Forgetpass.css";
import img from "../Assets/Images/hand.png";
import Smart from "../Assets/Images/Logo-Icon-White.png";
import Tools from "../Assets/Images/Smart-Tools.png";
import Support from "../Assets/Images/Total-Support.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import eye from '../Assets/Images/login-password.png';
import eyeClosed from '../Assets/Images/pngaaa.com-6514750.png'

function ForgetPasswordPage() {

    const state = useSelector(state => state)
    const dispatch = useDispatch();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowpassword] = useState(false)

    let navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowpassword(!showPassword);
    };

    const handleEmailid = (e) => {
        dispatch({ type: 'CLEAR_ERROR' })
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        dispatch({ type: 'CLEAR_ERROR' })
        setPassword(e.target.value)
    }

    const handlePasswordReset = () => {
        if (email && password) {
            dispatch({ type: 'FORGETPAGE', payload: { NewPassword: password, email: email } })

            setEmail("")
            setPassword("")

        }
        else {
            if (email == '') {
                dispatch({ type: 'ERROR', payload: "Please Enter Email" })

            }
            else if (password == '') {
                dispatch({ type: 'ERROR', payload: "Please Enter password" })

            }
            else {
                dispatch({ type: 'ERROR' })

            }
        }

    }

    const handleLogin = () => {
        navigate('/login-Page')
    }
    return (
        <>
            <div className="forget" >

                <div className="Content1">
                    <div className="d-flex justify-content-center pt-5" >
                        <img src={Smart} class="img-fluid rounded-3" style={{ height: "35px", width: "35px", backgroundColor: "" }} alt="Smart" />
                        <h3 className="ps-2" style={{ fontSize: "25px", fontWeight: "400", wordSpacing: "" }}>smartstay</h3>
                    </div>
                    <p className="d-flex justify-content-center pt-2 mb-2" style={{ fontSize: "15px" }}>Welcome to Smartstay</p>
                    <p className="d-flex justify-content-center" style={{ fontSize: "11px", paddingTop: "-1px" }}>Over 157,000 hotels and homes across 35 countries</p>
                    <div style={{ paddingTop: "40px" }}>
                        <div className="d-flex justify-content-start ps-5" ><img src={Tools} class="img-fluid" style={{ height: "50px", width: "50px" }} alt="Tools" /></div>
                        <p className="d-flex justify-content-start ps-5 pt-0 mb-0" style={{ fontSize: "13px" }} >Smart Tools</p>
                        <p className="d-flex justify-content-start ps-5 pe-5 pt-2" style={{ fontSize: "11px" }} >Easy-to-use tools that let you integrate our offerings, search
                            and share content, track performance and manage earnings.</p>
                    </div>
                    <div style={{ paddingTop: "20px" }}>
                        <div className="d-flex justify-content-start ps-5"  ><img src={Support} class="img-fluid" style={{ height: "50px", width: "50px" }} alt="Support" /></div>
                        <p className="d-flex justify-content-start ps-5 mb-0" style={{ fontSize: "13px" }} >Total Support</p>
                        <p className="d-flex justify-content-start ps-5  pe-5 text-justify pt-2 mb-5" style={{ fontSize: "11px" }} >A dedicated team to help resolve any issues yoiu may face while using our products or promoting our hotels.</p>
                    </div>
                </div>


                <div className="forget1 col">

                    <div className="text-end m-2" >
                        <span className="right-content lh-1" style={{ fontSize: "13px" }}>Return to your</span>
                        <button onClick={() => handleLogin()} style={{ fontSize: "13px", padding: "2px", backgroundColor: "white", color: "#007FFF", borderRadius: "30px", fontWeight: "bold", borderColor: "#2C77EC", width: "150px", height: "30px" }} type="button" class="btn btn-outline-primary createbutton ms-2" >Login</button>
                    </div>

                    <div className="text-center mt-5">
                        <div style={{ lineHeight: "0px" }}>
                            <h4 style={{ fontSize: "18px", fontWeight: "600" }}><b className="m-1 mt-4 fw-bold">Forget your password<img src={img} style={{ marginBottom: "5px", width: "30px", height: "30px" }} alt="forgetPass"></img></b></h4>
                            <p style={{ fontSize: "13px" }} className="few" >We need a few basic details to consider your profile</p><br />
                        </div>
                        <div style={{ paddingLeft: "20%", marginTop: "30px" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                {
                                    state.NewPass.errorMessage?.length > 0 ? <label style={{ color: "red" }}>{state.NewPass.errorMessage}</label> : null


                                }
                                <label class="reset" htmlFor="email" >Reset Key From Your Email </label>
                                <input className="pass" type="email" id="email" placeholder="Enter Reset Key From Your Email" name="email" value={email} onChange={(e) => handleEmailid(e)} />

                            </div>

                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "2%" }}>
                                <label htmlFor="pwd" class="reset1">New Password</label>
                                <input className="pass1" type={showPassword ? 'text' : 'password'} id="pwd" placeholder="Enter new password" name="pwd" value={password} onChange={(e) => handlePassword(e)} />
                                <div className="pwd" style={{ position: 'relative', width: '70%' }}>

                                    <img
                                        src={showPassword ? eye : eyeClosed}

                                        style={{

                                            position: 'absolute',
                                            right: '10px',
                                            bottom: "5px",
                                            width: 20,
                                            cursor: 'pointer',

                                        }}
                                        onClick={togglePasswordVisibility}
                                    />
                                </div>

                                {
                                    state.NewPass.errorPassword.length > 0 ? <label style={{ color: "red" }}>{state.NewPass.errorPassword}</label> : null


                                }
                            </div>
                        </div>


                        <div className="list d-flex" >
                            <ul>
                                <li className="one" style={{ textAlign: "left" }}>One Upper Case Character</li>
                                <li style={{ textAlign: "left" }}>One Special Character</li>
                            </ul>
                            <div className="rightside">

                                <ul>
                                    <li style={{ textAlign: "left" }}>8 Characters Minimum</li>
                                    <li style={{ textAlign: "left" }}>One number</li>
                                </ul>
                            </div>
                        </div>

                        <button type="submit" style={{ backgroundColor: "#2f74eb" }} className="btn  mt-2 ps-4 pe-4 text-white"><p className="passss" style={{ fontSize: 12, fontWeight: 500 }} onClick={handlePasswordReset}>PASSWORD RESET</p></button>

                        <div className="footer" style={{ lineHeight: "30%", marginTop: "20px", fontSize: 13 }}>
                            <p>By clicking 'sign in for free' I accept the</p>
                            <p><span className="text-primary"><b>Terms of use</b></span>  &  <span className="text-primary"><b>Privacy Policy</b></span> of Smartstay</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPasswordPage;