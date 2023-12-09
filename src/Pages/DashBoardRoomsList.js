import Room from '../Assets/Images/Room.png';
import Plus from '../Assets/Images/Create-button.png';
import { FaAngleRight } from "react-icons/fa";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function DashBoardRoomsList(props) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log("props",props);
        dispatch({type:'ROOMCOUNT',payload:{floor_Id:props.floorID,hostel_Id:props.hostel_Id}})
        console.log("state",state);
    },[])

    return (
        <div class="floor d-flex">
            <div class="card h-100" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0,0.3)", width: "auto" }}>

            
<div class="card-header d-flex justify-content-between p-2"><strong style={{ fontSize: "13px" }}>{props.floorID} Floor</strong> <FaAngleRight class="" style={{ height: "15px", width: "15px", color: "grey" }} /></div>
              
               
              <div class="card-body">
                  <p class="card-title text-center">{state.UsersList.roomCount[props.floorID-1]?.length} Rooms</p>
                  <div class="row row-gap-3 pe-3">
                    {
                        state.UsersList.roomCount[props.floorID-1]?.map((obj)=>{
                            return(
                                <div class="col-4">
                                <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                                    <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                    <p style={{ marginTop: "2px", fontSize: "10px" }}>{state.UsersList.roomCount[props.floorID-1]?.length> 0 ? obj.Room_Id : 0}</p>
                                </div>
                            </div>
                            )
                        })
                    }
                      {/* <div class="col-4">
                          <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                              <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                              <p style={{ marginTop: "2px", fontSize: "10px" }}>{state.UsersList.roomCount[props.floorID-1]?.length> 0 ? state.UsersList.roomCount[props.floorID-1][0].Room_Id : 0}</p>
                          </div>
                      </div> */}
                     
                  </div>
              </div>
{/* </>
                            )
                        })
                    } */}

                    {/* </>
                   ) 
                })
               } */}

                {/* <div class="card-header d-flex justify-content-between p-2"><strong style={{ fontSize: "13px" }}>1st Floor</strong> <FaAngleRight class="" style={{ height: "15px", width: "15px", color: "grey" }} /></div>
              
               
                <div class="card-body">
                    <p class="card-title text-center">(05) Rooms</p>
                    <div class="row row-gap-3 pe-3">
                        <div class="col-4">
                            <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                                <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                <p style={{ marginTop: "2px", fontSize: "10px" }}>F001</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                                <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                <p style={{ marginTop: "2px", fontSize: "10px" }}>F002</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                                <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                <p style={{ marginTop: "2px", fontSize: "10px" }}>F003</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                                <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                <p style={{ marginTop: "2px", fontSize: "10px" }}>F004</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px" }}>
                                <img src={Room} style={{ height: "100px", width: "35px", paddingTop: "1px", color: "gray" }} alt='Room' />
                                <p style={{ marginTop: "2px", fontSize: "10px" }}>F005</p>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="card text-bg-light text-center align-items-center" style={{ height: "60px", width: "35px", borderRadius: "5px", border: "1px solid #2E75EA" }}>
                                <img src={Plus} class="pt-2 mb-0" height="25" width="15" alt='Room' />
                                <p style={{ color: "#1F75FE", paddingTop: "2px", fontSize: "10px" }} class="mb-0">Create Room</p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
export default DashBoardRoomsList;