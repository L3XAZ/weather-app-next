import { useCallback } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { deleteCity, selectCity } from '@/store/slices/citiesSlice';
import { useGetCityWeatherQuery } from '@/store/api/weatherApi';

export const useCityWeatherCard = (cityRef: string) => {
    const dispatch = useAppDispatch();
    const query = useGetCityWeatherQuery(cityRef);

    const { data: city, isLoading, error, refetch } = query;

    const handleSelect = useCallback(() => {
        if (city) dispatch(selectCity(city));
    }, [dispatch, city]);

    const handleDelete = useCallback(() => {
        dispatch(deleteCity(cityRef));
    }, [dispatch, cityRef]);

    const handleRefresh = useCallback(() => {
        refetch();
    }, [refetch]);

    return {
        city,
        isLoading,
        error,
        handleSelect,
        handleDelete,
        handleRefresh,
    };
};
