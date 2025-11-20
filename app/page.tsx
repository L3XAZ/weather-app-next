"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { setCities } from "@/store/slices/citiesSlice";
import { getCitiesFromLS } from "@/lib/localStorage";

import AddCityForm from "@/components/AddCityForm/AddCityForm";
import CardList from "@/components/CardList/CardList";
import CityWeatherCard from "@/components/CityWeatherCard/CityWeatherCard";
import ModalCityWeather from "@/components/ui/ModalCityWeather/ModalCityWeather";

export default function Page() {
    const cities = useAppSelector((s) => s.cities.cities);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCities(getCitiesFromLS()));
    }, [dispatch]);

    return (
        <>
            <header className="topBar">
                <div className="container">
                    <AddCityForm />
                </div>
            </header>

            {!cities.length ? (
                <div className="page-empty">Awaiting your first city to track…</div>
            ) : (
                <main className="container page-content">
                    <CardList
                        items={cities}
                        keyExtractor={(name) => name}
                        renderItem={(name) => <CityWeatherCard key={name} cityRef={name} />}
                    />
                </main>
            )}

            <ModalCityWeather />
        </>
    );
}
