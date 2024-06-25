"use client";

import { viewReviewBoardList } from "@/api/review-board/viewReviewBoardList";
import CreateReviewBoard from "@/components/CreateReviewBoard/CreateReviewBoard";
import DataTable from "@/components/DataTable/DataTable";
import UpdateReviewBoard from "@/components/UpdateReviewBoard/UpdateReviewBoard";
import { ReviewBoardEntity } from "@/types/ReviewBoard";
import { useState } from "react";
import { useQuery } from "react-query";

export default function Page() {
    const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

    const [reviewBoard, setReviewBoard] = useState<ReviewBoardEntity>();

    const {
        data: reviewBoards,
        isLoading: isReviewBoardLoading,
        refetch,
    } = useQuery({
        queryKey: ["review-boards"],
        queryFn: viewReviewBoardList,
    });

    return (
        <div className=" w-full flex flex-col gap-4">
            <div className="">
                <CreateReviewBoard onCreated={refetch} />
            </div>
            <div className=" mt-8 flex flex-col gap-4">
                <p className=" font-semibold">Danh sách đơn phúc khảo đã nộp</p>
                <DataTable
                    data={reviewBoards || []}
                    isEdit={false}
                    isLoading={isReviewBoardLoading}
                    onClickRow={(reviewBoard) => {
                        setReviewBoard(reviewBoard);
                        setIsOpenDetailModal(true);
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
            {reviewBoard ? (
                <UpdateReviewBoard
                    reviewBoard={reviewBoard}
                    openModal={isOpenDetailModal}
                    onClose={() => setIsOpenDetailModal(false)}
                    onCreated={refetch}
                />
            ) : null}
        </div>
    );
}
