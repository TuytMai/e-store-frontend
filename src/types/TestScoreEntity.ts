import { StudentEntity } from "./StudentEntity";

export type TestScoreEntity = {
    id: string;
    maMon: string;
    tenMon: string;
    lop: string;
    khoaQuanLy: string;
    diemHienTai: number;
    student: StudentEntity;
};
