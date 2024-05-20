"use client";

import viewStaffDetail from "@/api/staff/viewStaffDetail.api";
import LabeledText from "@/components/Typography/LabeledText";
import Staff from "@/types/entity/Staff";
import { useQuery } from "react-query";

export default function StaffDetailTab({ id }: { id: string }) {
    const { data, isLoading, refetch } = useQuery<Staff>(
        ["staff", id],
        viewStaffDetail,
        {
            retry: false,
        },
    );

    return (
        <div className=" flex-1">
            {data ? (
                <>
                    <p className=" font-bold text-xl mb-6">{data.name}</p>
                    <div className=" flex flex-col gap-2">
                        <LabeledText title={"Phone"} value={data.phone} />
                        <LabeledText title={"Email"} value={data.email} />
                        <LabeledText
                            title={"Citizend Id"}
                            value={data.citizenId}
                        />
                    </div>
                </>
            ) : null}
        </div>
    );
}
