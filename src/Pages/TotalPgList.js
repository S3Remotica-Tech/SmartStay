import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';


function getFloorName(floor_Id) {
  if (floor_Id >= 11 && floor_Id <= 13) {
      return `${floor_Id}th Floor`;
  } else {
      const lastDigit = floor_Id % 10;
      let suffix = '';

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
          default:
              suffix = 'th';
              break;
      }

      return `${floor_Id}${suffix} Floor`;
  }
}



function TotalPgList(props) {

    // const state = useSelector(state => state)
    // const dispatch = useDispatch();


    // useEffect(() => {
    //     dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
    //        }, [props.floorID, props.hostel_Id,props.room_id])



  return (
    <>

<span  className="badge  rounded-pill p-2 text-black" style={{ fontSize: "11px",backgroundColor:"#cccccc88", color: "gray", fontWeight: "700" }}>{getFloorName(props.floorID)}</span>

        
    </>
  )
}

export default TotalPgList