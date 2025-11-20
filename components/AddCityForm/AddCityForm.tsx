"use client";

import React, { FC, FormEvent, memo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { TextField, Button } from "@mui/material";

import { useAppDispatch } from "@/hooks";
import { addCity } from "@/store/slices/citiesSlice";

import styles from "./AddCityForm.module.scss";

const AddCityForm: FC = memo(() => {
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (!trimmed) return;

        dispatch(addCity(trimmed));
        setValue("");
    };

    return (
        <header className={styles.topBar}>
            <div className={styles.inner}>
                <Image
                    src="/images/umbrella_logo.png"
                    alt="Umbrella logo"
                    width={40}
                    height={40}
                    className={styles.logo}
                />

                <form onSubmit={handleSubmit} className={styles.form}>
                    <TextField
                        inputRef={inputRef}
                        value={value}
                        label="City"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setValue(e.target.value)}
                        className={styles.input}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        className={styles.addBtn}
                        disabled={!value.trim()}
                    >
                        Add
                    </Button>
                </form>
            </div>
        </header>
    );
});

AddCityForm.displayName = "AddCityForm";
export default AddCityForm;
