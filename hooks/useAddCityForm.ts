import { useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { addCity } from "@/store/slices/citiesSlice";
import { useLazyGetCityWeatherQuery } from "@/store/api/weatherApi";
import { toast } from "react-hot-toast";

export const useAddCityForm = () => {
    const dispatch = useAppDispatch();
    const [checkCity] = useLazyGetCityWeatherQuery();

    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    const showError = (msg: string) => {
        setError(msg);
        toast.error("No lights on that skyline. Try again.");
    };

    const clearError = () => {
        if (error) setError(null);
    };

    const onChange = (v: string) => {
        setValue(v);
        clearError();
    };

    const submit = async () => {
        const trimmed = value.trim();

        if (!trimmed) {
            showError("Enter a city");
            return;
        }

        const valid = /^[\p{Letter}\s-]+$/u.test(trimmed);
        if (!valid) {
            showError("Only valid city names allowed");
            return;
        }

        try {
            await checkCity(trimmed).unwrap();
            dispatch(addCity(trimmed));
            setValue("");
            toast.success("A new point on your horizon!");
        } catch {
            showError("City not found");
        }
    };

    return {
        value,
        error,
        onChange,
        submit,
    };
};
