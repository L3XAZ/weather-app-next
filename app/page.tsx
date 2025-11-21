'use client';

import React from 'react';
import { useAppSelector } from '@/hooks/redux';
import { useInitCities } from '@/hooks/useInitCities';

import AddCityForm from '@/components/AddCityForm/AddCityForm';
import CardList from '@/components/CardList/CardList';
import CityWeatherCard from '@/components/CityWeatherCard/CityWeatherCard';
import ModalCityWeather from '@/components/ModalCityWeather/ModalCityWeather';

export default function Page() {
    const ready = useInitCities();
    const cities = useAppSelector((s) => s.cities.cities);

    if (!ready) return null;

    const hasCities = cities.length > 0;

    return (
        <>
            <header className="topBar">
                <div className="container">
                    <AddCityForm />
                </div>
            </header>

            {hasCities ? (
                <main className="container page-content">
                    <CardList
                        items={cities}
                        keyExtractor={(name) => name}
                        renderItem={(name) => <CityWeatherCard cityRef={name} />}
                    />
                </main>
            ) : (
                <div className="page-empty">{`Awaiting your first city to track…`}</div>
            )}

            <ModalCityWeather />
        </>
    );
}
