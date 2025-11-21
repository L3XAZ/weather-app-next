import { useGetHourlyForecastQuery } from "@/store/api/weatherApi";
import { useMemo } from "react";

export const useHourlyChart = (cityName: string) => {
    const { data, isLoading, error } = useGetHourlyForecastQuery(cityName);

    const chartData = useMemo(() => data ?? [], [data]);

    return {
        chartData,
        isLoading,
        error,
    };
};
