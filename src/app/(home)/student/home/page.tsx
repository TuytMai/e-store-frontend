"use client";

import viewComplainList from "@/api/complain/viewComplainList";
import viewReviewRequestList from "@/api/review-request/viewReviewRequest";
import DataTable from "@/components/DataTable/DataTable";
import ReviewFormStatus from "@/components/ReviewFormStatus/ReviewFormStatus";
import ReviewRequestForm from "@/components/ReviewRequestForm/ReviewRequestForm";
import StudentComplainForm from "@/components/StudentComplainForm/StudentComplainForm";
import StudentReviewForm from "@/components/StudentReviewForm/StudentReviewForm";
import { ComplaintFormEntity } from "@/types/ComplainFormEntity";
import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import { useState } from "react";
import { useQuery } from "react-query";

export default function Page() {
    const {
        data: testScoreReviews,
        isLoading: isTestScoreReviewLoading,
        refetch: refetchTestScoreReviews,
    } = useQuery({
        queryKey: ["test-score-review"],
        queryFn: viewReviewRequestList,
    });

    const {
        data: complainForms,
        isLoading: isComplainFormsLoading,
        refetch: refetchComplainForms,
    } = useQuery({
        queryKey: ["complain-form"],
        queryFn: viewComplainList,
    });

    const [isOpenReviewDetail, setIsOpenreviewDetail] = useState(false);
    const [reviewForm, setReviewForm] = useState<ScoreReviewForm>();

    const [isOpenComplainDetail, setIsOpenComplainDetail] = useState(false);
    const [complainForm, setComplainForm] = useState<ComplaintFormEntity>();

    return (
        <div className=" w-full flex flex-col gap-4">
            <div className="">
                <ReviewRequestForm onCreated={refetchTestScoreReviews} />
            </div>
            <div className=" mt-8 flex flex-col gap-4">
                <p className=" font-semibold">Danh sách đơn phúc khảo đã nộp</p>
                <DataTable
                    data={testScoreReviews || []}
                    isEdit={false}
                    isLoading={isTestScoreReviewLoading}
                    entityType={"PRODUCT"}
                    onClickRow={(form) => {
                        setIsOpenreviewDetail(true);
                        setReviewForm(form);
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
            <div className=" mt-8 flex flex-col gap-4">
                <p className=" font-semibold">Danh sách đơn khiếu nại đã nộp</p>
                <DataTable
                    data={complainForms || []}
                    isLoading={isComplainFormsLoading}
                    isEdit={false}
                    onClickRow={(form) => {
                        setIsOpenComplainDetail(true);
                        setComplainForm(form);
                    }}
                    pick={{
                        reviewForm: {
                            title: "Môn học",
                            mapper: (value) => value?.testScore?.tenMon,
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
                <StudentReviewForm
                    isOpen={isOpenReviewDetail}
                    form={reviewForm}
                    onClose={() => setIsOpenreviewDetail(false)}
                />
            ) : null}
            {complainForm ? (
                <StudentComplainForm
                    isOpen={isOpenComplainDetail}
                    form={complainForm}
                    onClose={() => setIsOpenComplainDetail(false)}
                />
            ) : null}
        </div>
    );
}
