import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import apiInstance from "../apiInstance";

export default async function updateReviewRequest({
    id,
    ...form
}: Partial<ScoreReviewForm> & {
    diemPhucKhao?: number;
    giaiTrinh?: string;
}) {
    const response = await apiInstance.patch(
        `/test-score-review-form/${id}`,
        form,
        {},
    );

    return response.data;
}
