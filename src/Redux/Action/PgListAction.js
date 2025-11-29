// import AxiosConfig from "../../WebService/AxiosConfig";
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
    }

       if (params.additionalImages && params.additionalImages.length > 0) {
      params.additionalImages.forEach((img) => {
        if (img) {
          formData.append("additionalImages", img);
        }
      });
    }

    const response = await AxiosConfigV2.post("/v2/hostel", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 100000000,
     
    });

    return response;
  } catch (error) {
     console.error("Axios Error", error);
    throw error;
   
  }
}

export async function updatePgList(params) {

console.log("params",params)
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
    }

       if (params.additionalImages && params.additionalImages.length > 0) {
      params.additionalImages.forEach((img) => {
        if (img) {
                  
      const sizeInMB = (img.size / (1024 * 1024)).toFixed(2);

      console.log('Additional Image', img);
      // console.log(`Size (bytes): ${sizeInBytes}`);
      console.log(`Size (MB): ${sizeInMB} MB`);
          formData.append("additionalImages", img);
        }
      });
    }

    const response = await AxiosConfigV2.put(`/v2/hostel/${params.hostelId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 100000000,
     
    });

    return response;
  } catch (error) {
     console.error("Axios Error", error);
    throw error;
   
  }
}

// export async function createPgList(params) {
//   try {
   
//     throw { response: { status: 500,  message: "Internal Server Error "  } };

   
//   } catch (error) {
//     console.error("Axios Error", error);
//     return error;
//   }
// }


// export async function updatePgList(params) {
//   console.log("params", params);

//   try {
//     const formData = new FormData();

//         if (params.payloads) {
//       const payloadsBlob = new Blob(
//         [JSON.stringify(params.payloads)],
//         { type: "application/json" }
//       );
//       formData.append("payloads", payloadsBlob);
//     }

 
//     const MAX_SIZE = 500 * 1024 * 1024;

//      if (params.mainImage instanceof File) {
//       if (params.mainImage.size > MAX_SIZE) {
//         throw new Error("Main image exceeds 500MB limit");
//       }
//       formData.append("mainImage", params.mainImage);
//     }

    
//     if (Array.isArray(params.additionalImages)) {
//       params.additionalImages.forEach((img) => {
//         if (img instanceof File) {

//           if (img.size > MAX_SIZE) {
//             console.log("img.size > MAX_SIZE",img.size > MAX_SIZE)
//             throw new Error(`One of the additional images exceeds 500MB limit`);
//           }

//           formData.append("additionalImages", img);
//         }
//       });
//     }


//     const response = await AxiosConfigV2.put(
//       `/v2/hostel/${params.hostelId}`,
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//         timeout: 1000000,
//       }
//     );

//     return response;

//   } catch (error) {
//     console.error("Axios Error:", error.message);
//     throw error;
//   }
// }







export  function Checkeblist() {
  // return await AxiosConfig.post("/EB/Hostel_Room_based", datum, {
  //   data: datum,
  // });
  new Promise((resolve) => {
  resolve({status: 200});
})
}

export function CreateEbbill() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/add_room_reading", datum, {
  //   data: datum,
  // });
}

export function EB_Customerlist() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.get("/list/eb_list", {});
}

export function EB_startmeterlist() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/list/Ebstartmeter",datum, {
  //   data:datum,
  // });
}
export function EB_CustomerListTable() {
  new Promise((resolve) => {
  resolve({status: 200});
})
//   return await AxiosConfig.post("/customer_readings",datum, {
// data:datum,
//   });
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






export  function CheckRoomId() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.get("/room-id/check-room-id", {});

}

export function CheckBedDetails() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/bed/bed-details", datum, {
  //   data: datum,
  // });
}

export async function dashboardReports(hostelId) {
 
  return await AxiosConfigV2.get(`/v2/dashboard/${hostelId}`, );
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

export  function DeletePG() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/delete/delete-hostel", datum, {
  //   data: datum,
  // });
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

export function deleteHostelImages() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/delete_hostel_image", datum, {
  //   data: datum,
  // });
}
export  function editElectricity() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/edit_room_reading", datum, {
  //   data: datum,
  // });
}
export  function deleteElectricity() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/delete_room_reading", datum, {
  //   data: datum,
  // });
}

export function dashboardFilter() {
 
  return new Promise((resolve) => {
    resolve({ status: 200 });
  });
}


// Hostel_based

export  function ebHostelBasedRead() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/get_hostel_reading", datum, {
  //   data: datum,
  // });
}

export  function ebAddHostelReading() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/add_hostel_reading", datum, {
  //   data: datum,
  // });
}


export  function ebAddHostelEdit() {
  new Promise((resolve) => {
  resolve({status: 200});
})
}
export  function ebAddHostelDelete() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/delete_hostel_reading", datum, {
  //   data: datum,
  // });
}

export function announcement_list() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/announcement/all_announcement", datum, {
  //   data: datum,
  // });
}



export function add_announcement() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/add/announcement",datum, {
  //   data: datum,
  // });
}



export function delete_announcement() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/delete/announcement",datum, {
  //   data: datum,
  // });
}


export  function get_comments() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/announcement/all_comments",datum, {
  //   data: datum,
  // });
}

export  function add_comments() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/announcement/add_comment",datum, {
  //   data: datum,
  // });
}

export  function add_sub_comments() {
  new Promise((resolve) => {
  resolve({status: 200});
})
  // return await AxiosConfig.post("/announcement/reply_to_comment",datum, {
  //   data: datum,
  // });
}


export async function DeleteHostel(datum) {
  return await AxiosConfigV2.delete(`/v2/hostel/${datum.hostelId}`);
}