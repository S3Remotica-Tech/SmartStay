import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Logo from '../Assets/Images/Logo-Icon.png'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import Roombased from './EB_RoomBased';
// import CryptoJS from "crypto-js";


function EB_Hostel() {



  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("state for EB",state )

  // useEffect(() => {
  //   dispatch({ type: 'HOSTELLIST' })
  // }, [])


  // const loginId = localStorage.getItem('loginId');
  // useEffect(() => {
  //   if (loginId) {
  //     try {
  //       const decryptedId = CryptoJS.AES.decrypt(loginId, 'abcd');
  //       const decryptedIdString = decryptedId.toString(CryptoJS.enc.Utf8);
  //       console.log('Decrypted Login Id:', decryptedIdString);
  //       const parsedData = Number(decryptedIdString);

  //       dispatch({ type: 'HOSTELLIST', payload:{ loginId: parsedData} })
        
  //     } catch (error) {
  //       console.error('Error decrypting loginId:', error);
  //     }
  //   }
  // }, []);


  // let LoginId = localStorage.getItem("loginId")

  // const [filterhostellist,setFilterhostellist] = useState([]);

  // useEffect(() => {
  //   if (LoginId) {
 
  //      console.log("executed **********S")
  //      try{
  //        const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
  //        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
  //        const parsedData = decryptedString;
        
  //        const filteredList = state.UsersList?.hostelList?.filter((view) =>{ 
  //          console.log("parsedData",parsedData);
  //          console.log("created_By",view.created_By);
  //          console.log("view.created_By == parsedData",view.created_By == parsedData);
  //        return view.created_By == parsedData;
       
         
  //        });
  //        console.log("topbar_filteredlist",filteredList);
  //         setFilterhostellist(filteredList)
 
 
          
       
  //      }
       
  //        catch(error){
  //       console.log("Error decrypting loginid",error);
  //        }
  
  //    }
 
  //  },[state.UsersList?.hostelList, LoginId ])


  const [isvisible ,setISVisible] = useState(false);
  const [backbtn,setBackbtn] = useState(true)
  const [hosteldetails,setHosteldetails]= useState('')

  const handleEbbill = (hostel)=> {
    setISVisible(true)
    console.log("hostel",hostel);
    setHosteldetails(hostel)
  }



  const handleback = (isShow) => {
    setBackbtn(isShow)
    setISVisible(false)
  }



  return (
   
    <div style={{width:"100%"}}>
     
    {
      isvisible ?
       <Roombased visibility={handleback} hosteldetails = {hosteldetails}/> :
       <div className='row mt-4 ms-4 me-4'>
        <h4 style={{fontSize:16,fontWeight:600}}>EB Plan</h4>
        <p style={{fontSize:13}}>Manage your account settings</p>
      
        {state.UsersList.hostelList.length > 0 && state.UsersList.hostelList.map((hostel) => (
      
        <div className='col-lg-4 col-md-6 col-xs-12 col-sm-12  mt-3'>
       
        <Card style={{height:"auto",backgroundColor:"#F6F7FB"}} onClick={()=>{handleEbbill(hostel)}}>
            <Card.Body>
              <div className='row d-flex align-items-center justify-content-center' >
              <div className="col-lg-4 col-md-4 col-xs-12 col-sm-12 col-12" style={{ border: "1px solid lightgray", display: "flex", alignItems: "center", justifyContent: "center", width:55, height:55, borderRadius: 100, padding:20 }}>
                      <Image src={hostel.profile == null ? Logo : hostel.profile} roundedCircle
                          style={{
                              height: 50,
                              width: 50,
                              borderRadius: '50%',
                             
                          }} />
      
                      </div>
                      <div className="col-lg-8 col-md-4 col-xs-12 col-sm-12 col-12">
                        <h6>{hostel.Name}</h6>
                      </div>
              </div>
           
                      
            </Card.Body>
          </Card>
       
        </div>
         ))}
      
         
        </div>
      } 
      
       
       
      
     
    
                       </div>
                       
  


  

  )
}

export default EB_Hostel