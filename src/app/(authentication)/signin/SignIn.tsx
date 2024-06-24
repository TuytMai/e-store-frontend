"use client";
import { setCookie } from "cookies-next";
import Image from "next/image";
import LOGO from "../../../assets/logo.png";

import Button from "@/components/Button/Button";
import CheckBox from "@/components/Checkbox/CheckBox";
import ControllerTextInput from "@/components/ControllerInput/ControllerTextInput";
import RoleSelection from "@/components/RoleSelection/RoleSelection";
import Link from "@/components/Typography/Link";
import API from "@/constants/apiEnpoint";
import SEARCH_PARAMS from "@/constants/searchParams";
import { publicFetcher } from "@/hooks/usePublicRoute";
import { UserRole } from "@/types/Role";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiArrowRight } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";
import HERO_IMAGE from "../../../assets/bg.png";

type Props = {
    role: UserRole | null;
};

export default function SignIn({ role: defaultRole }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [role, setRole] = useState<UserRole | null>(defaultRole);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        setError,
        clearErrors,
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        const email = data.username;
        const password = data.password;

        setIsLoading(true);
        const res = await publicFetcher(API.authentication.signIn, "POST", {
            email,
            password,
        });

        if (res.status === 200) {
            const token = await res.json();
            setCookie("accessToken", token.access_token);
            setCookie("refreshToken", token.refresh_token);
            router.push(
                decodeURI(
                    searchParams.get(SEARCH_PARAMS.redirectUri) || "/product",
                ),
            );
        } else {
            setValue("username", "");
            setValue("password", "");
            setError("root", { message: "Email or password is invalid" });
        }
        setIsLoading(false);
    };

    return (
        <div className=" px-24 h-screen flex flex-row justify-between items-center bg-[#009FA3]">
            <div className="flex flex-col justify-center">
                <div className=" w-full sm:h-max sm:w-max sm:min-w-[550px] sm:rounded-3xl bg-background-secondary grid place-items-center">
                    <div className=" w-full px-6 py-10 sm:px-20 sm:py-16">
                        <div className="relative w-fit mx-auto flex flex-col items-center gap-5 sm:gap-0 sm:flex-row">
                            <Image
                                className=" sm:absolute top-0 -left-10"
                                src={LOGO}
                                width={30}
                                height={30}
                                alt="logo"
                            />
                            <h1 className=" mb-14 text-2xl sm:text-3xl text-center font-semibold text-secondary-900">
                                Phuc khao
                            </h1>
                            {/* {role ? (
                                <p
                                    className={`absolute whitespace-nowrap right-16 bottom-8 sm:top-5 translate-x-full text-2xl sm:text-4xl text-primary-500 ${FONT.yesteryear.className}`}
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #16B6FA 0%, #DC02FF 100%)",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {role}
                                </p>
                            ) : null} */}
                        </div>
                        <RoleSelection
                            selected={role}
                            onValueChange={setRole}
                        />
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className=" mt-8 mx-auto max-w-[300px] sm:max-w-none"
                        >
                            <ControllerTextInput
                                control={control}
                                name="username"
                                title="Tên đăng nhập"
                                rules={{
                                    required: "Bạn cần nhập tên đăng nhập",
                                }}
                                icon={IoPerson}
                                register={register}
                                placeholder="Nhập tên đăng nhập..."
                                onValueChange={(d: any) => {
                                    clearErrors("username");
                                }}
                                error={errors.username}
                            />
                            <ControllerTextInput
                                control={control}
                                type="password"
                                name="password"
                                title="Mật khẩu"
                                rules={{ required: "Bạn cần nhập mật khẩu" }}
                                register={register}
                                placeholder="Nhập mật khẩu..."
                                onValueChange={(d: any) => {
                                    clearErrors("password");
                                }}
                                error={errors.password}
                            />
                            {errors.root && (
                                <p className="mt-3 text-sm text-center text-error-500">
                                    {errors.root.message}
                                </p>
                            )}
                            <div className=" w-full flex justify-between items-center mt-5">
                                <CheckBox id="remember me">
                                    Remember me
                                </CheckBox>
                                <Link>Forgot password</Link>
                            </div>
                            <Button
                                type="submit"
                                className=" mt-8 w-full"
                                isLoading={isLoading}
                            >
                                <p className=" mr-2">Đăng nhập</p>
                                <HiArrowRight />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
            <Image
                src={HERO_IMAGE}
                width={500}
                height={500}
                objectFit="contain"
                alt="Hero image"
            />
        </div>
    );
}

type FormValues = {
    username: string;
    password: string;
};
