import { ScoreReviewForm } from "./ScoreReviewForm";

export type ReviewResultEntity = {
    id: string;
    diemPhucKhao: number;
    giaiTrinh: string;
    testScoreReviewForm: ScoreReviewForm;
    ngay: Date;
};
