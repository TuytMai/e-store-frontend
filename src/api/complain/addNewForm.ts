import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import apiInstance from "../apiInstance";

export default async function addNewComplainForm(form: {
    lyDo: string;
    reviewFormId: string;
}) {
    const response = await apiInstance.post("/complaint-form", form);

    return response.data;
}
