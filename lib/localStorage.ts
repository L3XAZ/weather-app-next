"use client";

import { CITIES_NAMES_KEY } from "@/constants";

export const getCitiesFromLS = (): string[] => {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(CITIES_NAMES_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed.names) ? parsed.names : [];
    } catch {
        return [];
    }
};

export const addCityToLS = (name: string) => {
    const names = getCitiesFromLS();
    if (!names.includes(name)) {
        localStorage.setItem(CITIES_NAMES_KEY, JSON.stringify({ names: [...names, name] }));
    }
};

export const deleteCityFromLS = (name: string) => {
    const names = getCitiesFromLS();
    const filtered = names.filter((n) => n !== name);
    localStorage.setItem(CITIES_NAMES_KEY, JSON.stringify({ names: filtered }));
};
