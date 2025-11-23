export const convertTemperature = (value, units) =>
    units === "fahrenheit" ? Math.round(value * 9 / 5 + 32) : Math.round(value);

export const convertWindSpeed = (speed, unit) => {
    if (unit === "mph") return (speed * 0.621371).toFixed(1);
    return speed;
};

export const convertPrecipitation = (precip, unit) => {
    if (unit === "in") return (precip * 0.0393701).toFixed(2);
    return precip;
};