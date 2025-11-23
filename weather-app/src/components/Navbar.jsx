import { useState, useRef, useEffect } from "react";

const Navbar = ({ units, setUnits }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <nav className="fixed top-[-50px] left-0 w-full flex items-center justify-between px-4 md:px-10 lg:px-40 z-50">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <img
                    src="/assets/images/logo.svg"
                    alt="Logo"
                    className="w-40 h-40 md:w-60 md:h-60 lg:w-70 lg:h-70"
                />
            </div>

            {/* Units Button + Dropdown     */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 bg-[#25253f] hover:bg-[#2f2f49] transition text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-sm md:text-base"
                >
                    <img
                        src="/assets/images/icon-units.svg"
                        alt="Units Icon"
                        className="w-4 h-4 md:w-5 md:h-5 opacity-80"
                    />
                    <span className="font-medium">Units</span>
                    <img
                        src="/assets/images/icon-dropdown.svg"
                        alt="Dropdown Icon"
                        className={`w-3 h-3 md:w-4 md:h-4 opacity-80 transition-transform ${open ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {/* Dropdown content */}
                {open && (
                    <div className="absolute right-0 mt-2 w-[200px] bg-[#25253f] rounded-lg shadow-lg border border-white/10 p-4 text-white">

                        {/* Switch to Imperial */}
                        <button
                            className="w-full text-left py-2 px-2 hover:bg-white/10 rounded-md"
                            onClick={() =>
                                setUnits({
                                    temperature: "fahrenheit",
                                    wind: "mph",
                                    precipitation: "in",
                                })
                            }
                        >
                            Switch to Imperial
                        </button>

                        {/* Temperature */}
                        <div className="mt-3">
                            <p className="text-left text-xs opacity-60 mb-1">Temperature:</p>

                            <DropdownItem
                                label="Celsius (ºC)"
                                checked={units.temperature === "celsius"}
                                onClick={() => setUnits({ ...units, temperature: "celsius" })}
                            />
                            <DropdownItem
                                label="Fahrenheit (ºF)"
                                checked={units.temperature === "fahrenheit"}
                                onClick={() =>
                                    setUnits({ ...units, temperature: "fahrenheit" })
                                }
                            />
                        </div>

                        <hr className="border-gray-500/40" />

                        {/* Wind Speed */}
                        <div className="mt-3">
                            <p className="text-left text-xs opacity-60 mb-1">Wind Speed:</p>

                            <DropdownItem
                                label="km/h"
                                checked={units.wind === "kmh"}
                                onClick={() => setUnits({ ...units, wind: "kmh" })}
                            />
                            <DropdownItem
                                label="mph"
                                checked={units.wind === "mph"}
                                onClick={() => setUnits({ ...units, wind: "mph" })}
                            />
                        </div>

                        <hr className="border-gray-500/40" />

                        {/* Precipitation */}
                        <div className="mt-3">
                            <p className="text-left text-xs opacity-60 mb-1">Precipitation:</p>

                            <DropdownItem
                                label="Millimeters (mm)"
                                checked={units.precipitation === "mm"}
                                onClick={() => setUnits({ ...units, precipitation: "mm" })}
                            />
                            <DropdownItem
                                label="Inches (in)"
                                checked={units.precipitation === "in"}
                                onClick={() => setUnits({ ...units, precipitation: "in" })}
                            />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

// DropdownItem.
const DropdownItem = ({ label, checked, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center justify-between w-full py-2 px-2 my-1 rounded-md hover:bg-white/10 
            ${checked ? "bg-white/10" : ""}`}
    >
        <span>{label}</span>
        {checked && <span className="text-blue-400">✔</span>}
    </button>
);
