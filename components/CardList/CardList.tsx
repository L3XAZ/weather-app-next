'use client';

import React, { JSX, ReactNode, useMemo } from 'react';
import styles from './CardList.module.scss';
import { Key } from '@/types/ui';
import { getKeyFromItem } from '@/utils/getKeyFromItem';

interface Props<T = unknown> {
    children?: ReactNode;
    items?: T[] | readonly T[];
    renderItem?: (item: T) => ReactNode;
    keyExtractor?: (item: T) => Key | undefined;
    center?: boolean;
}

export default function CardList<T = unknown>({
    children,
    items,
    renderItem,
    keyExtractor,
    center = true,
}: Props<T>): JSX.Element {
    const className = center ? `${styles.cardList} ${styles.centerChildren}` : styles.cardList;

    const renderedItems = useMemo(() => {
        if (!items || !Array.isArray(items)) return null;

        return items.map((item, index) => {
            const rawKey = getKeyFromItem(item, index, keyExtractor);
            const key = String(rawKey);

            return (
                <div key={key} className={styles.cardItem}>
                    {renderItem ? renderItem(item) : null}
                </div>
            );
        });
    }, [items, renderItem, keyExtractor]);

    if (renderedItems) {
        return <div className={className}>{renderedItems}</div>;
    }

    return <div className={className}>{children}</div>;
}
