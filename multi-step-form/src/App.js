// Importing React.
import { useState } from "react";
// Importing Images.
import bgSidebar from "./assets/images/bg-sidebar-desktop.svg";
import bgSidebarMobile from "./assets/images/bg-sidebar-mobile.svg";
// Importing Components.
import Info from "./components/Info";
import Plan from "./components/Plan";
import AddOns from "./components/AddOns";
import Summary from "./components/Summary";
import ThankYou from "./components/ThankYou";

function App() {
  const [step, setStep] = useState(1);
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("Arcade");
  const [selectedPlanPrice, setSelectedPlanPrice] = useState({
    monthly: 9,
    yearly: 90
  });
  const [onlineService, setOnlineService] = useState(true);
  const [largerStorage, setLargerStorage] = useState(true);
  const [csSupport, setCsSupport] = useState(false);

  const steps = [
    { id: 1, title: "YOUR INFO" },
    { id: 2, title: "SELECT PLAN" },
    { id: 3, title: "ADD-ONS" },
    { id: 4, title: "SUMMARY" },
  ];

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row w-full max-w-[900px] lg:h-[600px]">
        {/* Left Side */}
        <div
          className="w-full lg:w-1/3 h-[200px] lg:h-full bg-cover bg-no-repeat p-6 text-white flex justify-center lg:block"
          style={{ backgroundImage: `url(${window.innerWidth < 1024 ? bgSidebarMobile : bgSidebar})` }}
        >
          <div className="flex lg:flex-col gap-6 mt-4 lg:mt-10">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border transition 
                    ${step === s.id ? "bg-white text-black" : "border-white"}`}
                >
                  {s.id}
                </div>

                <div className="flex-col leading-tight hidden lg:flex">
                  <span className="text-xs opacity-70">STEP {s.id}</span>
                  <span className="font-bold tracking-wide">{s.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-2/3 p-6 lg:p-[65px]">
          {step === 1 && <Info setStep={setStep} />}
          {step === 2 && <Plan
            setStep={setStep}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            setSelectedPlanPrice={setSelectedPlanPrice}
            billing={billing}
            setBilling={setBilling}
          />}
          {step === 3 && <AddOns
            setStep={setStep}
            billing={billing}
            setOnlineService={setOnlineService}
            setLargerStorage={setLargerStorage}
            setCsSupport={setCsSupport}
          />}
          {step === 4 && <Summary
            setStep={setStep}
            selectedPlan={selectedPlan}
            selectedPlanPrice={selectedPlanPrice}
            billing={billing}
            onlineService={onlineService}
            largerStorage={largerStorage}
            csSupport={csSupport}
          />}
          {step === 5 && <ThankYou />}
        </div>
      </div>
    </div>
  );
}

export default App;
