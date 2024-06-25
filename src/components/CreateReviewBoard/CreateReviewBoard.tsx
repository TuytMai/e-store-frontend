import findLecturers from "@/api/lecturer/find";
import addNewReviewBoard from "@/api/review-board/addNew";
import useLoading from "@/hooks/useLoading";
import { LecturerEntity } from "@/types/entity/Lecturer";
import { NewReviewBoard } from "@/types/NewReviewBoard";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoAddOutline, IoClose } from "react-icons/io5";
import { useMutation } from "react-query";
import Button from "../Button/Button";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import SearchInput from "../SearchInput/SearchInput.tsx";

type Props = {
    onCreated?: () => any;
};

export default function CreateReviewBoard({ onCreated }: Props) {
    const [openModal, setOpenModal] = useState(false);
    const { openLoading, closeLoading } = useLoading();

    const [lecturers, setLecturers] = useState<LecturerEntity[]>([]);

    const { mutate: addNewForm } = useMutation({
        mutationFn: addNewReviewBoard,
    });

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
            ...data,
        };
        openLoading("Đang tạo hội đồng phúc khảo...");
        addNewForm(newForm, {
            onSettled: () => {
                closeLoading();
            },
            onSuccess: () => {
                toast.success("Tạo hội đồng phúc khảo thành công");
                setOpenModal(false);
                onCreated?.();
            },
        });
    };

    return (
        <div>
            <Button
                onClick={() => {
                    setOpenModal(true);
                    reset({});
                }}
            >
                <div className=" flex items-center gap-2">
                    <IoAddOutline size={24} />
                    Tạo hội đồng phúc khảo mới
                </div>
            </Button>
            <Modal
                dismissible
                size={"xl"}
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>
                    <p className=" font-bold">
                        Nhập thông tin của đơn phúc khảo
                    </p>
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
                                        placeholder="C201"
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
                                    <div className=" px-2 flex flex-col gap-2">
                                        {lecturers.map(
                                            ({ id, hoTen, username }) => (
                                                <div
                                                    key={id}
                                                    className=" my-1 flex justify-between items-center"
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
                                                        btnType={"secondary"}
                                                    >
                                                        <IoClose
                                                            className=" text-gray-400"
                                                            size={24}
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
                            <Button type="submit">Tạo hội đồng</Button>
                            <Button
                                btnType="secondary"
                                onClick={() => setOpenModal(false)}
                            >
                                Hủy
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
                {/* <Modal.Footer></Modal.Footer> */}
            </Modal>
        </div>
    );
}
