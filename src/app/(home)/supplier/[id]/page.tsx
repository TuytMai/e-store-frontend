import LabeledText from "@/components/Typography/LabeledText";
import API from "@/constants/apiEnpoint";
import Supplier from "@/types/entity/Supplier";
import fetchWithToken from "@/utils/fetchWithToken";
import SupplierFunction from "./supplierFunction";
import useScreen from "@/hooks/useScreen";
import TimeLineList from "./TimeLineList";
import Button from "@/components/Button/Button";
import { RiPencilLine } from "react-icons/ri";
import { BsTelephoneFill } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";

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
            </div>
        </>
    );
}

type PropTypes = {
    params: { id: string };
};
