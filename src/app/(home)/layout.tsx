import SideBar from "@/components/SideBar/SideBar";
import COOKIE_NAME from "@/constants/cookies";
import SEARCH_PARAMS from "@/constants/searchParams";
import { ModalProvider } from "@/contexts/ModalContext";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { PermissionTypeList } from "@/types/entity/PermissionResponse";
import withQuery from "@/utils/withQuery";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: ReactNodeChildren) {
    const accessToken = cookies().get("accessToken")?.value || "";

    const redirectURI = headers().get(COOKIE_NAME.XURL) || "";

    if (!accessToken)
        redirect(
            withQuery("/signin", {
                [SEARCH_PARAMS.redirectUri]: redirectURI,
            }),
        );

    return (
        <ModalProvider>
            <div className=" relative w-screen h-screen flex">
                <SideBar />
                <div className=" w-full h-screen bg-background-normal ">
                    <div className=" z-10 p-5 lg:py-8 lg:pl-10 lg:pr-8 w-full h-screen flex flex-col overflow-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </ModalProvider>
    );
}

const PageEntityType = {
    product: { type: "PRODUCT", permissions: PermissionTypeList },
    category: { type: "CATEGORY", permissions: PermissionTypeList },
    customer: { type: "CUSTOMER", permissions: PermissionTypeList },
    supplier: { type: "SUPPLIER", permissions: PermissionTypeList },
    staff: { type: "STAFF", permissions: PermissionTypeList },
    import: { type: "IMPORT_BILL", permissions: ["CREATE"] },
    import_bill: { type: "IMPORT_BILL", permissions: PermissionTypeList },
    sale: { type: "SALE_BILL", permissions: ["CREATE"] },
    "sale-invoice": { type: "SALE_BILL", permissions: PermissionTypeList },
    warranty: { type: "WARRANTY_BILL", permissions: ["CREATE"] },
    "warranty-invoice": {
        type: "WARRANTY_BILL",
        permissions: PermissionTypeList,
    },
    home: { type: "DASHBOARD", permissions: PermissionTypeList },
};
