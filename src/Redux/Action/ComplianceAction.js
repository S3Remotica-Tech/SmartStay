import AxiosConfig from "../../WebService/AxiosConfig"
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";


// export async function compliance(compliance) {
//   return await AxiosConfig.post('/compliance/compliance-list', compliance, {
//     data: compliance
//   })
// }
// v2
export async function complianceList(hostelId) {
  return await AxiosConfigV2.get(`/v2/complaint/all-complaints/${hostelId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}


// v1
// export async function Compliancedetails(formDetails) {
//   return await AxiosConfig.post('/compliance/add-details', formDetails, {
//     data: formDetails
//   })
// }

export async function Compliancedetails(formDetails) {
  return await AxiosConfigV2.post('/v2/complaint', formDetails, {
    data: formDetails
  })
}

// v1


// export async function VendorList(vendor) {
//   return await AxiosConfig.post('/get/vendor_list', vendor, {
//     data: vendor
//   })
// }


// v2

export async function VendorList(vendor) {
  return await AxiosConfigV2.get(`/v2/vendors/all-vendors/${vendor.hostelId}`)
}


// v1

// export async function addVendor(params) {

//   const formData = new FormData();

//   if (params.profile) formData.append("profile", params.profile);
//   if (params.hostel_id) formData.append("hostel_id", params.hostel_id);
//   if (params.Last_Name) formData.append("Last_Name", params.Last_Name)
//   if (params.first_Name) formData.append("first_Name", params.first_Name)
//   if (params.Vendor_Email) formData.append("Vendor_Email", params.Vendor_Email)
//   if (params.Vendor_Mobile) formData.append("Vendor_Mobile", params.Vendor_Mobile)
//   if (params.Vendor_Address) formData.append("Vendor_Address", params.Vendor_Address)
//   if (params.area) formData.append("area", params.area)
//   if (params.landmark) formData.append("landmark", params.landmark)
//   if (params.city) formData.append("city", params.city)
//   if (params.pin_code) formData.append("pin_code", params.pin_code)
//   if (params.state) formData.append("state", params.state)
//     if (params.Business_Name) formData.append("Business_Name", params.Business_Name)
//       if(params.Vendor_Id) formData.append("Vendor_Id" ,params.Vendor_Id)
//         if(params.id) formData.append("id", params.id)
//           if(params.Country) formData.append("Country", params.Country)
//             if(params.Pincode) formData.append("Pincode", params.Pincode)


//   try {
//     const response = await AxiosConfigV2.post('/v2/vendors', formData, {
//       headers: {
//         "Content-type": "multipart/form-data",
//       },
//       timeout: 100000000,
//       onUploadProgress: (event) => {
//         console.log("event", event)
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Axios Error", error);
//   }
// }

// v2

export async function addVendor(params) {

  console.log("params",params)
  const formData = new FormData();


  if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }

  console.log(" params.profilePic", params.profilePic)

  if (params.payLoads) {
    const payloadBlob = new Blob(
      [JSON.stringify(params.payLoads)],
      { type: "application/json" }
    );
    formData.append("payLoads", payloadBlob);
  }

  try {
    const response = await AxiosConfigV2.post("/v2/vendors", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 100000000,
    });
    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}


//  v2

export async function updateVendor(params) {
  const formData = new FormData();

   if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }


  if (params.updateVendor) {
    const payloadBlob = new Blob(
      [JSON.stringify(params.updateVendor)],
      { type: "application/json" }
    );
    formData.append("updateVendor", payloadBlob);
  }

  try {
    const response = await AxiosConfigV2.put(
      `/v2/vendors/${params?.updateVendor?.vendorId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 100000000,
      }
    );
    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}




// v1

// export async function DeleteVendorList(vendor) {
//   return await AxiosConfig.post('/delete-vendor-list', vendor, {
//     data: vendor
//   })
// }

// v2
export async function DeleteVendorList(vendor) {
  return await AxiosConfigV2.delete(`/v2/vendors/${vendor.vendorId}`)
}

export async function ComplianceChange(compliance) {
  return await AxiosConfig.post('/compliance/change_details', compliance, {
    data: compliance
  })
}

export async function ComplianceChangeStatus(compliance) {
  return await AxiosConfig.post('/compliance/change_details', compliance, {
    data: compliance
  })
}




export async function complianceDelete(datum) {
  return await AxiosConfig.post('/complaint/delete_compliant', datum, {
    data: datum
  })
}


// 
export async function getComplianceComment(datum) {
  return await AxiosConfig.post('/complaints/all_complaint_comments', datum, {
    data: datum
  })
}
export async function addComplianceComment(datum) {
  return await AxiosConfig.post('/complaints/add_complaint_comment', datum, {
    data: datum
  })
}