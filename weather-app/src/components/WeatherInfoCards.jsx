import { convertTemperature, convertWindSpeed, convertPrecipitation } from "../utils/conversions";

const WeatherInfoCards = ({ weather, units }) => {
    if (!weather || !weather.current_weather) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-xl w-full">
            {/* Feels Like */}
            <div className="bg-[#25253f] p-4 rounded-xl flex flex-col items-start text-left">
                <p className="text-sm opacity-60">Feels Like</p>
                <p className="text-xl font-semibold pt-2">
                    {convertTemperature(weather.current_weather.temperature, units.temperature)}
                    {units.temperature === "fahrenheit" ? "ºF" : "ºC"}
                </p>
            </div>

            {/* Humidity */}
            <div className="bg-[#25253f] p-4 rounded-xl flex flex-col items-start text-left">
                <p className="text-sm opacity-60">Humidity</p>
                <p className="text-xl font-semibold pt-2">
                    {weather.current_weather?.humidity ?? "--"}%
                </p>
            </div>

            {/* Wind */}
            <div className="bg-[#25253f] p-4 rounded-xl flex flex-col items-start text-left">
                <p className="text-sm opacity-60">Wind</p>
                <p className="text-xl font-semibold pt-2">
                    {convertWindSpeed(weather.current_weather.windspeed, units.wind)}
                    {units.wind === "mph" ? " mph" : " km/h"}
                </p>
            </div>

            {/* Precipitation */}
            <div className="bg-[#25253f] p-4 rounded-xl flex flex-col items-start text-left">
                <p className="text-sm opacity-60">Precipitation</p>
                <p className="text-xl font-semibold pt-2">
                    {convertPrecipitation(weather.current_weather?.precipitation ?? 0, units.precipitation)}
                    {units.precipitation === "in" ? " in" : " mm"}
                </p>
            </div>
        </div>
    );
};

export default WeatherInfoCards;
