"use client";

import viewDetailCustomer from "@/api/customer/viewDetailCustomer";
import viewCustomerSaleBillList from "@/api/sale/viewCustomerSaleBillList.api";
import Button from "@/components/Button/Button";
import { useUpdateCustomerModal } from "@/components/UpdateCustomerForm/UpdateCustomerFormModal";
import Revision from "@/types/Revision";
import Customer from "@/types/entity/Customer";
import SaleBill, { SaleProductResponse } from "@/types/entity/SaleBill";
import FORMATTER from "@/utils/formatter";
import {
    Accordion,
    AccordionContent,
    AccordionPanel,
    AccordionTitle,
    Carousel,
    CustomFlowbiteTheme,
} from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import { RiPencilLine } from "react-icons/ri";
import { useQuery } from "react-query";

export default function Page({ params: { id } }: { params: { id: string } }) {
    const router = useRouter();

    const {
        data: customer,
        isLoading: isCustomerLoading,
        refetch,
    } = useQuery<Customer>(["customer", id], viewDetailCustomer, {
        refetchOnMount: "always",
        cacheTime: 0,
    });

    const {
        data: bills,
        isLoading: isBillLoading,
        refetch: refetchBill,
    } = useQuery<Revision<SaleBill<SaleProductResponse>>[]>(
        ["customer-bill", id],
        viewCustomerSaleBillList,
        {
            refetchOnMount: "always",
            cacheTime: 0,
        },
    );

    const { open } = useUpdateCustomerModal();

    return customer ? (
        <div>
            <div className=" pr-8 -ml-4 flex justify-between items-start">
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
                            {customer.name}
                        </p>
                        <Button
                            onClick={() => open(id, refetch)}
                            btnType={"secondary"}
                            className=""
                            hiddenTitle="Edit"
                        >
                            <RiPencilLine size={20} />
                        </Button>
                    </div>
                </div>
            </div>
            <div className=" mt-6 flex flex-row gap-16">
                <div className=" w-[400px] overflow-auto ">
                    <div>
                        <p className=" text-secondary-600">Phone</p>
                        <p className=" mt-1">
                            <span className=" text-xl font-bold">
                                {customer.phone}
                            </span>{" "}
                        </p>
                    </div>
                    <div className=" mt-5">
                        <p className=" text-secondary-600">Address</p>
                        <p className=" mt-1">
                            <span className="text-xl font-bold">
                                {customer.address}
                            </span>
                        </p>
                    </div>
                </div>
                <div className=" flex-1 overflow-auto">
                    <p className=" font-bold text-lg">Sale bill list</p>
                    {bills?.map(({ revision, timestamp }) => (
                        <Accordion
                            key={timestamp}
                            theme={customAccordionTheme}
                            collapseAll
                            className="mt-8 mr-0"
                        >
                            <AccordionPanel theme={customAccordionTheme}>
                                <AccordionTitle
                                    theme={customAccordionTheme?.title}
                                >
                                    <p className=" font-medium text-sm">
                                        <span className=" text-secondary-500">
                                            Bill date:
                                        </span>{" "}
                                        <span>
                                            {new Intl.DateTimeFormat("en-GB", {
                                                dateStyle: "long",
                                                timeStyle: "long",
                                                timeZone: "Asia/Ho_Chi_Minh",
                                            }).format(new Date(timestamp))}
                                        </span>
                                    </p>
                                </AccordionTitle>
                                <AccordionContent
                                    theme={customAccordionTheme?.content}
                                >
                                    {revision.saleProducts.map(
                                        ({ product, price, quantity }) => (
                                            <div
                                                key={product.id}
                                                className=" pr-8 flex flex-row justify-between items-center"
                                            >
                                                <div className=" flex items-center gap-4">
                                                    <div className=" rounded-lg">
                                                        <Image
                                                            src={
                                                                product?.photoURL
                                                                    ?.split(";")
                                                                    ?.filter(
                                                                        (
                                                                            v: any,
                                                                        ) => v,
                                                                    )?.[0]
                                                            }
                                                            width={50}
                                                            height={50}
                                                            alt="Product preview image"
                                                        />
                                                    </div>
                                                    <div className=" flex flex-col gap-1">
                                                        <p className=" font-bold">
                                                            {product.name}
                                                        </p>
                                                        <p className=" text-sm">
                                                            Price:{" "}
                                                            <span className=" font-semibold">
                                                                {FORMATTER.toCurrency(
                                                                    product.price,
                                                                )}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="">
                                                        <span className=" font-bold text-3xl">
                                                            {quantity}
                                                        </span>{" "}
                                                        <span>
                                                            {product.unit}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </AccordionContent>
                            </AccordionPanel>
                        </Accordion>
                    ))}
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
