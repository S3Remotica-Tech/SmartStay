import AxiosConfig from "../../WebService/AxiosConfig";
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";




// V2

export async function createPgList(params) {


  try {
    const formData = new FormData();

 
    if (params.payloads) {
      const payloadsBlob = new Blob(
        [JSON.stringify(params.payloads)],
        { type: "application/json" }
      );
      formData.append("payloads", payloadsBlob);
    }

      if (params.mainImage) {
      formData.append("mainImage", params.mainImage);
    } else {
      
      // formData.append(
      //   "mainImage",
      //   new Blob([], { type: "application/octet-stream" }),
      //   "empty.txt"
      // );
    }

       if (params.additionalImages && params.additionalImages.length > 0) {
      params.additionalImages.forEach((img) => {
        if (img) {
          formData.append("additionalImages", img);
        }
      });
    }else {
            // formData.append(
      //   "additionalImages",
      //   new Blob([], { type: "application/octet-stream" }),
      //   "empty.txt"
      // );
    }

    const response = await AxiosConfigV2.post("/v2/hostel", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 100000000,
     
    });

    return response;
  } catch (error) {
    console.error("Axios Error", error);
  }
}


export async function Checkeblist(datum) {
  return await AxiosConfig.post("/EB/Hostel_Room_based", datum, {
    data: datum,
  });
}

export async function CreateEbbill(datum) {
  return await AxiosConfig.post("/add_room_reading", datum, {
    data: datum,
  });
}

export async function EB_Customerlist() {
  return await AxiosConfig.get("/list/eb_list", {});
}

export async function EB_startmeterlist(datum) {
  return await AxiosConfig.post("/list/Ebstartmeter",datum, {
    data:datum,
  });
}
export async function EB_CustomerListTable(datum) {
  return await AxiosConfig.post("/customer_readings",datum, {
data:datum,
  });
}


// v1

// export async function createRoom(datum) {
//   return await AxiosConfig.post("/room/create-room", datum, {
//     data: datum,
//   });
// }

// v2
export async function createRoom(datum) {
  return await AxiosConfigV2.post("/v2/room", datum, {
    data: datum,
  });
}


// v2

export async function getAllRoom(datum) {
   return await AxiosConfigV2.get(`/v2/room/all-rooms/${datum.floor_Id}`);
}



// v2
  
export async function updateRoom(datum) {
  return await AxiosConfigV2.put(`/v2/room/${datum.roomId}/${datum.hostelId}`, datum, {
    data: datum,
  });
}






export async function CheckRoomId() {
  return await AxiosConfig.get("/room-id/check-room-id", {});
}

export async function CheckBedDetails(datum) {
  return await AxiosConfig.post("/bed/bed-details", datum, {
    data: datum,
  });
}

export async function createAllPGDetails(datum) {
  return await AxiosConfig.post("/list/dashboard", datum, {
    data: datum,
  });
}

// v1

// export async function createBed(datum) {
//   return await AxiosConfig.post("/create-bed", datum, {
//     data: datum,
//   });
// }

// v2

export async function createBed(datum) {
  return await AxiosConfigV2.post("/v2/bed", datum, {
    data: datum,
  });
}


// v2
export async function getAllBed(datum) {
  return await AxiosConfigV2.get(`/v2/bed/all-beds/${datum.roomId}`, datum, {
    data: datum,
  });
}


// v1
// export async function DeleteBed(datum) {
//   return await AxiosConfig.post("/delete/delete-bed", datum, {
//     data: datum,
//   });
// }

// v2

export async function DeleteBed(datum) {
  return await AxiosConfigV2.delete(`/v2/bed/${datum.bedId}`);
}

export async function DeletePG(datum) {
  return await AxiosConfig.post("/delete/delete-hostel", datum, {
    data: datum,
  });
}


// v1

// export async function UpdateFloor(datum) {
//   return await AxiosConfig.post("/update_floor", datum, {
//     data: datum,
//   });
// }

// v2

export async function UpdateFloor(datum) {
  return await AxiosConfigV2.put(`/v2/floor/${datum.id}`, datum, {
    data: datum,
  });
}



// v2

export async function UpdateBed(datum) {
  return await AxiosConfigV2.put(`/v2/bed/${datum.bedId}`, datum, {
    data: datum,
  });
}


// v1

// export async function OccupiedCustomer(datum) {
//   return await AxiosConfig.post("/get_beduser_details", datum, {
//     data: datum,
//   });
// }


// v2


export async function OccupiedCustomer(datum) {
  return await AxiosConfigV2.get(`/v2/bed/${datum.bedId}`, datum, {
    data: datum,
  });
}

export async function deleteHostelImages(datum) {
  return await AxiosConfig.post("/delete_hostel_image", datum, {
    data: datum,
  });
}
export async function editElectricity(datum) {
  return await AxiosConfig.post("/edit_room_reading", datum, {
    data: datum,
  });
}
export async function deleteElectricity(datum) {
  return await AxiosConfig.post("/delete_room_reading", datum, {
    data: datum,
  });
}

export async function dashboardFilter(datum) {
  return await AxiosConfig.post("/dash_filter", datum, {
    data: datum,
  });
}

// Hostel_based

export async function ebHostelBasedRead(datum) {
  return await AxiosConfig.post("/get_hostel_reading", datum, {
    data: datum,
  });
}

export async function ebAddHostelReading(datum) {
  return await AxiosConfig.post("/add_hostel_reading", datum, {
    data: datum,
  });
}


export async function ebAddHostelEdit(datum) {
  return await AxiosConfig.post("/edit_hostel_reading", datum, {
    data: datum,
  });
}
export async function ebAddHostelDelete(datum) {
  return await AxiosConfig.post("/delete_hostel_reading", datum, {
    data: datum,
  });
}

export async function announcement_list(datum) {
  return await AxiosConfig.post("/announcement/all_announcement", datum, {
    data: datum,
  });
}



export async function add_announcement(datum) {
  return await AxiosConfig.post("/add/announcement",datum, {
    data: datum,
  });
}



export async function delete_announcement(datum) {
  return await AxiosConfig.post("/delete/announcement",datum, {
    data: datum,
  });
}


export async function get_comments(datum) {
  return await AxiosConfig.post("/announcement/all_comments",datum, {
    data: datum,
  });
}

export async function add_comments(datum) {
  return await AxiosConfig.post("/announcement/add_comment",datum, {
    data: datum,
  });
}

export async function add_sub_comments(datum) {
  return await AxiosConfig.post("/announcement/reply_to_comment",datum, {
    data: datum,
  });
}


export async function DeleteHostel(datum) {
  return await AxiosConfigV2.delete(`/v2/hostel/${datum.hostelId}`);
}