"use client";

import viewReviewRequestList from "@/api/review-request/viewReviewRequest";
import DataTable from "@/components/DataTable/DataTable";
import ReviewFormStatus from "@/components/ReviewFormStatus/ReviewFormStatus";
import ReviewRequestForm from "@/components/ReviewRequestForm/ReviewRequestForm";
import StudentReviewForm from "@/components/StudentReviewForm/StudentReviewForm";
import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import { useState } from "react";
import { useQuery } from "react-query";

export default function Page() {
    const {
        data: testScoreReviews,
        isLoading: isTestScoreReviewLoading,
        refetch,
    } = useQuery({
        queryKey: ["test-score-review"],
        queryFn: viewReviewRequestList,
    });

    const [isOpenViewDetail, setIsOpenViewDetail] = useState(false);
    const [form, setForm] = useState<ScoreReviewForm>();

    return (
        <div className=" w-full flex flex-col gap-4">
            <div className="">
                <ReviewRequestForm onCreated={refetch} />
            </div>
            <div>
                <p></p>
                <DataTable
                    data={testScoreReviews || []}
                    isLoading={isTestScoreReviewLoading}
                    className="-mr-8 pr-8 mt-4"
                    entityType={"PRODUCT"}
                    onClickRow={(form) => {
                        setIsOpenViewDetail(true);
                        setForm(form);
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
            {form ? (
                <StudentReviewForm
                    isOpen={isOpenViewDetail}
                    form={form}
                    onClose={() => setIsOpenViewDetail(false)}
                />
            ) : null}
        </div>
    );
}
