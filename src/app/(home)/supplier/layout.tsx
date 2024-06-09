"use client";

import { ReactNodeChildren } from "@/types/ReactNodeChildren";

export default function Layout({ children }: ReactNodeChildren) {
    return <div className="w-full h-full flex flex-col">{children}</div>;
}
