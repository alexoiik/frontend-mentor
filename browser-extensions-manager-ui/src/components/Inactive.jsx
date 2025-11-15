// Importing React.
import { useState } from "react";
// Importing Images.
import devLensLogo from "../assets/images/logo-devlens.svg";
import styleSpyLogo from "../assets/images/logo-style-spy.svg";
import speedBoostLogo from "../assets/images/logo-speed-boost.svg";
import jsonWizardLogo from "../assets/images/logo-json-wizard.svg";
import tabMasterProLogo from "../assets/images/logo-tab-master-pro.svg";
import viewportBuddyLogo from "../assets/images/logo-viewport-buddy.svg";
import markupNotesLogo from "../assets/images/logo-markup-notes.svg";
import gridGuidesLogo from "../assets/images/logo-grid-guides.svg";
import palettePickerLogo from "../assets/images/logo-palette-picker.svg";
import linkCheckerLogo from "../assets/images/logo-link-checker.svg";
import domSnapshotLogo from "../assets/images/logo-dom-snapshot.svg";
import consolePlusLogo from "../assets/images/logo-console-plus.svg";
// Importing JSON Data.
import data from "../data.json";

// Map logos to data.
const logosMap = {
    "DevLens": devLensLogo,
    "StyleSpy": styleSpyLogo,
    "SpeedBoost": speedBoostLogo,
    "JSONWizard": jsonWizardLogo,
    "TabMaster Pro": tabMasterProLogo,
    "ViewportBuddy": viewportBuddyLogo,
    "Markup Notes": markupNotesLogo,
    "GridGuides": gridGuidesLogo,
    "Palette Picker": palettePickerLogo,
    "LinkChecker": linkCheckerLogo,
    "DOM Snapshot": domSnapshotLogo,
    "ConsolePlus": consolePlusLogo
};

const Inactive = ({ darkMode }) => {
    // Filter only inactive items
    const inactiveItems = data.filter(item => !item.isActive);

    // Toggles initialized based on inactive items (all false)
    const [toggles, setToggles] = useState(
        inactiveItems.map(() => false)
    );

    const handleToggle = index => {
        setToggles(prev => {
            const newToggles = [...prev];
            newToggles[index] = !newToggles[index];
            return newToggles;
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inactiveItems.map((item, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-xl shadow-md transition ${darkMode
                        ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                        : "bg-white hover:bg-gray-100 text-gray-900"
                        }`}
                >
                    {/* Top row: logo + name + description */}
                    <div className="flex items-center gap-4">
                        <img src={logosMap[item.name]} alt={item.name} className="w-12 h-12 flex-shrink-0" />
                        <div className="flex flex-col">
                            <h2 className="font-bold">{item.name}</h2>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    </div>

                    {/* Bottom row: Remove button (left) + Toggle button (right) */}
                    <div className="flex justify-between items-center mt-8">
                        <button
                            className={`px-3 py-1 rounded-full font-medium transition 
                                ${darkMode
                                    ? "border-2 border-gray-600 bg-gray-600 text-white hover:bg-red-500 hover:text-black focus:border-red-400"
                                    : "border-2 text-black focus:border-red-400 hover:bg-red-600"
                                }`}
                        >
                            Remove
                        </button>

                        {/* Functional Toggle */}
                        <div
                            onClick={() => handleToggle(index)}
                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${toggles[index] ? "bg-red-500" : "bg-gray-300 dark:bg-gray-600"}`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 transition-all ${toggles[index] ? "right-0.5" : "left-0.5"}`}></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Inactive;
