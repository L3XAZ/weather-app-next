'use client';

import { CITIES_NAMES_KEY } from '@/constants';

const safeParse = (raw: string | null): string[] => {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.map((p) => String(p));
        if (parsed && Array.isArray((parsed as any).names))
            return (parsed as any).names.map((n: any) => String(n));
    } catch {}
    return [];
};

export const getCitiesFromLS = (): string[] => {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(CITIES_NAMES_KEY);
    return safeParse(raw);
};

export const addCityToLS = (name: string) => {
    if (typeof window === 'undefined') return;
    const current = getCitiesFromLS();
    if (!current.includes(name)) {
        const next = [...current, name];
        localStorage.setItem(CITIES_NAMES_KEY, JSON.stringify(next));
    }
};

export const deleteCityFromLS = (name: string) => {
    if (typeof window === 'undefined') return;
    const current = getCitiesFromLS();
    const filtered = current.filter((n) => n !== name);
    localStorage.setItem(CITIES_NAMES_KEY, JSON.stringify(filtered));
};
