"use client";

import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import SupplierList from "../SupplierList";
import useScreen from "@/hooks/useScreen";

export default function Layout({
    children,
    params: { id: supplierId },
}: ReactNodeChildren & { params: { id: string } }) {
    const screen = useScreen();
    const isMobile = !screen("md");

    return (
        <>
            <div className=" pt-1 flex-1 w-full overflow-y-auto flex flex-col-reverse xl:flex-row gap-5 xl:gap-1 ">
                {children}
            </div>
        </>
    );
}
