import { ComplaintFormEntity } from "@/types/ComplainFormEntity";
import apiInstance from "../apiInstance";

export default async function viewComplainList({
    queryKey,
}: {
    queryKey: any;
}) {
    try {
        const [_key] = queryKey;
        const response = await apiInstance.get("/complaint-form/student");

        const data = response.data as ComplaintFormEntity[];

        return data;
    } catch (error) {
        console.log({ error });
    }
}
