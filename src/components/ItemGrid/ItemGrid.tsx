"use client";

import React, { ReactNode } from "react";

type Props<T> = {
    items: T[];
    renderItem: (item: T) => ReactNode;
} & Pick<React.ComponentPropsWithoutRef<"div">, "className">;

export default function ItemGrid<T>({
    items,
    renderItem,
    className,
}: Props<T>) {
    return (
        <div
            className={` overflow-auto flex-1 max-w-full h-fit max-h-full grid grid-cols-5 rounded-lg border-[1px] border-secondary-200 p-6 ${className}`}
        >
            {items.map((item) => renderItem(item))}
        </div>
    );
}
