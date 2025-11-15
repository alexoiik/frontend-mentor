// Importing React.
import { useEffect } from "react";
// Importing Images.
import arcadeIcon from "../assets/images/icon-arcade.svg";
import advancedIcon from "../assets/images/icon-advanced.svg";
import proIcon from "../assets/images/icon-pro.svg";

const Plan = ({ setStep, selectedPlan, setSelectedPlan, setSelectedPlanPrice, billing, setBilling }) => {

    // Plans (Arcade, Advanced & Pro)
    const plans = [
        { name: "Arcade", price: 9, icon: arcadeIcon },
        { name: "Advanced", price: 12, icon: advancedIcon },
        { name: "Pro", price: 15, icon: proIcon },
    ];

    // Handling Next and Prev Buttons.
    const handleNext = () => {
        // Go to step 3.
        setStep(3);
    };
    const handlePrev = () => {
        // Go to step 1.
        setStep(1);
    };

    useEffect(() => {
        const planObj = plans.find(p => p.name === selectedPlan);
        if (!planObj) return;

        setSelectedPlanPrice({
            monthly: planObj.price,
            yearly: planObj.price * 10
        });
        // eslint-disable-next-line
    }, [selectedPlan, billing]);

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold">Select your plan</h1>
                <span className="text-gray-400 text-sm font-thin">
                    You have the option of monthly or yearly billing.
                </span>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        onClick={() => {
                            setSelectedPlan(plan.name)
                            setSelectedPlanPrice({
                                monthly: plan.price,
                                yearly: plan.price * 10
                            });

                        }}
                        className={`
                            border rounded-lg p-4 cursor-pointer transition 
                            hover:border-blue-500
                            ${selectedPlan === plan.name
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300"
                            }
                        `}
                    >
                        <img src={plan.icon} alt={plan.name} className="w-10 h-10 mb-6" />

                        <h3 className="font-bold">{plan.name}</h3>

                        <p className="text-sm text-gray-400">
                            {billing === "monthly"
                                ? `$${plan.price}/mo`
                                : `$${plan.price * 10}/yr`}
                        </p>

                        {billing === "yearly" && (
                            <p className="text-xs text-blue-950 font-medium">2 months free</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Monthly / Yearly Toggle */}
            <div className="flex items-center justify-center gap-4 mt-8 bg-gray-100 p-3 rounded-md">
                <span className={`font-medium ${billing === "monthly" ? "text-blue-950" : "text-gray-500"}`}>
                    Monthly
                </span>
                <button
                    className="relative w-12 h-6 bg-blue-950 rounded-full"
                    onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
                >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${billing === "monthly" ? "left-1" : "left-7"}`} />
                </button>
                <span className={`font-medium ${billing === "yearly" ? "text-blue-950" : "text-gray-500"}`}>
                    Yearly
                </span>
            </div>

            {/* Next Step & Go Back Buttons */}
            <div className="flex mt-8 justify-between">
                <button
                    type="button"
                    onClick={handlePrev}
                    className="text-gray-400 text-sm font-semibold py-2 px-6"
                >
                    Go Back
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-950 text-white py-2 px-6 rounded-md hover:bg-blue-900 transition"
                >
                    Next Step
                </button>
            </div>
        </>
    );
};

export default Plan;
