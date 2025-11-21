'use client';

import React, { FormEvent, memo, useRef, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import Image from 'next/image';

import { useAddCityForm } from '@/hooks/useAddCityForm';
import styles from './AddCityForm.module.scss';

const AddCityForm = memo(() => {
    const { value, error, onChange, add } = useAddCityForm();
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await add();
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
                        onChange={(e) => onChange(e.target.value)}
                        className={styles.input}
                        error={!!error}
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

                {error && <Typography className={styles.errorMsg}>{error}</Typography>}
            </div>
        </header>
    );
});

AddCityForm.displayName = 'AddCityForm';
export default AddCityForm;
