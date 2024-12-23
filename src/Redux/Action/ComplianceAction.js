import AxiosConfig from "../../WebService/AxiosConfig"


export async function compliance(compliance) {
  return await AxiosConfig.post('/compliance/compliance-list', compliance, {
    data: compliance
  })
}

export async function Compliancedetails(formDetails) {
  return await AxiosConfig.post('/compliance/add-details', formDetails, {
    data: formDetails
  })
}

export async function VendorList(vendor) {
  console.log("vendor",vendor)
  return await AxiosConfig.post('/get/vendor_list', vendor, {
    data: vendor
  })
}


export async function addVendor(params) {
  console.log("param", params)
 
  const formData = new FormData();
  if (params.profile) formData.append("profile", params.profile);
  if (params.hostel_id) formData.append("hostel_id", params.hostel_id);
  if (params.Last_Name) formData.append("Last_Name", params.Last_Name)
  if (params.first_Name) formData.append("first_Name", params.first_Name)
  if (params.Vendor_Email) formData.append("Vendor_Email", params.Vendor_Email)
  if (params.Vendor_Mobile) formData.append("Vendor_Mobile", params.Vendor_Mobile)
  if (params.Vendor_Address) formData.append("Vendor_Address", params.Vendor_Address)
    if (params.Business_Name) formData.append("Business_Name", params.Business_Name)
      if(params.Vendor_Id) formData.append("Vendor_Id" ,params.Vendor_Id)
        if(params.id) formData.append("id", params.id)
          if(params.Country) formData.append("Country", params.Country)
            if(params.Pincode) formData.append("Pincode", params.Pincode)

              
  try {
    const response = await AxiosConfig.post('/add/update_vendor', formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
      timeout: 100000000,
      onUploadProgress: (event) => {
        console.log("event", event)
      }
    });
    console.log("response for Api", response);
    return response.data;
  } catch (error) {
    console.error("Axios Error", error);
  }
}



  export async function DeleteVendorList(vendor) {
    return await AxiosConfig.post('/delete-vendor-list', vendor, {
      data: vendor
    })
  }
  
  // /compliance/change_details
  export async function ComplianceChange(compliance) {
    console.log("compliancessssssss",compliance)
    return await AxiosConfig.post('/compliance/change_details', compliance, {
      data: compliance
    })
  }