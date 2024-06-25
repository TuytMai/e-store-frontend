import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import apiInstance from "../apiInstance";

export default async function addNewTestScoreReviewForm(
    form: Partial<ScoreReviewForm>,
) {
    const response = await apiInstance.post("/test-score-review-form", form);

    return response.data;
}
