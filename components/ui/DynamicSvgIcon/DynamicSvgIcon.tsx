"use client";

import React, { FC, memo, useMemo } from "react";
import Image from "next/image";
import styles from "./DynamicSvgIcon.module.scss";

interface Props {
    name?: string | null;
    size?: number;
    className?: string;
}

const DynamicSvgIcon: FC<Props> = ({ name, size = 64, className }) => {
    const fileName = useMemo(() => {
        if (!name) return "default-weather-icon";
        const cleaned = name.trim().replace(/[^a-z0-9\-_.]/gi, "");
        return cleaned || "default-weather-icon";
    }, [name]);

    const wrapperStyle = useMemo(
        () => ({ width: size, height: size }),
        [size]
    );

    const rootClass = useMemo(
        () => [styles.iconWrapper, className].filter(Boolean).join(" "),
        [className]
    );

    return (
        <div className={rootClass} style={wrapperStyle}>
            <Image
                src={`/icons/${fileName}.svg`}
                alt={fileName}
                fill
                sizes={`${size}px`}
            />
        </div>
    );
};

export default memo(DynamicSvgIcon);
