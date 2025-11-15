// Importing React.
import { useState } from "react";

const Info = ({ setStep }) => {
    // Setting form and errors.
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [errors, setErrors] = useState({});

    // Handling change.
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        // Removing error message as user types.
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    // Handling Next Button.
    const handleNext = () => {
        let newErrors = {};

        // Validations.
        if (!form.email.trim()) {
            newErrors.email = "This field is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!form.name.trim()) newErrors.name = "This field is required";
        if (!form.phone.trim()) newErrors.phone = "This field is required";

        setErrors(newErrors);

        // If ANY error exists, stop.
        if (Object.keys(newErrors).length > 0) return;

        // Go to step 2.
        setStep(2);
    };

    return (
        <>
            <div>
                <h1 className="text-blue-950 text-2xl font-bold">Personal Info</h1>
                <span className="text-gray-400 text-sm font-thin">
                    Please provide your name, email address, and phone number.
                </span>
            </div>

            {/* Form */}
            <form className="mt-6 flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Stephen King"
                        className={`text-blue-950 mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 
                        ${errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
                    />
                    {errors.name && (
                        <span className="font-semibold text-red-500 text-xs mt-1">{errors.name}</span>
                    )}
                </div>
                {/* Email */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="e.g. stephenking@lorem.com"
                        className={`text-blue-9500 mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 
                        ${errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
                    />
                    {errors.email && (
                        <span className="font-semibold text-red-500 text-xs mt-1">{errors.email}</span>
                    )}
                </div>
                {/* Phone */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        name="phone"
                        type="text"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="e.g. +1 234 567 890"
                        className={`text-blue-950 mt-1 border rounded-md p-2 focus:outline-none focus:ring-2 
                        ${errors.phone ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
                    />
                    {errors.phone && (
                        <span className="font-semibold text-red-500 text-xs mt-1">{errors.phone}</span>
                    )}
                </div>
            </form>

            {/* Next Step Button */}
            <div className="flex justify-end mt-8">
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

export default Info;
