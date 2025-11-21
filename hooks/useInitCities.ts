import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setCities } from "@/store/slices/citiesSlice";
import { getCitiesFromLS } from "@/lib/localStorage";

export const useInitCities = () => {
    const [ready, setReady] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const saved = getCitiesFromLS();
        dispatch(setCities(saved));
        setReady(true);
    }, [dispatch]);

    return ready;
};
