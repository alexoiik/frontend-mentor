// Importing React.
import { useState } from "react";
// Importing Images.
import background from "./assets/images/background-desktop.png";
import patternLines from "./assets/images/pattern-lines.svg";
import patternBottomDesktop from "./assets/images/pattern-squiggly-line-bottom-desktop.svg";
import patternBottomMobile from "./assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg";
import patternTop from "./assets/images/pattern-squiggly-line-top.svg";
import patternCircle from "./assets/images/pattern-circle.svg";
import logoFull from "./assets/images/logo-full.svg";
// Importing Components.
import Form from "./components/Form";
import Ticket from "./components/Ticket";

function App() {
  const [ticketData, setTicketData] = useState(null);

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Images */}
      <img src={patternLines} className="absolute inset-0 w-full h-full object-cover pointer-events-none" alt="patternLines" />
      <img src={patternBottomMobile} className="absolute bottom-0 left-0 pointer-events-none md:hidden" alt="patternBottomMobile" />
      <img src={patternBottomDesktop} className="absolute bottom-0 left-0 pointer-events-none hidden md:block" alt="patternBottomDesktop" />
      <img src={patternTop} className="absolute top-0 right-0 pointer-events-none" alt="patternTop" />
      <img src={patternCircle} className="absolute top-1/2 right-[300px] -translate-y-1/2 pointer-events-none" alt="patternCircle" />
      {/* Components */}
      <div className="relative z-10 w-full flex flex-col items-center text-center pt-10 px-4">
        <img src={logoFull} className="w-[180px] md:w-[220px] mb-6" alt="logoFull" />
        {ticketData ? (
          <Ticket data={ticketData} />
        ) : (
          <Form onGenerate={setTicketData} />
        )}
      </div>
    </div>
  );
}

export default App;
