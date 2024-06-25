"use client";

import { viewLecturerReviewBoardList } from "@/api/review-board/viewReviewBoardList";
import { viewLecturerReviewRequestList } from "@/api/review-request/viewReviewRequest";
import DataTable from "@/components/DataTable/DataTable";
import ReviewFormStatus from "@/components/ReviewFormStatus/ReviewFormStatus";
import TrainingDepartmentReviewForm from "@/components/TrainingDepartmentReviewForm/TrainingDepartmentReviewForm";
import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import { useState } from "react";
import { useQuery } from "react-query";

export default function Page() {
    const {
        data: reviewBoards,
        isLoading: isReviewBoardsLoading,
        refetch: refetchReviewBoards,
    } = useQuery({
        queryKey: ["lecturer-review-boards"],
        queryFn: viewLecturerReviewBoardList,
    });

    const {
        data: lecturerTestScoreReviews,
        isLoading: isLecturerTestScoreReviewLoading,
        refetch: refetchLecturerTestScoreReviews,
    } = useQuery({
        queryKey: ["lecturer-test-score-review-resolving"],
        queryFn: viewLecturerReviewRequestList,
    });

    const [isOpenReviewDetail, setIsOpenreviewDetail] = useState(false);
    const [reviewForm, setReviewForm] = useState<ScoreReviewForm>();

    return (
        <div className=" w-full flex flex-col gap-4">
            <div className=" mt-8 flex flex-col gap-4">
                <p className=" font-semibold">
                    Danh sách hội đồng phúc khảo của bạn
                </p>
                <DataTable
                    data={reviewBoards || []}
                    isEdit={false}
                    isLoading={isReviewBoardsLoading}
                    onClickRow={(form) => {
                        setIsOpenreviewDetail(true);
                        // setReviewForm(form);
                    }}
                    pick={{
                        ten: {
                            title: "Tên hội đồng",
                            className: "font-semibold",
                        },
                        lecturers: {
                            title: "Danh sách giảng viên",
                            mapper: (lecturers) => (
                                <div className=" flex gap-2">
                                    {lecturers.slice(0, 4).map((lecturer) => (
                                        <p
                                            key={lecturer.id}
                                            className=" px-2 py-1 rounded-lg bg-gray-200 font-medium"
                                        >
                                            {lecturer.hoTen}
                                        </p>
                                    ))}
                                    {lecturers.length > 4 ? "" : null}
                                </div>
                            ),
                        },
                        reviewResults: {
                            title: "Số lượng bài cần chấm lại",
                            className: "font-semibold",
                            mapper: (data) => data?.length.toString() || "0",
                        },
                    }}
                />
            </div>
            <div className=" mt-8 flex flex-col gap-4">
                <p className=" font-semibold">
                    Danh sách đơn phúc khảo đang xử lý
                </p>
                <DataTable
                    data={lecturerTestScoreReviews || []}
                    isEdit={false}
                    isLoading={isLecturerTestScoreReviewLoading}
                    onClickRow={(form) => {
                        setIsOpenreviewDetail(true);
                    }}
                    pick={{
                        testScore: {
                            title: "Môn học",
                            mapper: (value) => value?.tenMon,
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
                        tinhTrang: {
                            title: "Tình trạng",
                            mapper: (value) => (
                                <ReviewFormStatus status={value} />
                            ),
                        },
                    }}
                />
            </div>
            {reviewForm ? (
                <TrainingDepartmentReviewForm
                    isOpen={isOpenReviewDetail}
                    form={reviewForm}
                    onClose={() => {
                        setIsOpenreviewDetail(false);
                        // refetchTestScoreReviews();
                    }}
                />
            ) : null}
        </div>
    );
}
