import React from 'react';
// import TotalExpense from "../Assets/v2LandingImages/expense1.svg";
import Expenseinte from "../Assets/v2LandingImages/ExpenseIntelligence.svg";
import RecurringBill from "../Assets/v2LandingImages/Billing3.svg";
import AssetImage from "../Assets/v2LandingImages/Asset2.svg";
import Notify from "../Assets/v2LandingImages/Compliant4.svg";
import Reports5 from "../Assets/v2LandingImages/Reports5.svg";
import Custom6 from "../Assets/v2LandingImages/Custom6.svg";
import Integrations7 from "../Assets/v2LandingImages/Integrations7.svg";





export default function OperationsSection() {

    const features = [
        {
            image: Expenseinte,
                    },
        {

            image: AssetImage
        },
        {

            image: RecurringBill
        },
        {

            image: Notify
        },
        {

            image: Reports5
        },
        {
            image: Custom6
        },
        {

            image: Integrations7
        },

    ];

    const marginMap = {
  2: "sm:mt-[-80px]",
  4: "sm:mt-[-100px]",
  6: "sm:mt-[-150px]",
};

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



                <div className="grid sm:grid-cols-2  gap-6 max-h-screen overflow-y-auto">

                    {features.map((item, index) => (
                        <div
                            key={index}
                           className={`h-fit ${marginMap[index] || ""}`}
                        >


                            <img src={item.image} />



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