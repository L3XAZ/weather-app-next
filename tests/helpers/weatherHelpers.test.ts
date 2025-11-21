import {
    getMainValues,
    normalizeFetchedCityWeather,
    formatHourlyForecast,
} from "@/lib/weatherHelpers";

describe("weatherHelpers", () => {
    test("getMainValues rounds numbers", () => {
        const res = getMainValues({
            temp: 25.7,
            feels_like: 20.2,
            temp_min: 10.4,
            temp_max: 30.9,
            humidity: 55.1,
        });

        expect(res.temp).toBe(26);
        expect(res.temp_min).toBe(10);
        expect(res.temp_max).toBe(31);
    });

    test("normalizeFetchedCityWeather returns fallback values", () => {
        const res = normalizeFetchedCityWeather({});

        expect(res.id).toBe(0);
        expect(res.name).toBe("");
        expect(res.weather).toHaveLength(0);
    });

    test("formatHourlyForecast returns formatted hours", () => {
        const res = formatHourlyForecast({
            list: [
                {
                    dt_txt: "2020-01-01 12:00:00",
                    main: { temp: 20 },
                    weather: [],
                },
            ],
        });

        expect(res[0].hours).toBe("12:00");
        expect(res[0].temp).toBe(20);
    });

    test("formatHourlyForecast returns [] for invalid input", () => {
        const res = formatHourlyForecast({});
        expect(res).toEqual([]);
    });
});
