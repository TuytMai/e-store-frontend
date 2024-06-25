import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import apiInstance from "../apiInstance";
import { ComplaintFormEntity } from "@/types/ComplainFormEntity";

export default async function viewReviewRequestList({
    queryKey,
}: {
    queryKey: any;
}) {
    try {
        const [_key] = queryKey;
        const response = await apiInstance.get(
            "/test-score-review-form/student",
        );

        const data = response.data as ScoreReviewForm[];

        return data;
    } catch (error) {
        console.log({ error });
    }
}
