import React from 'react';
import TotalExpense from "../Assets/v2LandingImages/totalexpense.svg";
import Expenseinte from "../Assets/v2LandingImages/expense-inte.svg";
import RecurringBill from "../Assets/v2LandingImages/RecurringBill.svg";
import AssetImage from "../Assets/v2LandingImages/AssetImage.svg";
import Notify from "../Assets/v2LandingImages/notify.svg";




export default function OperationsSection() {

    const features = [
        {
            title: "Expense Intelligence",
            desc: "Track, categorize, and analyze every expense with structured financial visibility, improving cost control and profitability decisions.",
            image: Expenseinte,
            subImage: TotalExpense

        },
        {
            title: "Asset Control System",
            desc: "Digitally monitor hostel assets across rooms and floors to ensure accountability, prevent losses, and maintain organized infrastructure control.",
            image: AssetImage
        },
        {
            title: "Utility Billing Automation",
            desc: "Automatically calculate and split electricity charges accurately by room, floor, or tenant with transparent billing clarity.",
            image: RecurringBill
        },
        {
            title: "Smart Complaint Workflow",
            desc: "Streamline tenant issue resolution through structured complaint tracking, status monitoring, and accountability-driven resolution management.",
            image: Notify
        }
    ];

    return (
        <section className="w-full bg-[#F8F9FB] py-[40px] md:py-[53px] px-[20px] md:px-[101px] font-tasa">

            <div className=" mx-auto grid lg:grid-cols-2 gap-12 items-start">


                <div>
                    <span className="px-3 py-1 text-xs  rounded-full bg-[#E9EDFF] text-[#1E45E1] font-medium">
                        Operations
                    </span>

                    <h2 className="mt-6 text-3xl md:text-4xl font-semibold text-[#1F2937] leading-snug">
                        Financial & Operational
                        <br />
                        Control – <span className="text-blue-600">Simplified.</span>
                    </h2>
                </div>



                <div className="grid sm:grid-cols-2 gap-6">

                    {features.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-xl p-3 border border-gray-200 shadow-md hover:shadow-lg transition h-fit 
      ${index === 2 ? "sm:mt-[-100px]" : ""}`}
                        >

                            <h3 className="text-lg font-semibold text-[#1F2937]">
                                {item.title}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                {item.desc}
                            </p>


                            <div className="mt-4  bg-gray-100 rounded-lg  px-3 py-3 relative">
                                <img src={item.image} />
                                <div className='absolute top-[-15px] right-0'>
                                    <img src={item.subImage} />
                                </div>
                            </div>

                        </div>
                    ))}

                </div>

            </div>



            <div className="max-w-6xl mx-auto mt-16">

                <div className="bg-[#2A2A2A] rounded-md p-[24px] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

                    <div>
                        <h3 className="text-3xl font-semibold bg-gradient-to-r from-[#00D0FF] to-[#006AFF] bg-clip-text text-transparent">
                            Faster. Smarter, Better
                        </h3>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold text-white">40+</h3>
                        <p className="text-[#9B9B9B] text-sm font-normal">Hours Saves on Month</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold text-white">50%</h3>
                        <p className="text-[#9B9B9B] text-sm font-normal">Faster Implementation</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold text-white">100%</h3>
                        <p className="text-[#9B9B9B] text-sm font-normal">Trust between Tenants & Owners</p>
                    </div>

                </div>

            </div>

        </section>
    );
}