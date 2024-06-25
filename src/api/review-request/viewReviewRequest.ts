import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import apiInstance from "../apiInstance";

export default async function viewStudentReviewRequestList({
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

export async function viewUnResolvedReviewRequestList({
    queryKey,
}: {
    queryKey: any;
}) {
    try {
        const [_key] = queryKey;
        const response = await apiInstance.get(
            "/test-score-review-form/unresolved",
        );

        const data = response.data as ScoreReviewForm[];

        return data;
    } catch (error) {
        console.log({ error });
    }
}

export async function viewResolvingReviewRequestList({
    queryKey,
}: {
    queryKey: any;
}) {
    try {
        const [_key] = queryKey;
        const response = await apiInstance.get(
            "/test-score-review-form/resolving",
        );

        const data = response.data as ScoreReviewForm[];

        return data;
    } catch (error) {
        console.log({ error });
    }
}

export async function viewResolvedReviewRequestList({
    queryKey,
}: {
    queryKey: any;
}) {
    try {
        const [_key] = queryKey;
        const response = await apiInstance.get(
            "/test-score-review-form/resolved",
        );

        const data = response.data as ScoreReviewForm[];

        return data;
    } catch (error) {
        console.log({ error });
    }
}
