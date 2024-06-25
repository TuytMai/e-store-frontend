import apiInstance from "../apiInstance";

export default async function removeReviewBoard(id: string) {
    const response = await apiInstance.delete(`/review-board/${id}`);

    return response;
}
