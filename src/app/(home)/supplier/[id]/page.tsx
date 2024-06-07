import Button from "@/components/Button/Button";
import API from "@/constants/apiEnpoint";
import Supplier from "@/types/entity/Supplier";
import fetchWithToken from "@/utils/fetchWithToken";
import { CustomFlowbiteTheme } from "flowbite-react";
import { BsTelephoneFill } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { RiPencilLine } from "react-icons/ri";
import SupplierProducts from "./SupplierProducts";
import TimeLineList from "./TimeLineList";

export default async function Page({ params: { id } }: PropTypes) {
    const supplierResponse = await fetchWithToken(API.supplier.getDetail(id));
    const supplier: Supplier = await supplierResponse.json();

    return (
        <>
            <div className=" flex-none xl:max-h-full h-fit pl-1 pr-8 pb-2 overflow-x-hidden xl:overflow-y-auto">
                <TimeLineList supplierId={id} />
            </div>
            <div className=" py-5 pl-5 relative w-full h-fit flex flex-col gap-5 rounded-lg border-[1px] border-secondary-300">
                <div className=" flex flex-row justify-between">
                    <div>
                        <div className="flex flex-row gap-4 items-center">
                            <p className=" text-secondary-600 text-sm">
                                Supplier name
                            </p>
                            <Button
                                btnType={"secondary"}
                                className=""
                                hiddenTitle="Edit"
                            >
                                <RiPencilLine size={20} />
                            </Button>
                        </div>
                        <p className=" mt-0">
                            <span className=" text-2xl font-bold">
                                {supplier.name}
                            </span>
                        </p>
                    </div>
                    <div className=" pr-16 mt-4 flex flex-col gap-2">
                        <div className=" flex flex-row gap-2 items-center">
                            <BsTelephoneFill size={16} />
                            <p className=" font-semibold">{supplier.phone}</p>
                        </div>
                        <div className=" flex flex-row gap-2 items-center">
                            <MdOutlineMail size={20} />
                            <p className=" font-semibold">{supplier.email}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className=" text-secondary-600 text-sm">Note</p>
                    <p className=" mt-1">
                        <span className=" text-base">{supplier.note}</span>
                    </p>
                </div>
                <SupplierProducts id={id} />
            </div>
        </>
    );
}

type PropTypes = {
    params: { id: string };
};

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
