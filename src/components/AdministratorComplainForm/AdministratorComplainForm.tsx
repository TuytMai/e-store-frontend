import { ComplaintFormEntity } from "@/types/ComplainFormEntity";
import { Modal } from "flowbite-react";
import { useState } from "react";
import Button from "../Button/Button";
import StudentReviewForm from "../StudentReviewForm/StudentReviewForm";
import LabeledText from "../Typography/LabeledText";
import RejectScoreReviewForm from "../RejectForm/RejectForm";
import ApproveForm from "../ApproveForm/ApproveForm";
import RejectComplainForm from "../RejectForm/RejectComplainForm";
import { useMutation } from "react-query";
import updateComplain from "@/api/complain/update";
import ReviewFormStatus from "../ReviewFormStatus/ReviewFormStatus";

type Props = {
    isOpen: boolean;
    form: ComplaintFormEntity;
    onClose: () => any;
};

export default function AdministratorComplainForm({
    isOpen,
    form,
    onClose,
}: Props) {
    const { id, ngayDangKy, student, lyDo, tinhTrang } = form;

    const [isOpenReviewDetail, setIsOpenreviewDetail] = useState(false);

    const { mutate } = useMutation({
        mutationFn: updateComplain,
    });

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
                    <div className=" flex flex-col items-center gap-2">
                        <p className=" text-3xl font-semibold">
                            Thông tin đơn khiếu nại
                        </p>
                        <ReviewFormStatus status={form.tinhTrang} />
                    </div>
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
                            title="Lý do"
                            value={form.lyDo}
                        />
                        {form.lyDoTuChoi ? (
                            <LabeledText
                                className=" items-start"
                                title="Lý do từ chối"
                                value={form.lyDoTuChoi}
                            />
                        ) : null}
                    </div>
                    {form.tinhTrang === "DA_GUI" ? (
                        <div className=" flex gap-4">
                            <RejectComplainForm form={form} />
                            <ApproveForm
                                onClick={() => {
                                    mutate({ id, tinhTrang: "DANG_XU_LI" });
                                }}
                            />
                        </div>
                    ) : null}
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
