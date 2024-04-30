import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';



function getFloorName(floorID) {
    if (floorID === 1) {
        return 'Ground Floor';
    } else if (floorID === 2) {
        return '1st Floor';
    } 
    else if (floorID === 3) {
        return '2nd Floor';
    } 
    else if (floorID === 4) {
        return '3rd Floor';
    } 
    else if (floorID === 5) {
        return '4th Floor';
    }
    
    else if (floorID >= 6 && floorID <= 10) {
        return `${floorID - 1}th Floor`;
    }

    else if (floorID >= 11 && floorID <= 13) {
        return `${floorID-1}th Floor`;
    } 
    else {
        const lastDigit = floorID % 10;
        let suffix = 'th';

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

        return `${floorID}${suffix} Floor`;
    }
}



function SelectedHostelFloorList(props) {


    // const state = useSelector(state => state)

    // const dispatch = useDispatch()


    // useEffect(() => {
    //     //dispatch({ type: 'ROOM----COUNT', payload: { floor_Id: props.floorID } })
    //     dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
    // }, [props.floorID])





  return (
    <div className="col-lg-1 col-md-2 col-sm-2 col-xs-12 col-12 " style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >

<div style={{ fontSize: "11px", color: "gray", fontWeight: "700" }}>{getFloorName(props.floorID)}</div>

    </div>
  )
}

export default SelectedHostelFloorList;