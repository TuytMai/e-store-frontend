"use client";

import viewSupplierProducts from "@/api/supplier/viewSupplierProducts";
import Product from "@/types/entity/Product";
import {
    Accordion,
    AccordionContent,
    AccordionPanel,
    AccordionTitle,
    CustomFlowbiteTheme,
} from "flowbite-react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

export default function SupplierProducts({ id }: { id: string }) {
    const router = useRouter();

    const {
        data: products,
        isLoading: isSupplierProductstLoading,
        refetch: refetchSupplierProducts,
    } = useQuery<Product[]>(["supplier-products", id], viewSupplierProducts, {
        refetchOnMount: "always",
        cacheTime: 0,
    });

    return (
        <Accordion
            theme={customAccordionTheme}
            collapseAll
            className="mt-8 mr-0"
        >
            <AccordionPanel theme={customAccordionTheme}>
                <AccordionTitle theme={customAccordionTheme?.title}>
                    <p className=" font-medium text-sm">Product list</p>
                </AccordionTitle>
                <AccordionContent theme={customAccordionTheme?.content}>
                    {products?.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => {
                                router.push(`/product/${product.id}`);
                            }}
                            className=" my-1 px-4 py-2 rounded-lg hover:bg-secondary-100 hover:cursor-pointer flex flex-row gap-4 items-center"
                        >
                            <p className=" font-semibold">{product.name}</p>

                            <p className=" w-fit text-xs rounded-lg font-semibold px-2 py-1 bg-[#99f6e4] text-[#0f766e]">
                                {product.category?.name}
                            </p>
                        </div>
                    ))}
                </AccordionContent>
            </AccordionPanel>
        </Accordion>
    );
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
