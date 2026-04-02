import React from "react";
import Profiles from "../../Assets/Images/New_images/profile-picture.png";


const TenantProfileReport = () => {

  return (

        <div className="w-full bg-gray-100 flex justify-center h-screen overflow-hidden px-2 py-4">
          <div className="w-full max-w-3xl bg-white shadow-md rounded-lg flex flex-col h-full overflow-hidden">
        <div className="flex flex-col h-full p-3 overflow-hidden">
          <div className="text-center mb- font-inter">
            <h1 className="text-[16px] font-semibold tracking-[0.78px]">TENANT PROFILE REPORT</h1>
            <p className="font-inter font-normal text-xs leading-[12.41px] tracking-[0px] text-center">For Agreement & Verification Purposes</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">


            <div className="flex flex-col items-center">
              <img
                src={Profiles}
                alt="Passport"
                className="w-28 h-28 object-cover rounded-lg border"
              />
              <span className="mt-2 font-inter font-normal text-[11px] leading-[9.02px] tracking-[0px] text-center align-middle">
                Passport Photo
              </span>
            </div>

            <div className="flex-1 text-sm font-inter">

              <div className="flex items-center py-1 whitespace-nowrap">
                <span className="font-semibold w-[180px]">Full Name</span>
                <span className="mx-2">:</span>
                <span className="flex-1">SARATH KUMAR C</span>
              </div>

              <hr className="w-full my-1" />

              <div className="flex items-center py-1 whitespace-nowrap">
                <span className="font-semibold w-[180px]">Mobile Number</span>
                <span className="mx-2">:</span>
                <span className="flex-1">+91 98765 43210</span>
              </div>

              <hr className="w-full my-1" />

              <div className="flex items-center py-1 whitespace-nowrap">
                <span className="font-semibold w-[180px]">Email Address</span>
                <span className="mx-2">:</span>
                <span className="flex-1 overflow-hidden text-ellipsis">
                  sarathkumar007@gmail.com
                </span>
              </div>

            </div>
          </div>

         <div className="flex-1 overflow-y-auto min-h-0 show-scroll">
            <div className="mb-3">
              <p
                className="flex items-center h-10 pl-3 border-l-[3px] border-gray-400 bg-gray-200 text-black font-semibold font-inter text-[15px] pt-1 mb-2" >
                ACCOMMODATION DETAILS </p>

              <div className="flex flex-col text-sm font-inter text-sm">
                <div className="grid grid-cols-2 gap-8 py-1 whitespace-nowrap">
                  <div className="flex items-center min-w-0">
                    <span className="font-semibold w-[95px]">Property Name </span>
                    <span className="mx-2">:</span>
                    <span className="flex-1 min-w-0 ">
                      SRK HOMES (Hostel) - Thoraipakkam
                    </span>
                  </div>

                  <div className="flex items-center min-w-0">
                    <span className="font-semibold w-[160px]">Room Number </span>
                    <span className="mx-2">:</span>
                    <span className="flex-1 min-w-0 ">
                      G005 - B03(Ground Floor)
                    </span>
                  </div>

                </div>

                <hr className="w-full my-1" />

                <div className="grid grid-cols-2 gap-8 py-1 whitespace-nowrap">

                  <div className="flex items-center min-w-0">
                    <span className="font-semibold w-[95px]">Joining Date</span>
                    <span className="mx-2">:</span>
                    <span className="flex-1 min-w-0">
                      29 June 2025
                    </span>
                  </div>

                  <div className="flex items-center min-w-0">
                    <span className="font-semibold w-[160px]">Monthly Rent & Advance</span>
                    <span className="mx-2">:</span>
                    <span className="flex-1 min-w-0 ">
                      ₹7,000 / pm , ₹15,000
                    </span>
                  </div>

                </div>

                <hr className="w-full my-1" />

                <div className="grid grid-cols-2 gap-8 py-1 whitespace-nowrap">

                  <div className="flex items-center min-w-0">
                    <span className="font-semibold w-[95px]">Tenant Status</span>
                    <span className="mx-2">:</span>
                    <span className="flex-1 min-w-0 overflow-hidden text-ellipsis">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center min-w-0">
                    <span className="font-semibold w-[160px]">Assigned by</span>
                    <span className="mx-1">:</span>
                    <span className="flex-1 min-w-0 overflow-hidden text-ellipsis">
                      Rajesh R
                    </span>
                  </div>

                </div>

              </div>
            </div>


            <div className="mb-3">

              <p className="flex items-center h-10 pl-3 border-l-[3px] border-gray-400 bg-gray-200 text-black font-semibold font-inter text-[15px] mb-2">
                PERMANENT ADDRESS
              </p>

              <div className="flex flex-col text-sm font-inter">
                <div className="grid grid-cols-2 gap-8 py-1 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-semibold w-[140px]">House/Apartment</span>
                    <span className="mx-2">:</span>
                    <span>24, Prestige Heights</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-semibold w-[140px]">Street/Area</span>
                    <span className="mx-2">:</span>
                    <span>Gandhi Street</span>
                  </div>
                </div>
                <hr className="w-full my-1" />

                <div className="grid grid-cols-2 gap-8 py-1 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-semibold w-[140px]">Landmark</span>
                    <span className="mx-2">:</span>
                    <span>Near Apollo Medical</span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-semibold w-[140px]">City & State</span>
                    <span className="mx-2">:</span>
                    <span>Iron city, Salem, Tamil Nadu</span>
                  </div>
                </div>
                <hr className="w-full my-1" />

                <div className="grid grid-cols-2 gap-8 py-1 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-semibold w-[140px]">Pincode</span>
                    <span className="mx-2">:</span>
                    <span>600265</span>
                  </div>

                  <div></div>
                </div>

              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ">
              <div>
                <p className="flex items-center h-10 pl-3 border-l-[3px] border-gray-400 bg-gray-200 text-black font-semibold font-inter text-[15px] mb-2">GUARDIAN DETAILS</p>

                <div className="grid grid-cols-1 gap-1">

                  <div className="flex items-center text-sm font-inter py-[2px]">
                    <span className="font-semibold w-36">Name</span>
                    <span className="mx-2 text-black">:</span>
                    <span className="text-gray-600">Sriramesh R</span>
                  </div>
                  <hr className="w-full my-[2px]" />

                  <div className="flex items-center text-sm font-inter py-[2px]">
                    <span className="font-semibold w-36">Relationship</span>
                    <span className="mx-2 text-black">:</span>
                    <span className="text-gray-600">Father</span>
                  </div>
                  <hr className="w-full my-[2px]" />

                  <div className="flex items-center text-sm font-inter py-[2px]">
                    <span className="font-semibold w-36">Occupation</span>
                    <span className="mx-2 text-black">:</span>
                    <span className="text-gray-600">Private Employee</span>
                  </div>
                  <hr className="w-full my-[2px]" />

                  <div className="flex items-center text-sm font-inter py-[2px]">
                    <span className="font-semibold w-36">Contact</span>
                    <span className="mx-2 text-black">:</span>
                    <span className="text-gray-600">+91 98765 43210</span>
                  </div>
                  <hr className="w-full my-[2px]" />

                </div>
              </div>

              <div>
                <p className="flex items-center h-10 pl-3 border-l-[3px] border-gray-400 bg-gray-200 text-black font-semibold font-inter text-[15px] mb-2">EMPLOYMENT DETAILS</p>

                <div className="grid grid-cols-1 gap-1">

                  <div className="flex items-center text-sm font-inter py-[2px]">
                    <span className="font-semibold w-36">Company</span>
                    <span className="mx-2 text-black">:</span>
                    <span className="text-gray-600">HCL Global</span>
                  </div>
                  <hr className="w-full my-[2px]" />

                  <div className="flex items-center text-sm font-inter py-[2px]">
                    <span className="font-semibold w-36">Designation</span>
                    <span className="mx-2 text-black">:</span>
                    <span className="text-gray-600">Software Engineer</span>
                  </div>
                  <hr className="w-full my-[2px]" />

                  <div className="flex items-center text-sm font-inter py-[2px]">
                    <span className="font-semibold w-36">Shift Type</span>
                    <span className="mx-2 text-black">:</span>
                    <span className="text-gray-600">Night Shift</span>
                  </div>
                  <hr className="w-full my-[2px]" />

                  <div className="flex items-center text-sm font-inter py-[2px]">
                    <span className="font-semibold w-36">Work Location</span>
                    <span className="mx-2 text-black">:</span>
                    <span className="text-gray-600">Chennai</span>
                  </div>
                  <hr className="w-full my-[2px]" />

                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ">
              <div>
                <p className="flex items-center h-10 pl-3 border-l-[3px] border-gray-400 bg-gray-200 text-black font-semibold font-inter text-[15px] mb-2">VEHICLE INFORMATION</p>

                <div className="grid grid-cols-1 gap-1">

                  <div className="flex items-center text-sm font-inter py-[2px]">
                    <span className="font-semibold w-36">Vehicle Type</span>
                    <span className="mx-2 text-black">:</span>
                    <span className="text-gray-600">2-Wheeler</span>
                  </div>
                  <hr className="w-full my-[2px]" />

                  <div className="flex items-center text-sm font-inter py-[2px]">
                    <span className="font-semibold w-36">Vehicle Number</span>
                    <span className="mx-2 text-black">:</span>
                    <span className="text-gray-600">TN 07 AJ 4687</span>
                  </div>
                  <hr className="w-full my-[2px]" />



                </div>
              </div>

              <div>
                <p className="flex items-center h-10 pl-3 border-l-[3px] border-gray-400 bg-gray-200 text-black font-semibold font-inter text-[15px] mb-2">ID PROOF DETAILS</p>

                <div className="grid grid-cols-1 gap-1">

                  <div className="flex items-center text-sm font-inter py-[2px]">
                    <span className="font-semibold w-36">Aadhar Card</span>
                    <span className="mx-2 text-black">:</span>
                    <span className="text-gray-600">Verified</span>
                  </div>
                  <hr className="w-full my-[2px]" />

                  <div className="flex items-center text-sm font-inter py-[2px]">
                    <span className="font-semibold w-36">PAN Card</span>
                    <span className="mx-2 text-black">:</span>
                    <span className="text-gray-600">&ndash;</span>
                  </div>
                  <hr className="w-full my-[2px]" />

                </div>
              </div>
            </div>

            <div className="mt-6 text-sm">
              <p className="flex items-center h-10 pl-3 border-l-[3px] border-gray-400 bg-gray-200 text-black font-semibold font-inter text-[15px] mb-2">DECLARATION</p>
              <p className="mb-6 font-inter font-normal text-[11px] leading-[12.22px] tracking-[0px] text-justify">
                I hereby declare that the information provided above is true and correct to the best of my
                knowledge. I understand that any false information may result in termination of the
                rental agreement. I agree to abide by all rules and regulations set forth by the property
                management.
              </p>


              <div className="flex justify-between mb-4 text-sm">

                <div className="flex flex-col">
                  <span className="font-semibold text-black">Tenant Signature</span>
                  <span className="mt-1 text-gray-700 text-sm">Date:</span>
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold text-black">Property Manager Signature</span>
                  <span className="mt-1 text-gray-700 text-sm">Date:</span>
                </div>

              </div>

              <div className="border-t border-gray-300 pt-3 font-inter mb-0">

                <div className="flex justify-between items-start">
                  <div className="flex flex-col leading-[1px]">
                    <p className="text-[11px] text-gray-600">This is a system-generated document from</p>
                    <p className="text-[12px] text-gray-800">SmartStay PG/Hostel Management System</p>
                  </div>

                  <div className="flex flex-col items-end leading-[1px]">
                    <p className="text-[11px] text-gray-600">Generated on: <span className="text-[12px] text-black">March 18, 2026 at 11:54 AM</span></p>
                    <p className="text-[12px] text-gray-800">Document ID: TEN-2026-0318-001</p>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantProfileReport;