// Importing React.
import { useState } from "react";
// Importing Images.
import logo from "./assets/images/logo.svg";
import iconMoon from "./assets/images/icon-moon.svg";
import iconSun from "./assets/images/icon-sun.svg";
// Importing Components.
import All from "./components/All";
import Active from "./components/Active";
import Inactive from "./components/Inactive";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");

  return (
    <>
      {/* Main Wrapper */}
      <div
        className={`pt-10 px-2 min-h-screen w-full flex flex-col items-center 
        ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
      >
        {/* Header */}
        <div
          className={`
            w-full max-w-[1100px] h-[70px] rounded-xl shadow-md p-3 
            flex items-center justify-between
            ${darkMode ? "bg-gray-800" : "bg-white"}
            mx-4
          `}
        >
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-30 h-30" />
          </div>

          <div
            className={`
              flex items-center gap-2 cursor-pointer shadow-md rounded-xl p-2 transition-colors
              ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"}
            `}
            onClick={() => setDarkMode(!darkMode)}
          >
            <img
              src={darkMode ? iconSun : iconMoon}
              alt={darkMode ? "Light Mode" : "Dark Mode"}
              className="w-6 h-6"
            />
          </div>
        </div>

        {/* Extensions + Tabs */}
        <div
          className={`
            w-full max-w-[1100px] mt-10 
            flex flex-col md:flex-row justify-between items-start md:items-center
            px-4
          `}
        >
          <h1 className={`text-2xl font-bold mb-4 md:mb-0 text-center md:text-left ${darkMode ? "text-white" : ""}`}>
            Extensions List
          </h1>

          {/* Tabs */}
          <div className="flex gap-3 flex-wrap">
            {["All", "Active", "Inactive"].map((tab) => (
              <button
                key={tab}
                className={`
                  px-4 py-2 rounded-full font-medium transition-colors
                  ${selectedTab === tab
                    ? "border-2 border-red-600 bg-red-600 text-white"
                    : "border-2 border-gray-200 bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }
                `}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Component Renderer */}
        <div className="w-full max-w-[1100px] mt-6 px-4 pb-10">
          {selectedTab === "All" && <All darkMode={darkMode} />}
          {selectedTab === "Active" && <Active darkMode={darkMode} />}
          {selectedTab === "Inactive" && <Inactive darkMode={darkMode} />}
        </div>
      </div>
    </>
  );
}

export default App;
