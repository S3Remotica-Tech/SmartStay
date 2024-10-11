import React,{ useState , useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { MdError } from "react-icons/md";
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort ,Edit, Trash} from 'iconsax-react';


function getFloorName(floor_Id) {

  
  const adjustedFloorNumber = floor_Id - 1;

 
  if (adjustedFloorNumber === 0) {
    return 'Ground Floor';
  } else {
   
    const lastDigit = adjustedFloorNumber % 10;
    let suffix = 'th';

   
    if (adjustedFloorNumber % 100 < 11 || adjustedFloorNumber % 100 > 13) {
      switch (lastDigit) {
        case 1:
          suffix = 'st';
          break;
        case 2:
          suffix = 'nd';
          break;
        case 3:
          suffix = 'rd';
          break;
      }
    }

    return `${adjustedFloorNumber}${suffix} Floor`;
  }
}



function DeleteFloor({ show, handleClose, currentItem}) {

  const state = useSelector(state => state)
console.log("currentItem",currentItem)
const dispatch = useDispatch();


    // const  getFloorName = (floor_Id)=> {
    //     // Mapping of numbers to words for easier conversion
    //     const numberToWord = {
    //       1: 'First',
    //       2: 'Second',
    //       3: 'Third',
    //       4: 'Fourth',
    //       5: 'Fifth',
    //       6: 'Sixth',
    //       7: 'Seventh',
    //       8: 'Eighth',
    //       9: 'Ninth',
    //       10: 'Tenth',
    //       11: 'Eleventh',
    //       12: 'Twelfth',
    //       13: 'Thirteenth',
          
    //     };
      
        
    //     if (floor_Id === 1) {
    //       return 'Ground Floor';
    //     } else if (numberToWord[floor_Id - 1]) {
         
    //       return `${numberToWord[floor_Id - 1]} Floor`;
    //     } else {
         
    //       const floorNumber = floor_Id - 1;
    //       const lastDigit = floorNumber % 10;
    //       let suffix = 'th';
      
    //       if (floorNumber !== 11 && floorNumber !== 12 && floorNumber !== 13) {
    //         switch (lastDigit) {
    //           case 1:
    //             suffix = 'st';
    //             break;
    //           case 2:
    //             suffix = 'nd';
    //             break;
    //           case 3:
    //             suffix = 'rd';
    //             break;
    //         }
    //       }
      
    //       return `${floorNumber}${suffix} Floor`;
    //     }
    //   }
      

    const handleDelete = () => {
     
if( currentItem.hostel_Id && currentItem.floor_Id){
  dispatch({ type: 'DELETEFLOOR', payload:{id: currentItem.hostel_Id, floor_id: currentItem.floor_Id }})
  // handleClose()
}
    }


    // const [filteredDataRoom, setFilteredDataRoom] = useState([]);

    // useEffect(() => {
    //   const filtered = state.PgList.roomCount && state.PgList.roomCount.filter((view) => {
    //     return view.Hostel_Id === currentItem.hostel_Id && view.Floor_Id === currentItem.floor_Id;
    //   });
    //   setFilteredDataRoom(filtered);
  
    //   console.log("filtered",filtered);
    // }, [currentItem.hostel_Id, currentItem.floor_Id, state.PgList.roomCount]);

console.log("state dlete floor",state)

useEffect(() => {
  if (state.UsersList?.deleteFloorError) {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_DELETE_FLOOR_ERROR' });
    }, 3000);    
  }
}, [state.UsersList?.deleteFloorError]);




  return (
    <div>  
        <Modal show={show} onHide={handleClose} centered backdrop="static">
    <Modal.Header style={{display:"flex", justifyContent:"center"}} >
      <Modal.Title style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy"}}>Delete floor ?</Modal.Title>
      {/* <CloseCircle size="24" color="#000"  onClick={handleClose}/> */}
    </Modal.Header>

    
    {state.UsersList?.deleteFloorError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                            {state.UsersList?.deleteFloorError}
                        </label>
                    </div>
                )}
    <Modal.Body style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy", textAlign:"center"}}>
            {`Are you sure you want to delete the ${getFloorName(currentItem.floor_Id)}?`}
      </Modal.Body>
    <Modal.Footer className='d-flex justify-content-center' style={{border:"none"}}>
    <Button  onClick={handleClose} style={{borderRadius:8, padding:"16px 45px",border:"1px solid #1E45E1",backgroundColor:"#FFF",color:"#1E45E1",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}}>
            Cancel
          </Button>
      
          <Button style={{borderRadius:8, padding:"16px 45px",border:"1px solid #1E45E1",backgroundColor:"#1E45E1",color:"#fff",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}} onClick={handleDelete}>
            Delete
          </Button>
         
    </Modal.Footer>
  </Modal>
  
  </div>
  )
}

export default DeleteFloor
