import { TestScoreEntity } from "@/types/TestScoreEntity";
import apiInstance from "../apiInstance";

export default async function viewTestScoreList({
    queryKey,
}: {
    queryKey: any;
}) {
    try {
        const [_key] = queryKey;
        const response = await apiInstance.get("/test-score/student");

        const data = response.data as TestScoreEntity[];

        return data;
    } catch (error) {
        console.log({ error });
    }
}
