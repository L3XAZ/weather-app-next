'use client';

import React, { FC, memo } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import UpdateIcon from '@mui/icons-material/Update';
import CircularProgress from '@mui/material/CircularProgress';

import DynamicSvgIcon from '@/components/ui/DynamicSvgIcon/DynamicSvgIcon';

import styles from './CityWeatherCard.module.scss';
import { useCityWeatherCard } from '@/hooks/useCityWeatherCard';

interface Props {
    cityRef: string;
}

const CityWeatherCard: FC<Props> = memo(({ cityRef }) => {
    const { city, isLoading, error, handleSelect, handleDelete, handleRefresh } =
        useCityWeatherCard(cityRef);

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

    const weather = city.weather?.[0];
    const temperature = Math.round(city.main?.temp);

    return (
        <Card className={styles.card} onClick={handleSelect} data-testid="weather-card">
            <CardContent className={styles.content}>
                <div className={styles.topArea}>
                    <div className={styles.iconWrap}>
                        {weather && <DynamicSvgIcon name={weather.icon} size={72} />}
                    </div>

                    <Typography className={styles.cityName}>{city.name}</Typography>
                    <Typography className={styles.temp}>{temperature}°C</Typography>

                    {weather && (
                        <>
                            <Typography className={styles.mainText}>{weather.main}</Typography>
                            <Typography className={styles.desc}>{weather.description}</Typography>
                        </>
                    )}
                </div>

                <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
                    <IconButton
                        size="small"
                        className={styles.deleteBtn}
                        onClick={handleDelete}
                        data-testid="delete-btn"
                    >
                        <ClearIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                        size="small"
                        className={styles.refreshBtn}
                        onClick={handleRefresh}
                        data-testid="refresh-btn"
                    >
                        <UpdateIcon fontSize="small" />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
});

CityWeatherCard.displayName = 'CityWeatherCard';
export default CityWeatherCard;
