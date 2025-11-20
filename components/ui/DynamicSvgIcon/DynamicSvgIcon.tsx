"use client";

import React, { FC, memo } from "react";
import Image from "next/image";
import styles from "./DynamicSvgIcon.module.scss";

interface Props {
    name?: string | null;
    size?: number;
    className?: string;
}

const DynamicSvgIcon: FC<Props> = memo(({ name, size = 64, className }) => {
    const fileName = (name && name.trim()) || "default-weather-icon";

    return (
        <div
            className={`${styles.iconWrapper} ${className || ""}`}
            style={{ width: size, height: size }}
        >
            <Image
                src={`/icons/${fileName}.svg`}
                alt={fileName}
                fill
                sizes={`${size}px`}
                priority={false}
            />
        </div>
    );
});

DynamicSvgIcon.displayName = "DynamicSvgIcon";
export default DynamicSvgIcon;
