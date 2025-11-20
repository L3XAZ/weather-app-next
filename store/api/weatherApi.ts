import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WEATHER_BASE_URL } from "@/constants";
import type { FetchedCityWeather, FetchedHourlyForecast, HourlyForecast } from "@/types/weather";
import { formatHourlyForecast, normalizeFetchedCityWeather } from "@/lib/weatherHelpers";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "";

export const weatherApi = createApi({
    reducerPath: "weatherApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${WEATHER_BASE_URL}data/2.5/`,
    }),
    keepUnusedDataFor: 300,
    tagTypes: ["CityWeather"],
    endpoints: (builder) => ({
        getCityWeather: builder.query<FetchedCityWeather, string>({
            query: (cityName) => ({
                url: "weather",
                params: { q: cityName, units: "metric", appid: API_KEY },
            }),
            transformResponse: (res: any) => normalizeFetchedCityWeather(res),
            providesTags: (_res, _err, cityName) => [{ type: "CityWeather", id: cityName }],
        }),
        getHourlyForecast: builder.query<HourlyForecast, string>({
            query: (cityName) => ({
                url: "forecast",
                params: { q: cityName, units: "metric", cnt: 8, appid: API_KEY },
            }),
            transformResponse: (res: any) => formatHourlyForecast(res as FetchedHourlyForecast),
            providesTags: (_res, _err, cityName) => [{ type: "CityWeather", id: cityName }],
        }),
        getCitiesWeather: builder.query<{ list: FetchedCityWeather[] }, number[]>({
            query: (ids) => ({
                url: "group",
                params: { id: ids.join(","), units: "metric", appid: API_KEY },
            }),
            transformResponse: (res: any) => {
                if (!res || typeof res !== "object") return { list: [] };
                const maybe = (res as any).list;
                if (!Array.isArray(maybe)) return { list: [] };
                return { list: maybe.map((raw: any) => normalizeFetchedCityWeather(raw)) };
            },
            providesTags: (result) =>
                result
                    ? result.list.map((city) => ({ type: "CityWeather" as const, id: String(city.id) }))
                    : [],
        }),
    }),
});

export const { useGetCityWeatherQuery, useGetHourlyForecastQuery, useGetCitiesWeatherQuery } = weatherApi;
