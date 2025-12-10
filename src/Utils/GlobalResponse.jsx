
import { useDispatch } from "react-redux";
// import { StoreSelectedHostelAction} from "../Redux/Action/smartStayAction";


export function GlobalResponse(response) {

const dispatch = useDispatch();

  const hostelId = response?.data?.hostelId;

  if (hostelId) {
    // dispatch(StoreSelectedHostelAction(hostelId));
        console.log("all api response Hostel id", hostelId);
  }
}
