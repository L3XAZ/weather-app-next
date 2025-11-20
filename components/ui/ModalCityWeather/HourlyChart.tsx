"use client";

import React from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { useGetHourlyForecastQuery } from "@/store/api/weatherApi";

interface Props {
    cityName: string;
}

export default function HourlyChart({ cityName }: Props) {
    const { data, isLoading, error } = useGetHourlyForecastQuery(cityName);

    if (isLoading) {
        return (
            <Stack alignItems="center" justifyContent="center" sx={{ height: 200 }}>
                <CircularProgress />
            </Stack>
        );
    }

    if (error || !data) {
        return <Typography sx={{ textAlign: "center" }}>Can’t load forecast</Typography>;
    }

    return (
        <div style={{ width: "100%", height: 230 }}>
            <ResponsiveContainer>
                <AreaChart data={data} margin={{ left: 0, right: 0, top: 20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--gold-soft)" stopOpacity={0.4} />
                            <stop offset="70%" stopColor="var(--gold-light)" stopOpacity={0.15} />
                            <stop offset="100%" stopColor="var(--gold-light)" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />

                    <XAxis
                        dataKey="hours"
                        stroke="var(--muted)"
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    />

                    <YAxis
                        stroke="var(--muted)"
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                        axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    />

                    <Tooltip
                        contentStyle={{
                            background: "rgba(25, 19, 10, 0.85)",
                            border: "1px solid rgba(242, 200, 76, 0.22)",
                            borderRadius: "8px",
                            color: "var(--text)",
                            fontSize: "13px",
                            backdropFilter: "blur(10px)",
                        }}
                        itemStyle={{ color: "var(--gold-light)" }}
                    />

                    <Area
                        type="monotone"
                        dataKey="temp"
                        stroke="var(--gold-soft)"
                        strokeWidth={3}
                        fill="url(#tempGradient)"
                        dot={{ r: 4, fill: "white", stroke: "var(--gold-soft)", strokeWidth: 1 }}
                        activeDot={{ r: 6, fill: "var(--gold-light)", stroke: "white", strokeWidth: 2 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
