import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { Datepicker, Label } from "flowbite-react";
import React from "react";
import { Controller } from "react-hook-form";

export default function ControllerDateInput({
    control,
    type = "text",
    name,
    title,
    rules,
    icon,
    register,
    placeholder,
    onValueChange,
    defaultValue,
    error,
    className,
    ...props
}: PropTypes) {
    return (
        <div className={` py-[0px] ${className}`} {...props}>
            <Label
                htmlFor={name}
                className="mb-2 block font-semibold text-secondary-900 "
                value={title}
            />
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { value, onChange, ...field } }) => (
                    <Datepicker
                        id={name}
                        className=" text-secondary-900"
                        {...register(name)}
                        onChange={(d: any) => {
                            onChange(d);
                            onValueChange(d);
                        }}
                        error={!!error}
                        name={name}
                    />
                )}
            />
            {error && (
                <p className="mt-2 text-sm text-color-error">{error.message}</p>
            )}
        </div>
    );
}

type PropTypes = {
    control: any;
    name: string;
    title: string;
    type?: string;
    icon?: any;
    placeholder?: string;
    rules: any;
    onValueChange: any;
    register: any;
    error: any;
} & React.ComponentPropsWithoutRef<"div"> &
    ReactNodeChildren;
