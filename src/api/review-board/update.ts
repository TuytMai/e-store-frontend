import { NewReviewBoard } from "@/types/NewReviewBoard";
import apiInstance from "../apiInstance";

export default async function updateReviewBoard({
    id,
    ...data
}: NewReviewBoard & { id: string }) {
    const response = await apiInstance.patch(`/review-board/${id}`, data);

    return response.data;
}
