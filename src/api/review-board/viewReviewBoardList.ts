import { ReviewBoardEntity } from "@/types/ReviewBoard";
import apiInstance from "../apiInstance";

export async function viewReviewBoardList({ queryKey }: { queryKey: any }) {
    try {
        const [_key] = queryKey;
        const response = await apiInstance.get("/review-board");

        const data = response.data as ReviewBoardEntity[];

        return data;
    } catch (error) {
        console.log({ error });
    }
}
