import { LecturerEntity } from "./entity/Lecturer";
import { ReviewResultEntity } from "./ReviewResult";

export type ReviewBoardEntity = {
    id: string;
    ten: string;
    lecturers: LecturerEntity[];
    reviewResults: ReviewResultEntity[];
};
