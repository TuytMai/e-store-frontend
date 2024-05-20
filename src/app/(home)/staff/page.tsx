"use client";

import { useDeleteStaffMutation } from "@/api/staff/deleteStaff.api";
import viewStaffList from "@/api/staff/viewStaffList.api";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import { useCreateStaffModal } from "@/components/CreateStaffForm/CreateStaffFormModal";
import DataTable from "@/components/DataTable/DataTable";
import { useUpdateStaffModal } from "@/components/UpdateStaffForm/UpdateStaffFormModal";
import { usePermission } from "@/hooks/usePermission";
import useScreen from "@/hooks/useScreen";
import Staff from "@/types/entity/Staff";
import FORMATTER from "@/utils/formatter";
import withQuery from "@/utils/withQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

export default function Page() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const { openCreateStaffModal } = useCreateStaffModal();
    const { openUpdateStaffModal } = useUpdateStaffModal();
    const { openClaimModal } = useClaimModal();

    const { data, isLoading, refetch } = useQuery<Staff[]>(
        ["staffs", ""],
        viewStaffList,
        {
            retry: false,
        },
    );

    const deleteStaffMutation = useDeleteStaffMutation(refetch);

    const isAllowedCreate = usePermission("STAFF", ["CREATE"]);

    const screen = useScreen();
    const isMobile = !screen("md");

    return (
        <DataTable
            data={data || []}
            isLoading={isLoading}
            onDelete={(staff) => {
                openClaimModal(
                    <>
                        Do you want to delete staff <b>{staff.name}</b>
                    </>,
                    (confirm) => confirm && deleteStaffMutation.mutate(staff),
                );
            }}
            onEdit={(staff) => {
                openUpdateStaffModal(staff.id, refetch);
            }}
            onClickRow={(staff: Staff) => {
                router.push(withQuery(`/staff/${staff.id}`, {}, searchParams));
            }}
            pick={{
                name: { title: "Name", className: "min-w-[150px]" },
                ...(pathname.split("/").at(-1) != "staff"
                    ? {}
                    : {
                          email: {
                              title: "Email",
                              className:
                                  " font-normal text-secondary-500 min-w-[150px]",
                          },
                          phone: {
                              title: "Phone number",
                              className:
                                  " font-normal text-secondary-500 min-w-[100px]",
                          },
                          citizenId: {
                              title: "Citizen ID",
                              className:
                                  " font-normal text-secondary-500 min-w-[100px]",
                          },
                      }),
                lastOnline: {
                    title: "Last online",
                    className: " font-normal text-secondary-500 min-w-[150px]",
                    mapper: FORMATTER.toShortDate,
                },
            }}
        />
    );
}
