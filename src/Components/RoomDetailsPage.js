import { useState } from "react";
function RoomDetailsPage (props) {
    const [roomDetails, setRoomDetails] = useState({
        roomNo: '',
        numberOfBed: ''
    })
    const [roomList,setRoomList] = useState([])
    const [floorDetails, setfloorDetails] = useState([])
    const handleRoom = (e) => {
        const room = e.target.value;
        setRoomDetails({ ...roomDetails, roomNo: room })
        props.updateRoom(0, false, e.target.value)
        // setfloorDetails([...floorDetails, { roomDetails }])
        // setRoomNo(room)
        // setfloorDetails([...floorDetails,{RoomNo:room}])
    }
    const handleUpdateBed = (e) => {
        const bed = e.target.value;
        setRoomDetails({ ...roomDetails, numberOfBed: bed })
        props.updateRoom(0, true, e.target.value)
        // setfloorDetails([...floorDetails, { roomDetails }])
        // setNumberOfBed(bed)
        // setfloorDetails([...floorDetails,{NumberOfBed:bed}])
    }
    return (
        <>
        <div key={props.roomIndex} className="row">
                    <div className="col">
                        <label htmlFor={`roomName-${props.roomIndex}`} style={{ fontSize: "11px" }}>Room Name</label>
                        <input
                            type="text"
                            className="form-control custom-border-bottom p-0"
                            id="exampleInput"
                            placeholder="Enter here"
                            style={{ fontSize: "11px" }}
                            value={roomDetails.roomNo}
                            onChange={(e) => { handleRoom(e) }}
                        // onChange={(e)=>{setfloorDetails([...floorDetails.RoomDetails,{RoomNo:e.target.value}])}}
                        // onChange={(e)=>{setPgList({...pgList,floorDetails:[...pgList.floorDetails,{roomNo:e.target.value}]})}}
                        />
                    </div>

                    <div className="col">
                        <label htmlFor={`beds-${props.roomIndex}`} style={{ fontSize: "11px" }}>Number of Beds</label>
                        <input
                            type="text"
                            className="form-control custom-border-bottom p-0 mt-2"
                            id="exampleInput"
                            placeholder="Enter here"
                            style={{ fontSize: "11px" }}
                            value={roomDetails.numberOfBed}
                            onChange={(e) => { handleUpdateBed(e) }}
                        // onChange={(e)=>{setfloorDetails([...floorDetails.RoomDetails,{NumberOfBeds:e.target.value}])}}
                        // onChange={(e)=>{setPgList({...pgList,floorDetails:[...pgList.floorDetails,{number_Of_Bed:e.target.value}]})}}
                        />
                    </div>
                </div>
        </>
    )
}
export default RoomDetailsPage;