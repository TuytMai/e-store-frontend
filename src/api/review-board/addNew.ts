import { NewReviewBoard } from "@/types/NewReviewBoard";
import apiInstance from "../apiInstance";

export default async function addNewReviewBoard(data: NewReviewBoard) {
    const response = await apiInstance.post("/review-board", data);

    return response.data;
}
