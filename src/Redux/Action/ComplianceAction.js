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
  return await AxiosConfig.post('/get/vendor_list', vendor, {
    data: vendor
  })
}


export async function addVendor(params) {
 
  const formData = new FormData();
  if (params.profile) formData.append("profile", params.profile);
  if (params.hostel_id) formData.append("hostel_id", params.hostel_id);
  if (params.Last_Name) formData.append("Last_Name", params.Last_Name)
  if (params.first_Name) formData.append("first_Name", params.first_Name)
  if (params.Vendor_Email) formData.append("Vendor_Email", params.Vendor_Email)
  if (params.Vendor_Mobile) formData.append("Vendor_Mobile", params.Vendor_Mobile)
  if (params.Vendor_Address) formData.append("Vendor_Address", params.Vendor_Address)
  // if (params.address) formData.append("address", params.address);
  if (params.area) formData.append("area", params.area)
  if (params.landmark) formData.append("landmark", params.landmark)
  if (params.city) formData.append("city", params.city)
  if (params.pin_code) formData.append("pin_code", params.pin_code)
  if (params.state) formData.append("state", params.state)
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