import { ReviewResultEntity } from "./ReviewResult";
import { StudentEntity } from "./StudentEntity";
import { TestScoreEntity } from "./TestScoreEntity";

export type NewScoreReviewForm = {
    maMon: string;
    lyDo: string;
    ngayThi: Date;
    phongThi: string;
    caThi: string;
};

export type ScoreReviewForm = {
    id: string;
    maLop: string;
    ngayThi: Date;
    phongThi: string;
    caThi: string;
    lyDo: string;
    tinhTrang: EReviewStatus;
    lyDoTuChoi: string;
    ngayDangKy: Date;
    nguoiPhucKhao: string;
    student: StudentEntity;
    testScore: TestScoreEntity;
    reviewResult: ReviewResultEntity;
};

export type EReviewStatus = "DA_GUI" | "TU_CHOI" | "DANG_XU_LI" | "DA_XU_LI";
