import React,{ useState , useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';





function DeleteFloor({ show, handleClose, currentItem}) {

  const state = useSelector(state => state)
console.log("currentItem",currentItem)
const dispatch = useDispatch();


    const  getFloorName = (floor_Id)=> {
        // Mapping of numbers to words for easier conversion
        const numberToWord = {
          1: 'First',
          2: 'Second',
          3: 'Third',
          4: 'Fourth',
          5: 'Fifth',
          6: 'Sixth',
          7: 'Seventh',
          8: 'Eighth',
          9: 'Ninth',
          10: 'Tenth',
          11: 'Eleventh',
          12: 'Twelfth',
          13: 'Thirteenth',
          
        };
      
        
        if (floor_Id === 1) {
          return 'Ground Floor';
        } else if (numberToWord[floor_Id - 1]) {
         
          return `${numberToWord[floor_Id - 1]} Floor`;
        } else {
         
          const floorNumber = floor_Id - 1;
          const lastDigit = floorNumber % 10;
          let suffix = 'th';
      
          if (floorNumber !== 11 && floorNumber !== 12 && floorNumber !== 13) {
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
      
          return `${floorNumber}${suffix} Floor`;
        }
      }
      

    const handleDelete = () => {
if( currentItem.hostel_Id && currentItem.floor_Id){
  dispatch({ type: 'DELETEFLOOR', payload:{id: currentItem.hostel_Id, floor_id: currentItem.floor_Id }})
  handleClose()
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



  return (
    <div>  
        <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy"}}>Delete floor ?</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy"}}>
            {/* {filteredDataRoom.length > 0 ? " Please delete rooms before deleting the floor" : `Are you sure you want to delete the ${getFloorName(currentItem.floor_Id)}?`} */}
            {`Are you sure you want to delete the ${getFloorName(currentItem.floor_Id)}?`}
      </Modal.Body>
    <Modal.Footer className='d-flex justify-content-center' style={{border:"none"}}>
    <Button  onClick={handleClose} style={{width:160,height:52,borderRadius:8, padding:"16px, 45px, 16px, 45px",border:"1px solid rgba(36, 0, 255, 1)",backgroundColor:"#FFF",color:"rgba(36, 0, 255, 1)",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}}>
            Cancel
          </Button>
         {/* { filteredDataRoom.length > 0 ? "": */}
          <Button style={{width:160,height:52,borderRadius:8, padding:"16px, 45px, 16px, 45px",border:"1px solid rgba(36, 0, 255, 1)",backgroundColor:"rgba(36, 0, 255, 1)",color:"#fff",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}} onClick={handleDelete}>
            Delete
          </Button>
          {/* } */}
    </Modal.Footer>
  </Modal>
  
  </div>
  )
}

export default DeleteFloor
