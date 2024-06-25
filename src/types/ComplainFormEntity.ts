import { ScoreReviewForm } from "./ScoreReviewForm";
import { StudentEntity } from "./StudentEntity";

export type ComplaintFormEntity = {
    id: string;
    lyDo: string;
    ngayDangKy: Date;
    lyDoTuChoi: string;
    tinhTrang: EComplaintStatus;
    student: StudentEntity;
    reviewForm: ScoreReviewForm;
};

export type EComplaintStatus = "DA_GUI" | "TU_CHOI" | "DANG_XU_LI" | "DA_XU_LI";
