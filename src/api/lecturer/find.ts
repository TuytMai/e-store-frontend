import { LecturerEntity } from "@/types/entity/Lecturer";
import apiInstance from "../apiInstance";

export default async function findLecturers({ queryKey }: { queryKey: any }) {
    const [_key, name] = queryKey;
    const response = await apiInstance.get("/lecturer", {
        params: { name },
    });

    const lecturers = response.data as LecturerEntity[];

    return lecturers;
}
