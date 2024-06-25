"use client";

import {
    viewResolvedReviewRequestList,
    viewResolvingReviewRequestList,
    viewUnResolvedReviewRequestList,
} from "@/api/review-request/viewReviewRequest";
import DataTable from "@/components/DataTable/DataTable";
import ReviewFormStatus from "@/components/ReviewFormStatus/ReviewFormStatus";
import StudentReviewForm from "@/components/StudentReviewForm/StudentReviewForm";
import TrainingDepartmentReviewForm from "@/components/TrainingDepartmentReviewForm/TrainingDepartmentReviewForm";
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
        queryFn: viewUnResolvedReviewRequestList,
    });

    const {
        data: resolvingTestScoreReviews,
        isLoading: isResolvingTestScoreReviewLoading,
        refetch: refetchResolvingTestScoreReviews,
    } = useQuery({
        queryKey: ["test-score-review-resolving"],
        queryFn: viewResolvingReviewRequestList,
    });

    const {
        data: resolvedTestScoreReviews,
        isLoading: isResolvedTestScoreReviewLoading,
        refetch: refetchResolvedTestScoreReviews,
    } = useQuery({
        queryKey: ["test-score-review-resolved"],
        queryFn: viewResolvedReviewRequestList,
    });

    const [isOpenReviewDetail, setIsOpenreviewDetail] = useState(false);
    const [reviewForm, setReviewForm] = useState<ScoreReviewForm>();

    return (
        <div className=" w-full flex flex-col gap-4">
            <div className=" mt-8 flex flex-col gap-4">
                <p className=" font-semibold">
                    Danh sách đơn phúc khảo chưa xử lý
                </p>
                <DataTable
                    data={
                        testScoreReviews?.map((d) => ({
                            ...d,
                            khoa: d.testScore.khoaQuanLy,
                        })) || []
                    }
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
                            className: " w-[500px] font-medium",
                            mapper: (value) => value?.tenMon,
                        },
                        khoa: {
                            title: "Khoa quản lý",
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
                <p className=" font-semibold">
                    Danh sách đơn phúc khảo đang xử lý
                </p>
                <DataTable
                    data={
                        resolvingTestScoreReviews?.map((d) => ({
                            ...d,
                            khoa: d.testScore.khoaQuanLy,
                        })) || []
                    }
                    isEdit={false}
                    isLoading={isResolvingTestScoreReviewLoading}
                    entityType={"PRODUCT"}
                    onClickRow={(form) => {
                        setIsOpenreviewDetail(true);
                        setReviewForm(form);
                    }}
                    pick={{
                        testScore: {
                            title: "Môn học",
                            className: " w-[500px] font-medium",
                            mapper: (value) => value?.tenMon,
                        },
                        khoa: {
                            title: "Khoa quản lý",
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
                <p className=" font-semibold">
                    Danh sách đơn phúc khảo đã xử lý
                </p>
                <DataTable
                    data={
                        resolvedTestScoreReviews?.map((d) => ({
                            ...d,
                            khoa: d.testScore.khoaQuanLy,
                        })) || []
                    }
                    isEdit={false}
                    isLoading={isResolvedTestScoreReviewLoading}
                    entityType={"PRODUCT"}
                    onClickRow={(form) => {
                        setIsOpenreviewDetail(true);
                        setReviewForm(form);
                    }}
                    pick={{
                        testScore: {
                            title: "Môn học",
                            className: " w-[500px] font-medium",
                            mapper: (value) => value?.tenMon,
                        },
                        khoa: {
                            title: "Khoa quản lý",
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
                        refetchTestScoreReviews();
                        refetchResolvedTestScoreReviews();
                        refetchResolvingTestScoreReviews();
                    }}
                />
            ) : null}
        </div>
    );
}
