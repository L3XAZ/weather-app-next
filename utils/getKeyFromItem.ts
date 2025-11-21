import { Key } from "@/types/ui";

export function getKeyFromItem<T>(
    item: T,
    index: number,
    keyExtractor?: (item: T) => Key | undefined
): Key {
    if (keyExtractor) {
        try {
            const k = keyExtractor(item);
            if (k !== undefined && k !== null) return k;
        } catch {}
    }

    if (item && typeof item === "object") {
        const asAny = item as any;
        if (asAny.id !== undefined && asAny.id !== null) return asAny.id;
        if (typeof asAny.name === "string" && asAny.name.length > 0)
            return asAny.name;
    }

    return `item-${index}`;
}
