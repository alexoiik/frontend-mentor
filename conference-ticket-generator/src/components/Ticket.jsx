// Importing Images.
import ticketPattern from "../assets/images/pattern-ticket.svg";
import logoMark from "../assets/images/logo-mark.svg";
import iconGithub from "../assets/images/icon-github.svg";

const Ticket = ({ data }) => {
    // Split the full name into first and last name.
    const [firstName, lastName] = data.fullName.split(" ");

    return (
        <>
            <h1 className="text-white font-extrabold text-3xl md:text-5xl max-w-[750px]">
                Congrats,{" "}
                <span className="bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                    {firstName}{" "}
                </span>
                <span className="bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                    {lastName}
                </span>! Your ticket is ready.
            </h1>

            <p className="text-white/80 mt-4 text-lg md:text-xl max-w-[700px]">
                We have emailed your ticket to{" "}
                <span className="bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                    {data.email}{" "}
                </span>
                and will send updates in the run up to the event.
            </p>

            <div className="relative mt-20 w-full max-w-md md:max-w-lg">
                {/* Ticket Background */}
                <img src={ticketPattern} alt="Ticket" className="w-full shadow-lg" />

                {/* Ticket Info Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    {/* Top Left: Logo mark + "Coding Conf" + date */}
                    <div className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                            <img src={logoMark} alt="Logo Mark" className="w-8 h-8" />
                            <span className="font-extrabold text-2xl md:text-3xl pb-1">Coding Conf</span>
                        </div>
                        <span className="text-gray-300 text-sm md:text-base ml-10 mt-1">
                            Jan 31, 2025 / Austin, TX
                        </span>
                    </div>

                    {/* Bottom Info: Avatar + Name + GitHub */}
                    <div className="mt-4 flex items-center gap-4">
                        {/* Avatar */}
                        <img
                            src={data.avatar}
                            alt={data.fullName}
                            className="w-16 h-16 rounded-lg border-2 border-white/50"
                        />

                        {/* Name & GitHub */}
                        <div className="flex flex-col">
                            {/* Full Name */}
                            <span className="font-bold text-lg md:text-xl">
                                {data.fullName}
                            </span>

                            {/* GitHub */}
                            <div className="flex items-center gap-2">
                                <img src={iconGithub} alt="GitHub" className="w-4 h-4" />
                                <span className="text-sm md:text-base text-gray-300">{data.github}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ticket;
