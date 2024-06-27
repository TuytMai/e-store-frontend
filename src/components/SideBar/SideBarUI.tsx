"use client";

import { CustomFlowbiteTheme } from "flowbite-react";

import COOKIE_NAME from "@/constants/cookies";
import useScreen from "@/hooks/useScreen";
import Staff from "@/types/entity/Staff";
import { deleteCookie, setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSideBarState } from "@/contexts/SideBar";
import { UserRole } from "@/types/Role";
import { Navbar } from "flowbite-react";
import { useTheme } from "next-themes";
import TextInput from "../Input/TextInput";
import Button from "../Button/Button";

export default function SideBarUI({
    staffInfo,
    role,
    isCollapse: _isCollapse,
}: PropTypes) {
    const router = useRouter();
    const pathname = usePathname();
    const routeName = (pathname.split("/").slice(1, 3).join("/") || "") + "/";
    const screen = useScreen();
    const isMobile = !screen("md");

    const { theme } = useTheme();

    const { isCollapse, setIsCollapse } = useSideBarState((state) => ({
        isCollapse:
            state.isCollapse === undefined ? _isCollapse : state.isCollapse,
        setIsCollapse: state.setIsCollapse,
    }));

    useEffect(() => {
        setIsCollapse(_isCollapse);
    }, [_isCollapse, setIsCollapse]);

    useEffect(() => {
        setCookie(COOKIE_NAME.SIDE_BAR_COLLAPSE, isCollapse);
    }, [isCollapse]);

    return (
        <Navbar fluid rounded>
            <Navbar.Brand href={`/${role}`}>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    UIT Phuc Khao
                </span>
            </Navbar.Brand>
            <div className="">
                <div className="">
                    <TextInput
                        sizing={"sm"}
                        className=" lg:min-w-[500px]"
                        placeholder="Search for feature..."
                    />
                </div>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className=" items-center">
                <Navbar.Link href={`/${role}`} active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="/setting">Setting</Navbar.Link>
                <Navbar.Link
                    className=" cursor-pointer"
                    onClick={() => {
                        deleteCookie(COOKIE_NAME.ACCESS_TOKEN);
                        router.push("/signin");
                    }}
                >
                    Logout
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

const ROUTES = {
    home: "home",
    product: "/product",
    supplier: "/supplier",
    category: "/category",
    staff: "/staff",
    import_bill: "/import_bill",
    import: "/import",
    sale_invoice: "/sale-invoice",
    sale: "/sale",
    warranty_invoice: "/warranty-invoice",
    warranty: "/warranty",
    customer: "/customer",
};

const sideBarTheme: CustomFlowbiteTheme["sidebar"] = {
    root: {
        base: "h-full  bg-primary-50 border-r-[1px] border-secondary-200",
        collapsed: {
            on: "w-16",
            off: "w-64",
        },
        inner: "h-full overflow-y-auto overflow-x-hidden rounded  bg-primary-50 py-4 px-3",
    },
    collapse: {
        button: "group flex w-full items-center rounded-lg p-2 text-sm font-normal text-secondary-900 transition duration-75 hover:bg-primary-100",
        icon: {
            base: "h-6 w-6 text-secondary-500 transition duration-75 group-hover:text-secondary-900",
            open: {
                off: "text-secondary-600",
                on: "text-secondary-900",
            },
        },
        label: {
            base: "ml-3 flex-1 whitespace-nowrap text-left",
            icon: {
                base: "h-6 w-6 text-secondary-500 transition ease-in-out delay-0",
                open: {
                    on: "rotate-180",
                    off: "",
                },
            },
        },
        list: "space-y-2 py-2",
    },
    cta: {
        base: "mt-6 rounded-lg p-4 bg-gray-100 dark:bg-gray-700",
        color: {
            blue: "bg-cyan-50 dark:bg-cyan-900",
            dark: "bg-dark-50 dark:bg-dark-900",
            failure: "bg-red-50 dark:bg-red-900",
            gray: "bg-alternative-50 dark:bg-alternative-900",
            green: "bg-green-50 dark:bg-green-900",
            light: "bg-light-50 dark:bg-light-900",
            red: "bg-red-50 dark:bg-red-900",
            purple: "bg-purple-50 dark:bg-purple-900",
            success: "bg-green-50 dark:bg-green-900",
            yellow: "bg-yellow-50 dark:bg-yellow-900",
            warning: "bg-yellow-50 dark:bg-yellow-900",
        },
    },
    item: {
        base: "flex items-center justify-center rounded-lg p-2 text-sm font-normal text-secondary-600 transition-all duration-200 hover:bg-primary-100 active:bg-primary-300 hover:text-secondary-950 hover:font-semibold ",
        active: " text-secondary-950 font-semibold bg-primary-200",
        collapsed: {
            insideCollapse: "group w-full pl-8 transition duration-200",
            noIcon: "font-bold",
        },
        content: {
            base: "px-3 flex-1 whitespace-nowrap",
        },
        icon: {
            base: "h-6 w-6 flex-shrink-0 text-secondary-600 transition duration-75 group-hover:text-secondary-950",
            active: "text-secondary-950",
        },
        label: "",
        listItem: "",
    },
    //@ts-ignore
    items: "",
    //@ts-ignore
    itemGroup:
        "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
    logo: {
        base: "mb-5 flex items-center pl-2.5",
        collapsed: {
            on: "hidden",
            off: "self-center whitespace-nowrap text-xl font-semibold dark:text-white",
        },
        img: "mr-3 h-6 sm:h-7",
    },
};

const sideBarCollapsedItemTheme: CustomFlowbiteTheme["sidebar"] = {
    item: {
        base: "flex items-center justify-center rounded-lg p-2 text-sm font-normal text-secondary-600 transition-all duration-200 hover:bg-primary-100 active:bg-primary-300 ",
        active: " text-primary-500 underline underline-offset-4 font-medium",
        collapsed: {
            insideCollapse: "group w-full pl-8 transition duration-200",
            noIcon: "font-bold",
        },
        content: {
            base: "px-3 flex-1 whitespace-nowrap",
        },
        icon: {
            base: "h-6 w-6 flex-shrink-0 text-secondary-600 transition duration-75 group-hover:text-secondary-950",
            active: "text-secondary-950",
        },
        label: "",
        listItem: "",
    },
};

const dropdownTheme: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "ml-2 h-4 w-4 text-secondary-950",
    content:
        "py-1 text-secondary-900 bg-background-secondary focus:outline-none",
    floating: {
        animation: "transition-opacity",
        arrow: {
            base: "absolute z-10 h-2 w-2 rotate-45",
            style: {
                light: "bg-secondary-900",
                auto: "bg-secondary-900",
            },
            placement: "-4px",
        },
        base: "z-10 w-fit rounded bg-background-secondary divide-y divide-secondary-100 shadow focus:outline-none",
        content: "py-1 text-sm text-secondary-700",
        divider: "my-1 h-px bg-secondary-100",
        header: "block py-2 px-4 text-sm text-secondary-700",
        hidden: "invisible opacity-0",
        item: {
            // container: "",
            base: "flex flex-row items-center justify-between py-2 px-4 text-sm text-secondary-800 cursor-pointer w-full bg-background-secondary hover:bg-secondary-100 focus:bg-secondary-100 ",
            icon: "mr-2 justify-self-end h-5 w-5",
        },
        style: {
            light: "border border-secondary-200 bg-background-secondary text-secondary-900",
            auto: "border border-secondary-200 bg-background-secondary text-secondary-900",
        },
        target: " max-w-[250px] w-max border-2 border-surface-grey02 text-ellipsis flex bg-surface-grey01 text-secondary-950 transition duration-200 enabled:hover:bg-primary-200 enabled:active:bg-primary-300",
    },
    inlineWrapper: "flex w-full items-center justify-between",
};

type PropTypes = {
    isCollapse: boolean;
    staffInfo?: Staff;
    role: UserRole;
};
