// import AxiosConfig from "../../WebService/AxiosConfig"
import AxiosConfigV2 from "../../WebService/AxiosConfigV2";

// export async function compliance(compliance) {
//   return await AxiosConfig.post('/compliance/compliance-list', compliance, {
//     data: compliance
//   })
// }

// v2
export async function complianceList(compliance) {
  return await AxiosConfigV2.get(
    `/v2/complaint/all-complaints/${compliance.hostelId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        customerName: compliance.customerName,
        status: compliance.status,
        startDate: compliance.startDate,
        endDate: compliance.endDate,
      },
    },
  );
}

// v1
// export async function Compliancedetails(formDetails) {
//   return await AxiosConfig.post('/compliance/add-details', formDetails, {
//     data: formDetails
//   })
// }
// v2
export async function Compliancedetails(formDetails) {
  return await AxiosConfigV2.post("/v2/complaint", formDetails, {
    data: formDetails,
  });
}

// v2
export async function EditComplaint(complaint) {
  return await AxiosConfigV2.put(`/v2/complaint/${complaint.complaintId}`, {
    complaintDate: complaint.complaintDate,
    description: complaint.description,
  });
}

export async function ParticularcomplianceDetails(complaintId) {
  return await AxiosConfigV2.get(`/v2/complaint/${complaintId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function addComplianceComment(complaintId, datum) {
  return await AxiosConfigV2.post(
    `/v2/complaint/add-comment/${complaintId}`,
    datum,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export async function complaintsView(complaintsId) {
  return await AxiosConfigV2.get(`/v2/complaint/${complaintsId}`);
}

export async function complaintsViewUpdates(complaint) {
  // console.log("complaintsViewUpdates",complaint)
  return await AxiosConfigV2.get(
    `/v2/complaint/updates/${complaint.hostelId}/${complaint.complaintsId}`,
  );
}

export async function vendorSettlementInitialize(vendor) {
  console.log("vendor", vendor);
  return await AxiosConfigV2.get(
    `/v2/vendors/initialize/${vendor.hostelId}/${vendor.vendorId}`,
  );
}

export async function getCommentVendor(vendor) {
  const params = {};

  if (vendor.page) params.page = vendor.page;
  if (vendor.size) params.size = vendor.size;

  return await AxiosConfigV2.get(`/v2/vendors/comments/${vendor.vendorId}`, {
    params,
  });
}

export async function addCommentVendor(payload) {
  return await AxiosConfigV2.post("/v2/vendors/comments", payload);
}

export async function VendorList(vendor) {
  const params = {};

  if (vendor.name) params.name = vendor.name;
  if (vendor.categoryId) params.categoryId = vendor.categoryId;
  if (vendor.paymentStatus) params.paymentStatus = vendor.paymentStatus;
  if (vendor.page) params.page = vendor.page;
  if (vendor.size) params.size = vendor.size;

  return await AxiosConfigV2.get(`/v2/vendors/all-vendors/${vendor.hostelId}`, {
    params,
  });
}

export async function VendorOverViewExpenseList(vendor) {
  const params = {};

  if (vendor.page) params.page = vendor.page;
  if (vendor.size) params.size = vendor.size;

  return await AxiosConfigV2.get(`v2/vendors/expenses/${vendor.vendorId}`, {
    params,
  });
}

export async function VendorOverViewExpensePaymentList(vendor) {
  const params = {};

  if (vendor.page) params.page = vendor.page;
  if (vendor.size) params.size = vendor.size;

  return await AxiosConfigV2.get(
    `v2/vendors/expense-payments/${vendor.vendorId}`,
    {
      params,
    },
  );
}

export async function addVendor(params) {
  const formData = new FormData();

  if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }

  if (params.payLoads) {
    const payloadBlob = new Blob([JSON.stringify(params.payLoads)], {
      type: "application/json",
    });
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

export async function updateVendor(params) {
  const formData = new FormData();

  if (params.profilePic) {
    formData.append("profilePic", params.profilePic);
  }

  if (params.updateVendor) {
    const payloadBlob = new Blob([JSON.stringify(params.updateVendor)], {
      type: "application/json",
    });
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
      },
    );
    return response;
  } catch (error) {
    console.error("Axios Error", error);
    throw error;
  }
}

// vendor overview

export async function particularVendorOverview({ vendorId, period }) {
  return await AxiosConfigV2.get(`/v2/vendors/${vendorId}`, {
    params: {
      period,
    },
  });
}

//  customization PUT Api

export async function vendorCustomizeData(vendor) {
  return await AxiosConfigV2.put(
    `/v2/table-config/vendors/${vendor.hostelId}`,
    vendor.customize,
  );
}

export async function DeleteVendorList(vendor) {
  return await AxiosConfigV2.delete(`/v2/vendors/${vendor.vendorId}`);
}

export async function ComplianceAssign({ complaintId, userId }) {
  return await AxiosConfigV2.put(`/v2/complaint/assign-user/${complaintId}`, {
    userId,
  });
}

export async function DeleteVendorComments(vendor) {
  console.log("vendor88888888", vendor);
  return await AxiosConfigV2.delete(`/v2/vendors/comments/${vendor.commentId}`);
}

export async function UpdateVendorComments(comment) {
  return await AxiosConfigV2.put(
    `/v2/vendors/comments/${comment.commentId}`,
    comment,
    {
      data: comment,
    },
  );
}

// v1
// export async function ComplianceChangeStatus(compliance) {
//   return await AxiosConfig.post('/compliance/change_details', compliance, {
//     data: compliance
//   })
// }

// v2

export async function ComplianceChangeStatus({ complaintId, status }) {
  return await AxiosConfigV2.put(`/v2/complaint/update-status/${complaintId}`, {
    status,
  });
}

// v1
// export async function complianceDelete(datum) {
//   return await AxiosConfig.post('/complaint/delete_compliant', datum, {
//     data: datum
//   })
// }

// v2
export async function complianceDelete(complaintId) {
  return await AxiosConfigV2.delete(
    `/v2/complaint/delete-complaint/${complaintId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

//
export function getComplianceComment() {
  new Promise((resolve) => {
    resolve({ status: 200 });
  });
}
