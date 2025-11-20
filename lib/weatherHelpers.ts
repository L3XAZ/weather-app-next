import type {
    WeatherMainInfo,
    FetchedHourlyForecast,
    FetchedCityWeather,
    FetchedHourlyForecastItem,
    WeatherItem,
} from "@/types/weather";

export function getMainValues(main: WeatherMainInfo) {
    return {
        temp: Math.round(main.temp),
        feels_like: Math.round(main.feels_like),
        temp_min: Math.round(main.temp_min),
        temp_max: Math.round(main.temp_max),
        humidity: Math.round(main.humidity),
    };
}

function isRawWeatherItem(obj: any): obj is WeatherItem {
    if (!obj || typeof obj !== "object") return false;
    return typeof obj.id === "number" && typeof obj.main === "string";
}

function isRawMain(obj: any): obj is WeatherMainInfo {
    if (!obj || typeof obj !== "object") return false;
    return (
        typeof obj.temp === "number" &&
        typeof obj.feels_like === "number" &&
        typeof obj.temp_min === "number" &&
        typeof obj.temp_max === "number" &&
        typeof obj.humidity === "number"
    );
}

export function normalizeFetchedCityWeather(raw: any): FetchedCityWeather {
    const id = typeof raw?.id === "number" ? raw.id : 0;
    const name = typeof raw?.name === "string" ? raw.name : "";

    const weatherArr = Array.isArray(raw?.weather) ? raw.weather : [];
    const weather: WeatherItem[] = weatherArr.map((w: any) =>
        isRawWeatherItem(w)
            ? w
            : {
                id: Number(w?.id ?? 0),
                main: String(w?.main ?? ""),
                description: String(w?.description ?? ""),
                icon: String(w?.icon ?? ""),
            }
    );

    const mainRaw = raw?.main;
    const main: WeatherMainInfo = isRawMain(mainRaw)
        ? mainRaw
        : {
            temp: Number(mainRaw?.temp ?? 0),
            feels_like: Number(mainRaw?.feels_like ?? 0),
            temp_min: Number(mainRaw?.temp_min ?? 0),
            temp_max: Number(mainRaw?.temp_max ?? 0),
            humidity: Number(mainRaw?.humidity ?? 0),
        };

    return {
        id,
        name,
        weather,
        main,
    };
}

function isFetchedHourly(obj: any): obj is FetchedHourlyForecast {
    if (!obj || typeof obj !== "object") return false;
    if (!Array.isArray(obj.list)) return false;

    return obj.list.every(
        (it: any) => typeof it.dt_txt === "string" && typeof it.main?.temp === "number"
    );
}

export function formatHourlyForecast(
    res: any
): { temp: number; hours: string }[] {
    if (!isFetchedHourly(res)) return [];

    return res.list.map((item: FetchedHourlyForecastItem) => {
        const date = new Date(item.dt_txt);
        const hours = date.toTimeString().slice(0, 5);
        return { temp: Math.round(item.main.temp), hours };
    });
}

export function getTodayString() {
    return new Date().toLocaleDateString();
}
