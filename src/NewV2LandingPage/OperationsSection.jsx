import { useEffect, useState } from "react";

// import TotalExpense from "../Assets/v2LandingImages/expense1.svg";
import Expenseinte from "../Assets/v2LandingImages/ExpenseIntelligence.svg";
import RecurringBill from "../Assets/v2LandingImages/Billing3.svg";
import AssetImage from "../Assets/v2LandingImages/Asset2.svg";
import Notify from "../Assets/v2LandingImages/Compliant4.svg";
import Reports5 from "../Assets/v2LandingImages/Reports5.svg";
import Custom6 from "../Assets/v2LandingImages/Custom6.svg";
import Integrations7 from "../Assets/v2LandingImages/Integrations7.svg";



const Counter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = end / (duration / 20);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 20);

        return () => clearInterval(timer);
    }, [end, duration]);

    return (
        <span>
            {count}
            {suffix}
        </span>
    );
};



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

            {/* <div className=" mx-auto grid lg:grid-cols-2 gap-12 items-start"> */}

            <div className="mx-auto grid lg:grid-cols-2 gap-12 items-start max-h-[600px] overflow-y-auto">
              
                <div className="sticky top-0 min-h-screen flex flex-col justify-center items-center px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-40 -translate-y-52">

                    <span className="px-3 py-1 text-xs 2xl:text-lg rounded-full bg-[#E9EDFF] text-[#1E45E1] font-medium mb-10">
                        Operations
                    </span>

                    <h2 className="mt-6 text-3xl md:text-4xl 2xl:text-5xl font-semibold text-[#1F2937] leading-snug text-center">
                        Financial & Operational
                        <br />
                        Control – <span className="text-blue-600">Simplified.</span>
                    </h2>

                </div>



                {/* <div className="grid sm:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2"> */}
                <div className="grid sm:grid-cols-2 gap-6 pr-2">

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



            <div className="max-w-6xl 2xl:max-w-7xl mx-auto mt-16">

                <div className="bg-[#2A2A2A] rounded-md p-14 md:p-[44px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left items-center">


                    <div className="sm:col-span-2 md:col-span-1">
                        <h3 className="text-3xl 2xl:text-4xl font-semibold bg-gradient-to-r from-[#00D0FF] to-[#006AFF] bg-clip-text text-transparent">
                            Faster. Smarter, Better
                        </h3>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold text-white"><Counter end={40} suffix="+" /></h3>
                        <p className="text-[#9B9B9B] text-sm 2xl:text-base font-normal">Hours Saves on Month</p>
                    </div>

                    <div>
                        <h3 className="text-3xl font-bold text-white"> <Counter end={50} suffix="%" /></h3>
                        <p className="text-[#9B9B9B] text-sm  2xl:text-base font-normal">Faster Implementation</p>
                    </div>

                    <div>
                        <h3 className="text-3xl  font-bold text-white"> <Counter end={100} suffix="%" /></h3>
                        <p className="text-[#9B9B9B] text-sm  2xl:text-base font-normal">Trust between Tenants & Owners</p>
                    </div>

                </div>

            </div>

        </section>
    );
}