import { useEffect, useState } from "react";
import RoomDetailsPage from "./RoomDetailsPage";
function CreatePG(props) {
    const [number_Of_Rooms,setnumber_Of_Rooms] = useState('')
    const [roomList,setRoomList] = useState([])

useEffect(()=>{
let tempArray=[];
const timeOut = setTimeout(() => {
    for ( let i = 0; i<number_Of_Rooms; i++){
        let obj= {
            roomName:'',
            number_Of_Bed:''
        }
        tempArray.push(obj)
    } 
    setRoomList(tempArray)
}, 1000);

return () => clearTimeout(timeOut)

},[number_Of_Rooms])

const handleUpdateRoomList = (index,isnumberOfBed, value) =>{
if(isnumberOfBed===true){
    var roomListTemp = roomList
    roomListTemp[index].number_Of_Bed = value
    setRoomList(roomListTemp)
}
else{
    var roomListTemp = roomList
    roomListTemp[index].roomName = value
    setRoomList(roomListTemp)
}
props.handleFloorList(props.index,roomList)
}

    return (
        <>
            <div className="row mb-2">
                <div className="col">
                    <label className='mb-2' htmlFor={`totalRooms-${props.index}`} style={{ fontSize: "11px" }}>Number of Rooms</label>
                    <input
                        type="text"
                        className="form-control custom-border-bottom p-0"
                        id="exampleInput"
                        placeholder="Enter here"
                        style={{ fontSize: "11px" }}
                        value={number_Of_Rooms}
                        onChange={(e) => {
                            setnumber_Of_Rooms(e.target.value)
                            // props.setPgList({
                            //     ...props.pgList,
                            //     number_Of_Rooms: e.target.value
                            //     // [`number_Of_Rooms_${floorNumber}`]: e.target.value,
                            // });
                        }}
                    />
                </div>
            </div>

            {Array.from({ length:number_Of_Rooms }, (_, roomIndex) => (
                <RoomDetailsPage roomIndex={roomIndex} updateRoom={handleUpdateRoomList}></RoomDetailsPage>
            ))}
        </>
    )
}
export default CreatePG;