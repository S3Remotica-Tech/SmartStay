import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import EB_Billings from "./EB_Billings";


const Billings = () => {

  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const [hostelcheckedvalues,setHostelCheckedvalues]= useState([])

   console.log("hostelcheckedvalues check",hostelcheckedvalues);

   const handleCheckboxChange = (hostelId, Ischecked) => {
    setHostelCheckedvalues(prevState => {

        const index = prevState.findIndex(item => item.id === hostelId);

        if (index !== -1) {
            prevState.splice(index, 1);
        }
        return [
            ...prevState,
            { id: hostelId, isHostelBased: Ischecked }
        ];
    });
};


    useEffect(()=>{
      console.log("hostelcheckedvalues",hostelcheckedvalues);

    },[hostelcheckedvalues])
   

    const handleSave = () => {
        dispatch({ type: 'CHECKEB', payload: {hostelcheckedvalues}})
    }
    console.log("state for EB",state )
    

    useEffect(() => {
      dispatch({ type: 'HOSTELLIST' })
    }, [])

   
    const LoginId = localStorage.getItem("loginId")

    const [filterhostellist,setFilterhostellist] = useState([]);

    useEffect(() => {
      if (LoginId) {
        try{
          const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
          const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
          const parsedData = decryptedString;
          const filteredList = state.UsersList?.hostelList?.filter((view) =>{ 
            console.log("parsedData",parsedData);
            console.log("created_By",view.created_By);
            console.log("view.created_By == parsedData",view.created_By == parsedData);
          return view.created_By == parsedData;
        
          
          });
          console.log("filteredlist",filteredList);
           setFilterhostellist(filteredList)
        }
        
          catch(error){
         console.log("Error decrypting loginid",error);
          }

    
      }
  
    }, [LoginId])

    console.log("Useridfilter",state?.UsersList?.hostelList);

    return (
        <div>
<div>
                     <div className='d-flex  justify-content-between'>
                  <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 600 }}>EB Billing</h2>
                  </div>
                  <div className='justify-content-end'>
                    <button type="button" class="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }}  onClick={handleSave} >Save change</button>
                    <button type="button" class="mb-2" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} >Cancel</button>

                </div>
                 
                </div>
                <hr style={{ opacity: 0.1 }} />

           <div>
      
        <div style={{ backgroundColor: "#E6EDF5",color:'black',padding:'5px' }}>
          <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{fontWeight:600,flex:1}}>Hostel Name</div>
            <div className="text-center" style={{flex:1,fontWeight:600}}>Hostel Based<i class="bi bi-info-circle-fill ms-1"></i></div>           

          </div>
        </div>
     
         <div></div>
        { filterhostellist.length>0 && filterhostellist.map((item) => (
          <EB_Billings Item={item} handleSave={handleSave} onBoxchange={handleCheckboxChange}/>

         ))}
          {filterhostellist.length === 0 && (
                        <div>
                          <div  style={{ textAlign: "center", color: "red",marginTop:'10px' }}>No data found</div>
                        </div>
                      )}
         </div>
                   
            </div>
        </div>
    )
}
export default Billings;