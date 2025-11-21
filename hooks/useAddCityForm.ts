import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addCity } from "@/store/slices/citiesSlice";
import { toast } from "react-hot-toast";
import { useLazyGetCityWeatherQuery } from "@/store/api/weatherApi";

export const useAddCityForm = () => {
    const dispatch = useAppDispatch();
    const cities = useAppSelector((s) => s.cities.cities);
    const [triggerCheckCity] = useLazyGetCityWeatherQuery();

    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onChange = (newValue: string) => {
        setInputValue(newValue);
        if (errorMessage) {
            setErrorMessage(null);
        }
    };

    const addCityHandler = async () => {
        const trimmed = inputValue.trim();

        const isValidName = /^[\p{Letter}\s-]+$/u.test(trimmed);
        if (!isValidName) {
            setErrorMessage("Only valid city names allowed");
            toast.error("No lights on that skyline. Try again.");
            return;
        }

        const cityAlreadyExists = cities.some(
            (existingCity) => existingCity.toLowerCase() === trimmed.toLowerCase()
        );
        if (cityAlreadyExists) {
            toast.error("Almost! Check the name.");
            return;
        }

        try {
            await triggerCheckCity(trimmed).unwrap();
            dispatch(addCity(trimmed));
            setInputValue("");
            toast.success("A new point on your horizon!");
        } catch {
            setErrorMessage("City not found");
            toast.error("No skies responded. Try again.");
        }
    };

    return {
        value: inputValue,
        error: errorMessage,
        onChange,
        add: addCityHandler,
    };
};
