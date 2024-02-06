"use client";

import viewDetailProduct from "@/api/product/viewDetailProduct.api";
import Button from "@/components/Button/Button";
import { useUpdateProductModal } from "@/components/UpdateProductForm/UpdateProductFormModal";
import Product from "@/types/entity/Product";
import {
    Accordion,
    AccordionContent,
    AccordionPanel,
    AccordionTitle,
    Carousel,
    CustomFlowbiteTheme,
} from "flowbite-react";
import Image from "next/image";
import { useQuery } from "react-query";
import { RiPencilLine } from "react-icons/ri";
import FORMATTER from "@/utils/formatter";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

type Props = {
    params: { id: string };
};

export default function Page({ params: { id } }: Props) {
    const router = useRouter();

    const {
        data: product,
        isLoading: isProductLoading,
        refetch,
    } = useQuery<Product>(["product", id], viewDetailProduct, {
        refetchOnMount: "always",
        cacheTime: 0,
    });

    const { openUpdateProductModal } = useUpdateProductModal();

    return product ? (
        <div>
            <div className=" pr-12 flex justify-between items-start">
                <div>
                    <div className=" flex flex-row gap-4 items-center">
                        <Button
                            onClick={() => router.push("/product")}
                            btnType={"secondary"}
                            className=" !px-0"
                        >
                            <IoChevronBackOutline size={20} />
                        </Button>
                        <p className=" font-semibold text-2xl">
                            {product.name}
                        </p>
                        <Button
                            onClick={() => openUpdateProductModal(id, refetch)}
                            btnType={"secondary"}
                            className=""
                            hiddenTitle="Edit"
                        >
                            <RiPencilLine size={20} />
                        </Button>
                    </div>
                    <p className=" mt-4 w-fit text-sm rounded-lg font-semibold px-2 py-1 bg-[#99f6e4] text-[#0f766e]">
                        {product.category?.name}
                    </p>
                </div>
            </div>
            <div className=" mt-6 flex flex-row gap-16">
                <div className=" w-[500px] h-[500px] bg-secondary-200 rounded-xl">
                    <Carousel>
                        {product.photoURL
                            ?.split(";")
                            ?.filter((v: any) => v)
                            ?.map((url) => (
                                <Image
                                    src={url}
                                    width={500}
                                    height={500}
                                    alt="Product iamge"
                                />
                            ))}
                    </Carousel>
                </div>
                <div className=" flex-1 overflow-auto ">
                    <div>
                        <p className=" text-secondary-600">Price</p>
                        <p className=" mt-1">
                            <span className=" text-2xl font-bold">
                                {FORMATTER.toCurrency(product.price)}
                            </span>{" "}
                            / <span className="">{product.unit}</span>
                        </p>
                    </div>
                    <div className=" mt-5">
                        <p className=" text-secondary-600">Warranty period</p>
                        <p className=" mt-1">
                            <span className="text-2xl font-bold">
                                {product.warrantyPeriod}
                            </span>
                            <span className=" ml-2 text-secondary-600">
                                months
                            </span>
                        </p>
                    </div>
                    <Accordion
                        theme={customAccordionTheme}
                        collapseAll
                        className="mt-8 mr-0"
                    >
                        <AccordionPanel theme={customAccordionTheme}>
                            <AccordionTitle theme={customAccordionTheme?.title}>
                                <p className=" font-medium text-sm">
                                    Supplier list
                                </p>
                            </AccordionTitle>
                            <AccordionContent
                                theme={customAccordionTheme?.content}
                            ></AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                </div>
            </div>
        </div>
    ) : null;
}

const customAccordionTheme: CustomFlowbiteTheme["accordion"] = {
    root: {
        base: "divide-y divide-gray-200 border-gray-200 ",
        flush: {
            off: "rounded-lg border",
            on: "border-b",
        },
    },
    content: {
        base: "py-4 px-4 last:rounded-b-lg dark:bg-gray-900 first:rounded-t-lg",
    },
    title: {
        arrow: {
            base: "h-5 w-5 shrink-0",
            open: {
                off: "",
                on: "rotate-180",
            },
        },
        base: "flex w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-3 px-3 text-left font-medium text-gray-500 dark:text-gray-400",
        flush: {
            off: "hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800",
            on: "bg-transparent dark:bg-transparent",
        },
        heading: "",
        open: {
            off: "",
            on: "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white",
        },
    },
};
