"use client";

import React from "react";
import { Modal, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import DynamicSvgIcon from "@/components/ui/DynamicSvgIcon/DynamicSvgIcon";
import HourlyChart from "./HourlyChart/HourlyChart";

import styles from "./ModalCityWeather.module.scss";
import { useModalCityWeather } from "@/hooks/useModalCityWeather";

export default function ModalCityWeather() {
    const { city, prepared, handleClose } = useModalCityWeather();

    if (!city || !prepared) return null;

    const { name } = city;
    const { today, values, weather } = prepared;

    return (
        <Modal
            open={true}
            onClose={handleClose}
            className={styles.modalRoot}
            disableEnforceFocus
            disableAutoFocus
            disableRestoreFocus
        >
            <div className={styles.card}>
                <IconButton
                    className={styles.closeBtn}
                    onClick={handleClose}
                >
                    <CloseIcon className={styles.closeIconSvg} />
                </IconButton>

                <div className={styles.grid}>
                    <div className={styles.header}>
                        <Typography className={styles.city}>{name}</Typography>
                        <Typography className={styles.date}>{today}</Typography>
                    </div>

                    <div className={styles.left}>
                        <div className={styles.iconWrap}>
                            <DynamicSvgIcon name={weather.icon} size={96} />
                        </div>

                        <Typography className={styles.temp}>{values.temp}°C</Typography>
                        <Typography className={styles.main}>{weather.main}</Typography>
                        <Typography className={styles.desc}>{weather.description}</Typography>
                    </div>

                    <div className={styles.chart}>
                        <div className={styles.chartInner}>
                            <HourlyChart cityName={name} />
                        </div>
                    </div>

                    <div className={styles.details}>
                        <div className={styles.row}>
                            <span>Feels like</span>
                            <span>{values.feels_like}°C</span>
                        </div>

                        <div className={styles.row}>
                            <span>Humidity</span>
                            <span>{values.humidity}%</span>
                        </div>

                        <div className={styles.row}>
                            <span>Min / Max °</span>
                            <span>
                {values.temp_min}°C / {values.temp_max}°C
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
