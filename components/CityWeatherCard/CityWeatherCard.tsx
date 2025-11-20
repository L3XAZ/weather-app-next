"use client";

import React, { FC, memo } from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import UpdateIcon from "@mui/icons-material/Update";
import CircularProgress from "@mui/material/CircularProgress";

import { useAppDispatch } from "@/hooks";
import { deleteCity, selectCity } from "@/store/slices/citiesSlice";
import DynamicSvgIcon from "@/components/ui/DynamicSvgIcon/DynamicSvgIcon";

import styles from "./CityWeatherCard.module.scss";
import {useGetCityWeatherQuery} from "@/store/api/weatherApi";

interface Props {
    cityRef: string;
}

const CityWeatherCard: FC<Props> = memo(({ cityRef }) => {
    const dispatch = useAppDispatch();
    const { data: city, isLoading, error, refetch } = useGetCityWeatherQuery(cityRef);

    if (error) {
        return (
            <div className={styles.errorWrapper}>
                <Typography color="error">Failed to load</Typography>
            </div>
        );
    }

    if (isLoading || !city) {
        return (
            <div className={styles.loadingWrapper}>
                <CircularProgress size={40} />
            </div>
        );
    }

    const weather = city.weather[0];

    return (
        <Card className={styles.card} onClick={() => dispatch(selectCity(city))}>
            <CardContent className={styles.content}>
                <div className={styles.topArea}>
                    <div className={styles.iconWrap}>
                        <DynamicSvgIcon name={weather.icon} size={72} />
                    </div>

                    <Typography className={styles.cityName}>{city.name}</Typography>

                    <Typography className={styles.temp}>
                        {Math.round(city.main.temp)}°C
                    </Typography>

                    <Typography className={styles.mainText}>{weather.main}</Typography>
                    <Typography className={styles.desc}>{weather.description}</Typography>
                </div>

                <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
                    <IconButton
                        size="small"
                        className={styles.deleteBtn}
                        onClick={() => dispatch(deleteCity(cityRef))}
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        size="small"
                        className={styles.refreshBtn}
                        onClick={() => refetch()}
                    >
                        <UpdateIcon fontSize="small" />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
});

export default CityWeatherCard;
