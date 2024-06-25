import FONT from "@/utils/fontFamily";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function LabeledText({
    title,
    value,
    icon,
    className,
}: PropTypes) {
    return (
        <div className={twMerge(" flex flex-col gap-[3px]", className)}>
            <p className=" text-sm text-secondary-600 flex gap-1 items-center">
                {title}
            </p>
            {value ? (
                <p
                    className={twMerge(
                        " text-secondary-950 text-base font-bold flex gap-2 items-center",
                    )}
                >
                    {icon}
                    {value}
                </p>
            ) : (
                <p
                    className={twMerge(
                        " text-base font-normal text-secondary-600 italic flex gap-2 items-center",
                        FONT.primary.className,
                    )}
                >
                    {icon}
                    Nothing to show
                </p>
            )}
        </div>
    );
}

type PropTypes = {
    title: ReactNode;
    value: ReactNode;
    icon?: ReactNode;
    className?: string;
};
