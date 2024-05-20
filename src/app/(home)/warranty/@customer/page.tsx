"use client";

import viewCustomerList from "@/api/customer/viewCustomerList.api";
import viewDetailCustomer from "@/api/customer/viewDetailCustomer";
import TextInput from "@/components/Input/TextInput";
import SearchInput from "@/components/SearchInput/SearchInput.tsx";
import LabeledText from "@/components/Typography/LabeledText";
import { CustomerContext } from "@/contexts/CustomerContext";
import Customer from "@/types/entity/Customer";
import { useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { HiLocationMarker, HiPhone, HiUser } from "react-icons/hi";
import { useQuery } from "react-query";

export default function Page() {
    const searchParams = useSearchParams();

    const customerId = searchParams.get("customerId");

    const { data: customer } = useQuery<Customer>(
        ["customer", customerId],
        viewDetailCustomer,
        {
            refetchOnMount: "always",
            cacheTime: 0,
        },
    );

    const [isCreateCustomer, setIsCreateCustomer] = useState(false);

    return (
        <div className="h-full">
            <p className="font-semibold text-color-heading text-lg">
                Customer information
            </p>
            {/* <SearchInput
                title="Search for customer"
                placeholder="Enter placeholder name here"
                queryInfo={{
                    queryKeys: ["customer"],
                    queryFunc: viewCustomerList,
                }}
                className="w-full mt-5"
                onSelect={(customer) => setCustomer?.(customer)}
            /> */}

            <div className=" p-5 mt-5 flex flex-col gap-3 border-[1px] rounded-2xl">
                <LabeledText title="Name" value={customer?.name} />
                <LabeledText title="Phone" value={customer?.phone} />
                <LabeledText title="Address" value={customer?.address} />
            </div>
            <br />
        </div>
    );
}
