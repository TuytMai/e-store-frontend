import { ComplaintFormEntity } from "@/types/ComplainFormEntity";
import apiInstance from "../apiInstance";

export default async function updateComplain({
    id,
    ...form
}: Partial<ComplaintFormEntity>) {
    const response = await apiInstance.patch(`/complaint-form/${id}`, form, {});

    return response.data;
}
