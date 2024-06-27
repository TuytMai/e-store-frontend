import findLecturers from "@/api/lecturer/find";
import updateReviewBoard from "@/api/review-board/update";
import useLoading from "@/hooks/useLoading";
import { LecturerEntity } from "@/types/entity/Lecturer";
import { NewReviewBoard } from "@/types/NewReviewBoard";
import { ReviewBoardEntity } from "@/types/ReviewBoard";
import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { useMutation } from "react-query";
import { useDeepCompareEffect } from "react-use";
import Button from "../Button/Button";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import SearchInput from "../SearchInput/SearchInput.tsx";
import SelectScoreReviewFormModal from "../SelectScoreReviewFormModal/SelectScoreReviewFormModal";

type Props = {
    reviewBoard: ReviewBoardEntity;
    onCreated?: () => any;
    openModal: boolean;
    onClose: () => any;
};

export default function UpdateReviewBoard({
    reviewBoard,
    onCreated,
    onClose,
    openModal,
}: Props) {
    const { openLoading, closeLoading } = useLoading();

    const [lecturers, setLecturers] = useState<LecturerEntity[]>([]);
    const [scoreReviews, setScoreReviews] = useState<ScoreReviewForm[]>([]);
    const [isOpenSelectScoreReview, setIsOpenSelectScoreReview] =
        useState(false);

    const { mutate: addNewForm } = useMutation({
        mutationFn: updateReviewBoard,
    });

    useDeepCompareEffect(() => {
        setLecturers(reviewBoard.lecturers);
        console.log({ reviewBoard: reviewBoard?.reviewResults });
        setScoreReviews(
            reviewBoard?.reviewResults?.map((d) => d.testScoreReviewForm) || [],
        );
        setValue("ten", reviewBoard.ten);
    }, [reviewBoard]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setValue,
        clearErrors,
        reset,
    } = useForm<NewReviewBoard>({ defaultValues: {} });

    const onSubmit = async (data: NewReviewBoard) => {
        const newForm = {
            ...reviewBoard,
            ...data,
            lecturerIds: lecturers.map(({ id }) => id),
            scoreReviewIds: scoreReviews.map((s) => s.id),
        };
        openLoading("Đang cập nhật hội đồng phúc khảo...");
        addNewForm(newForm, {
            onSettled: () => {
                closeLoading();
            },
            onSuccess: () => {
                toast.success("Cập nhật hội đồng phúc khảo thành công");
                onClose();
                onCreated?.();
            },
        });
    };

    return (
        <>
            <Modal
                dismissible={false}
                size={"2xl"}
                show={openModal}
                onClose={onClose}
            >
                <Modal.Header>
                    <p className=" font-bold">Chỉnh sửa thông tin hội đồng</p>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" flex flex-col gap-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className=" flex-1 flex flex-col gap-3">
                                    <ControllerTextInput
                                        control={control}
                                        name="ten"
                                        title="Tên hội đồng"
                                        rules={{
                                            required:
                                                "Cần phải nhập tên hội đồng",
                                        }}
                                        register={register}
                                        placeholder="Nhập tên hội đồng phúc khảo..."
                                        onValueChange={(d: any) => {
                                            clearErrors("ten");
                                        }}
                                        error={errors.ten}
                                    />
                                </div>
                                <div className=" flex-1 flex flex-col gap-2">
                                    <SearchInput
                                        title="Thêm giảng viên"
                                        placeholder="Tìm kiếm bằng tên giảng viên..."
                                        queryInfo={{
                                            queryKeys: ["find-lecturers"],
                                            queryFunc: findLecturers,
                                        }}
                                        onSelect={(lecturer) => {
                                            setLecturers((prev) => [
                                                ...prev.filter(
                                                    (v) => v.id !== lecturer.id,
                                                ),
                                                lecturer,
                                            ]);
                                        }}
                                        template={(value) => (
                                            <>
                                                <p className=" font-medium px-2 py-1">
                                                    {value.hoTen}
                                                </p>
                                            </>
                                        )}
                                        className=""
                                    />
                                    <div className=" flex flex-col gap-2">
                                        {lecturers.map(
                                            ({ id, hoTen, username }) => (
                                                <div
                                                    key={id}
                                                    className=" px-3 py-2 rounded-lg bg-primary-100 my-1 flex justify-between items-center"
                                                >
                                                    <div>
                                                        <p className=" font-semibold">
                                                            {hoTen}
                                                        </p>
                                                        <p className=" text-gray-600 text-sm">
                                                            {username}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        className=" hover:bg-primary-500 group"
                                                        onClick={() =>
                                                            setLecturers(
                                                                (prev) => [
                                                                    ...prev.filter(
                                                                        (
                                                                            value,
                                                                        ) =>
                                                                            value.id !==
                                                                            id,
                                                                    ),
                                                                ],
                                                            )
                                                        }
                                                        fill={false}
                                                        btnType={"secondary"}
                                                        size={"xs"}
                                                    >
                                                        <IoClose
                                                            className=" text-secondary-600 group-hover:text-secondary-100"
                                                            size={22}
                                                        />
                                                    </Button>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                                <div className=" flex-1 flex flex-col gap-2">
                                    <p className=" font-semibold text-sm flex gap-1 items-center">
                                        Chọn danh sách đơn phúc khảo
                                    </p>
                                    <Button
                                        onClick={() =>
                                            setIsOpenSelectScoreReview(true)
                                        }
                                        className=" mt-2 bg-primary-50 hover:bg-primary-100"
                                        size={"sm"}
                                        fill={false}
                                    >
                                        <div className=" flex gap-2 items-center">
                                            <IoAddOutline size={24} />
                                            <p> Thêm đơn phúc khảo</p>
                                        </div>
                                    </Button>
                                    <div className=" flex flex-col gap-2">
                                        {scoreReviews.map(
                                            ({
                                                id,
                                                student,
                                                testScore,
                                                ngayDangKy,
                                            }) => (
                                                <div
                                                    key={id}
                                                    className=" px-3 py-2 rounded-lg bg-primary-100 my-1 flex justify-between items-center"
                                                >
                                                    <div>
                                                        <p className=" font-semibold">
                                                            {student?.hoTen}
                                                        </p>
                                                        <p className=" text-gray-600 text-sm">
                                                            {testScore?.tenMon}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        className=" hover:bg-primary-500 group"
                                                        onClick={() =>
                                                            setScoreReviews(
                                                                (prev) => [
                                                                    ...prev.filter(
                                                                        (
                                                                            value,
                                                                        ) =>
                                                                            value.id !==
                                                                            id,
                                                                    ),
                                                                ],
                                                            )
                                                        }
                                                        fill={false}
                                                        btnType={"secondary"}
                                                        size={"xs"}
                                                    >
                                                        <IoClose
                                                            className=" text-secondary-600 group-hover:text-secondary-100"
                                                            size={22}
                                                        />
                                                    </Button>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-8 flex gap-4">
                            <Button type="submit">Cập nhật hội đồng</Button>
                            <Button btnType="secondary" onClick={onClose}>
                                Hủy
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {isOpenSelectScoreReview ? (
                <SelectScoreReviewFormModal
                    defaultSelected={scoreReviews}
                    openModal={isOpenSelectScoreReview}
                    onClose={(newScoreReviews) => {
                        setScoreReviews((prev) => [
                            ...prev,
                            ...newScoreReviews,
                        ]);
                        setIsOpenSelectScoreReview(false);
                    }}
                />
            ) : null}
        </>
    );
}
