import { ComplaintFormEntity } from "@/types/ComplainFormEntity";
import { Modal } from "flowbite-react";
import Button from "../Button/Button";
import DetailReviewFormStatus from "../DetailReviewFormStatus/DetailReviewFormStatus";
import StudentReviewForm from "../StudentReviewForm/StudentReviewForm";
import LabeledText from "../Typography/LabeledText";
import { useState } from "react";

type Props = {
    isOpen: boolean;
    form: ComplaintFormEntity;
    onClose: () => any;
};

export default function StudentComplainForm({ isOpen, form, onClose }: Props) {
    const { id, ngayDangKy, lyDoTuChoi, student, lyDo, tinhTrang } = form;

    const [isOpenReviewDetail, setIsOpenreviewDetail] = useState(false);

    return (
        <Modal show={isOpen} onClose={onClose} dismissible size={"2xl"}>
            <Modal.Body>
                <div className=" px-4 flex flex-col items-center gap-9">
                    <div className=" w-full flex flex-row justify-between">
                        <p className=" text-sm text-gray-500">
                            Id: <span className=" font-semibold">{id}</span>
                        </p>
                        <p className=" text-sm text-gray-500">
                            Ngày tạo:{" "}
                            <span className=" font-semibold">
                                {new Intl.DateTimeFormat("vi-VN", {
                                    dateStyle: "medium",
                                    timeZone: "Asia/Ho_Chi_Minh",
                                }).format(new Date(ngayDangKy))}
                            </span>
                        </p>
                    </div>
                    <p className=" text-3xl font-semibold">
                        Thông tin đơn khiếu nại
                    </p>
                    <div className=" w-full px-2 flex flex-col gap-4">
                        <Button
                            onClick={() => {
                                setIsOpenreviewDetail(true);
                            }}
                        >
                            Xem thông tin chi tiết đơn phúc khảo
                        </Button>
                        <LabeledText
                            className=" items-start"
                            title="Lý do "
                            value={form.lyDo}
                        />
                    </div>
                    <DetailReviewFormStatus
                        status={tinhTrang}
                        reason={lyDoTuChoi}
                    />
                </div>
                <StudentReviewForm
                    isOpen={isOpenReviewDetail}
                    form={form.reviewForm}
                    onClose={() => setIsOpenreviewDetail(false)}
                />
            </Modal.Body>
        </Modal>
    );
}
