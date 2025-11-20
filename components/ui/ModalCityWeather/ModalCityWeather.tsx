"use client";

import React from "react";
import { Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { unselectCity, selectSelectedCity } from "@/store/slices/citiesSlice";

import type { FetchedCityWeather } from "@/types/weather";
import DynamicSvgIcon from "@/components/ui/DynamicSvgIcon/DynamicSvgIcon";
import HourlyChart from "./HourlyChart";

import styles from "./ModalCityWeather.module.scss";
import { getTodayString, getMainValues } from "../../../lib/weatherHelpers";

export default function ModalCityWeather() {
    const dispatch = useAppDispatch();
    const city = useAppSelector(selectSelectedCity) as FetchedCityWeather | null;

    if (!city) return <></>;

    const { name, weather, main } = city;
    const w = weather[0];
    const vals = getMainValues(main);

    return (
        <Modal
            open={!!city}
            onClose={() => dispatch(unselectCity())}
            className={styles.modalRoot}
            disableEnforceFocus
            disableAutoFocus
            disableRestoreFocus
        >
            <div className={styles.card}>
                <IconButton
                    className={styles.closeBtn}
                    onClick={() => dispatch(unselectCity())}
                >
                    <CloseIcon className={styles.closeIconSvg} />
                </IconButton>

                <div className={styles.grid}>
                    <div className={styles.header}>
                        <Typography className={styles.city}>{name}</Typography>
                        <Typography className={styles.date}>{getTodayString()}</Typography>
                    </div>

                    <div className={styles.left}>
                        <div className={styles.iconWrap}>
                            <DynamicSvgIcon name={w.icon} size={96} />
                        </div>

                        <Typography className={styles.temp}>{vals.temp}°C</Typography>
                        <Typography className={styles.main}>{w.main}</Typography>
                        <Typography className={styles.desc}>{w.description}</Typography>
                    </div>

                    <div className={styles.chart}>
                        <div className={styles.chartInner}>
                            <HourlyChart cityName={name} />
                        </div>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.row}>
                            <span>Feels like</span>
                            <span>{vals.feels_like}°C</span>
                        </div>

                        <div className={styles.row}>
                            <span>Humidity</span>
                            <span>{vals.humidity}%</span>
                        </div>

                        <div className={styles.row}>
                            <span>Min / Max °</span>
                            <span>{vals.temp_min}°C / {vals.temp_max}°C</span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
