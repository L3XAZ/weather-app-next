// "use client";
//
// import React, { FC } from "react";
//
// interface Props {
//     name: string; // например "01d"
//     height?: number;
// }
//
// const DynamicSvgIcon: FC<Props> = ({ name, height = 65 }) => {
//     const file = `/icons/${name}.svg`;
//
//     return <img src={file} height={height} alt={name} />;
// };
//
// export default DynamicSvgIcon;

"use client";

import React, { FC, memo } from "react";
import Image from "next/image";
import styles from "./DynamicSvgIcon.module.scss";

interface Props {
    name?: string | null;
    size?: number; // width = height (px)
    className?: string;
}

const DynamicSvgIcon: FC<Props> = memo(({ name, size = 64, className }) => {
    // fallback если API вернул undefined/null
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
