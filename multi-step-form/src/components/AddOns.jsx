// Importing React.
import { useState, useEffect } from "react";

const AddOns = ({ setStep, billing, setOnlineService, setLargerStorage, setCsSupport }) => {
    const [selected, setSelected] = useState({
        onlineService: true,
        largerStorage: true,
        customizableProfile: false,
    });

    const toggle = (key) => {
        setSelected({
            ...selected,
            [key]: !selected[key],
        });
    };

    // Setting Add Ons.
    const addOns = [
        {
            key: "onlineService",
            title: "Online Service",
            subtitle: "Access to multiplayer games",
            montlyPrice: 1,
            yearlyPrice: 20
        },
        {
            key: "largerStorage",
            title: "Larger Storage",
            subtitle: "Extra 1TB of cloud save",
            montlyPrice: 2,
            yearlyPrice: 20
        },
        {
            key: "customizableProfile",
            title: "Customizable Profile",
            subtitle: "Custom theme on your profile",
            montlyPrice: 2,
            yearlyPrice: 20
        },
    ];

    // Updating setCsSupport based on customizableProfile selection.
    useEffect(() => {
        setCsSupport(selected.customizableProfile);
    }, [selected.customizableProfile, setCsSupport]);

    // Updating onlineService and largerStorage only when toggled off.
    useEffect(() => {
        if (!selected.onlineService) {
            setOnlineService(false);
        } else { setOnlineService(true) }
        if (!selected.largerStorage) {
            setLargerStorage(false);
        } else { setLargerStorage(true) }
    }, [selected.onlineService, selected.largerStorage, setOnlineService, setLargerStorage]);

    const handleNext = () => {
        // Go to step 4.
        setStep(4);
    };

    const handlePrev = () => {
        // Go to step 2.
        setStep(2);
    };

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold">Pick add-ons</h1>
                <span className="text-gray-400 text-sm font-thin">
                    Add-ons help enhance your gaming experience.
                </span>
            </div>

            {/* Add-ons list */}
            <div className="mt-6 flex flex-col gap-4">
                {addOns.map((item) => (
                    <div
                        key={item.key}
                        onClick={() => toggle(item.key)}
                        className={`
                            flex items-center p-4 border rounded-lg cursor-pointer transition
                            ${selected[item.key]
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 hover:border-blue-500"}
                        `}
                    >
                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            checked={selected[item.key]}
                            onChange={() => toggle(item.key)}
                            className="w-5 h-5 mr-4 accent-blue-600 cursor-pointer"
                        />

                        {/* Text */}
                        <div className="flex flex-col flex-grow">
                            <h3 className="font-medium">{item.title}</h3>
                            <span className="text-xs text-gray-400">{item.subtitle}</span>
                        </div>

                        {/* Price */}
                        <span className="text-blue-600 text-sm font-medium">
                            {`+$${billing === 'monthly'
                                ? `${item.montlyPrice}/mo`
                                : `${item.yearlyPrice}/yr`
                                }`}
                        </span>
                    </div>
                ))}
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

export default AddOns;
