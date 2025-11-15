const Summary = ({ setStep, selectedPlan, selectedPlanPrice, billing, onlineService, largerStorage, csSupport }) => {

    // Setting final plan and addOns.
    const plan = { name: selectedPlan, monthly: selectedPlanPrice?.monthly, yearly: selectedPlanPrice?.yearly };
    const addOns = [];
    if (onlineService) {
        addOns.push({ name: "Online Service", monthly: 1, yearly: 10 });
    }
    if (largerStorage) {
        addOns.push({ name: "Larger Storage", monthly: 2, yearly: 20 });
    }

    // Price of the main plan.
    const planTotal = billing === "monthly" ? plan?.monthly : plan?.yearly;

    // Price of selected add-ons.
    const addOnsTotal = addOns.reduce(
        (sum, item) => sum + (billing === "monthly" ? item.monthly : item.yearly),
        0
    );

    // Price of Customizable Support.
    const csSupportTotal = csSupport
        ? billing === "monthly"
            ? 2
            : 20
        : 0;

    // Final total.
    const total = planTotal + addOnsTotal + csSupportTotal;

    const handleNext = () => {
        // Go to step 5.
        setStep(5);
    };

    const handlePrev = () => {
        // Go to step 3.
        setStep(3);
    };

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold">Finishing Up</h1>
                <span className="text-gray-400 text-sm font-thin">
                    Double-check everything looks OK before confirming.
                </span>
            </div>

            <div className="mt-6 bg-gray-100 p-6 rounded-lg">
                {/* Plan */}
                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-medium">{plan?.name} ({billing})</span>
                        <br />
                        <button onClick={() => setStep(1)} className="text-sm text-gray-400 underline hover:text-blue-600">
                            Change
                        </button>
                    </div>
                    <span className="font-medium">
                        ${billing === "monthly" ? plan?.monthly : plan?.yearly}/{billing === "monthly" ? "mo" : "yr"}
                    </span>
                </div>

                <hr className="my-4 border-gray-300" />

                {/* Add-ons */}
                <div className="flex flex-col gap-2">
                    {addOns.map((item) => (
                        <div
                            key={item.name}
                            className="flex justify-between text-sm text-gray-600"
                        >
                            <span>{item.name}</span>
                            <span className="text-blue-600 font-medium"> +${billing === "monthly" ? item?.monthly : item?.yearly}/{billing === "monthly" ? "mo" : "yr"}
                            </span> </div>
                    ))}

                    {csSupport && (
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Customizable Profile</span>
                            <span className="text-blue-600 font-medium">
                                +${billing === "monthly" ? 2 : 20}/{billing === "monthly" ? "mo" : "yr"}
                            </span>
                        </div>
                    )}
                </div>

                <hr className="my-4 border-gray-300" />

                {/* Total */}
                <div className="flex justify-between font-bold text-blue-600">
                    <span>Total (per {billing === "monthly" ? "month" : "year"})</span>
                    <span>
                        +${total}/{billing === "monthly" ? "mo" : "yr"}
                    </span>
                </div>
            </div >

            {/* Next Step & Confirm Buttons */}
            <div div className="flex mt-8 justify-between" >
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
                    Confirm
                </button>
            </div>
        </>
    );
};

export default Summary;
