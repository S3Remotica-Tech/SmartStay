import AxiosConfig from "../../WebService/AxiosConfig";

// export async function createPgList(datum){
//     return await AxiosConfig.post('/add/new-hostel',datum,{
//       data:datum
//     })
//   }

export async function createPgList(params) {

  const formData = new FormData();
  if (params.profile) formData.append("profile", params.profile);
  if (params.name) formData.append("name", params.name);
  if (params.phoneNo) formData.append("phoneNo", params.phoneNo);
  if (params.email_Id) formData.append("email_Id", params.email_Id);
  if (params.location) formData.append("location", params.location);
  if (params.id) formData.append("id", params.id);
  if (params.image1) formData.append("image1", params.image1);
  if (params.image2) formData.append("image2", params.image2);
  if (params.image3) formData.append("image3", params.image3);
  if (params.image4) formData.append("image4", params.image4);

  try {
    const response = await AxiosConfig.post("/add/new-hostel", formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      timeout: 100000000,
      onUploadProgress: (event) => {
        console.log("event", event);
      },
    });
    return response.data;
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

export async function createRoom(datum) {
  return await AxiosConfig.post("/room/create-room", datum, {
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

export async function createBed(datum) {
  return await AxiosConfig.post("/create-bed", datum, {
    data: datum,
  });
}

export async function DeleteBed(datum) {
  return await AxiosConfig.post("/delete/delete-bed", datum, {
    data: datum,
  });
}

export async function DeletePG(datum) {
  return await AxiosConfig.post("/delete/delete-hostel", datum, {
    data: datum,
  });
}

export async function UpdateFloor(datum) {
  return await AxiosConfig.post("/update_floor", datum, {
    data: datum,
  });
}

export async function OccupiedCustomer(datum) {
  return await AxiosConfig.post("/get_beduser_details", datum, {
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