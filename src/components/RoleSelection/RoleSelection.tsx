import COOKIE_NAME from "@/constants/cookies";
import { ALL_ROLES, UserRole } from "@/types/Role";
import FONT from "@/utils/fontFamily";
import { setCookie } from "cookies-next";
import { CustomFlowbiteTheme, Dropdown, DropdownItem } from "flowbite-react";

type Props = {
    selected?: UserRole | null;
    onValueChange?: (value: UserRole | null) => any;
} & Pick<React.ComponentPropsWithoutRef<"div">, "className">;

export default function RoleSelection({ selected, onValueChange }: Props) {
    return (
        <div>
            <p
                className={`${FONT.primary.className} mb-2 font-semibold text-sm text-secondary-900`}
            >
                Chọn vai trò của bạn
            </p>
            <Dropdown
                theme={dropdownTheme}
                label={
                    selected ? (
                        ALL_ROLES[selected]
                    ) : (
                        <p className=" font-normal text-secondary-600">
                            Not choose
                        </p>
                    )
                }
                dismissOnClick={true}
            >
                <DropdownItem
                    onClick={() => {
                        onValueChange?.(null);
                    }}
                >
                    <p className=" font-normal text-secondary-600">
                        Not choose
                    </p>
                </DropdownItem>
                {Object.entries(ALL_ROLES)
                    ?.map(([key, value]) => ({
                        key: key as UserRole,
                        value,
                    }))
                    ?.map(({ key, value }) => (
                        <DropdownItem
                            key={key}
                            onClick={() => {
                                onValueChange?.(key);
                                setCookie(COOKIE_NAME.ROLE, key);
                            }}
                        >
                            {value}
                        </DropdownItem>
                    ))}
            </Dropdown>
        </div>
    );
}

const dropdownTheme: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "absolute right-2 ml-2 h-4 w-4 text-secondary-950",
    content: "py-1 text-secondary-900 focus:outline-none",
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
        base: "z-10 w-fit bg-background-secondary rounded divide-y divide-secondary-100 shadow focus:outline-none",
        content: "py-1 text-sm text-secondary-700  bg-background-secondary",
        divider: "my-1 h-px bg-secondary-100 ",
        header: "block py-2 px-4 text-sm text-secondary-700",
        hidden: "invisible opacity-0",
        item: {
            container: " bg-background-secondary",
            base: "flex flex-row items-center justify-between  bg-background-secondary py-2 px-4 text-sm text-secondary-800 cursor-pointer w-full hover:bg-secondary-100 focus:bg-secondary-100 ",
            icon: "mr-2 justify-self-end h-5 w-5",
        },
        style: {
            light: "border border-secondary-200  bg-background-secondary  text-secondary-900",
            auto: "border border-secondary-200  bg-background-secondary  text-secondary-900",
        },
        target: " relative w-full flex justify-start border-2 border-surface-grey02 text-ellipsis flex bg-surface-grey01 text-secondary-950 transition duration-200 enabled:hover:bg-primary-200 enabled:active:bg-primary-300",
    },
    inlineWrapper:
        "flex  bg-background-secondary  w-full items-center justify-between",
};
