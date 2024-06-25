import { viewResolvingReviewRequestList } from "@/api/review-request/viewReviewRequest";
import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import { Checkbox, Modal } from "flowbite-react";
import { useState } from "react";
import { useQuery } from "react-query";
import Button from "../Button/Button";
import DataTable from "../DataTable/DataTable";

type Props = {
    defaultSelected: ScoreReviewForm[];
    openModal: boolean;
    onClose: (data: ScoreReviewForm[]) => any;
};

export default function SelectScoreReviewFormModal({
    defaultSelected,
    onClose,
    openModal,
}: Props) {
    const [selectedList, setSelectedList] = useState<ScoreReviewForm[]>([]);

    const {
        data: resolvingTestScoreReviews,
        isLoading: isResolvingTestScoreReviewLoading,
        refetch: refetchResolvingTestScoreReviews,
    } = useQuery({
        queryKey: ["test-score-review-resolving"],
        queryFn: viewResolvingReviewRequestList,
    });

    return (
        <Modal
            dismissible
            size={"5xl"}
            show={openModal}
            onClose={() => onClose([])}
        >
            <Modal.Body>
                <div className=" flex flex-col gap-4">
                    <div className=" flex flex-col gap-4">
                        <p className=" font-semibold">
                            Danh sách đơn phúc khảo chưa xử lý
                        </p>
                        <DataTable
                            data={
                                resolvingTestScoreReviews
                                    ?.filter(
                                        (v) =>
                                            !defaultSelected.find(
                                                (d) => d.id === v.id,
                                            ),
                                    )
                                    .map((d) => ({
                                        ...d,
                                        isChecked: !!selectedList.find(
                                            (v) => v.id === d.id,
                                        ),
                                    })) || []
                            }
                            isEdit={false}
                            isLoading={isResolvingTestScoreReviewLoading}
                            onClickRow={(form) => {
                                if (form.isChecked)
                                    setSelectedList((prev) => [
                                        ...prev.filter((d) => d.id !== form.id),
                                    ]);
                                else
                                    setSelectedList((prev) => [
                                        ...prev.filter((d) => d.id !== form.id),
                                        form,
                                    ]);
                            }}
                            pick={{
                                testScore: {
                                    title: "Môn học",
                                    className: " w-[300px] font-medium",
                                    mapper: (value) => value?.tenMon,
                                },
                                student: {
                                    title: "Sinh viên",
                                    className: " w-[300px] font-medium",
                                    mapper: (value) => value.hoTen,
                                },
                                ngayDangKy: {
                                    title: "Ngày nộp đơn",
                                    className: " font-normal min-w-[250px]",
                                    mapper: (value: Date) =>
                                        new Intl.DateTimeFormat("vi-VN", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                            timeZone: "Asia/Ho_Chi_Minh",
                                        }).format(new Date(value)),
                                },
                                isChecked: {
                                    title: "",
                                    mapper: (value) => (
                                        <Checkbox checked={value} />
                                    ),
                                },
                            }}
                        />
                    </div>
                </div>
                <div className=" mt-8 flex gap-4">
                    <Button onClick={() => onClose(selectedList)} type="submit">
                        Thêm các đơn khiếu nại
                    </Button>
                    <Button btnType="secondary" onClick={() => onClose([])}>
                        Hủy
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
