"use client";

import React, { ReactNode } from "react";
import styles from "./CardList.module.scss";

type Key = string | number;

interface Props<T = any> {
    children?: ReactNode;
    items?: T[];
    renderItem?: (item: T) => ReactNode;
    keyExtractor?: (item: T) => Key;
    center?: boolean;
}

export default function CardList<T = any>({
                                              children,
                                              items,
                                              renderItem,
                                              keyExtractor,
                                              center = true,
                                          }: Props<T>) {

    if (items && Array.isArray(items)) {
        return (
            <div className={`${styles.cardList} ${center ? styles.centerChildren : ""}`}>
                {items.map((item, idx) => {
                    let key: Key | undefined;

                    try {
                        if (keyExtractor) key = keyExtractor(item);
                        else if (item && typeof item === "object") {
                            const it = item as any;
                            if (it.id !== undefined) key = it.id;
                            else if (typeof it.name === "string") key = it.name;
                        }
                    } catch {}

                    if (key === undefined) key = `item-${idx}`;

                    return (
                        <div key={String(key)} className={styles.cardItem}>
                            {renderItem ? renderItem(item) : null}
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className={`${styles.cardList} ${center ? styles.centerChildren : ""}`}>
            {children}
        </div>
    );
}
