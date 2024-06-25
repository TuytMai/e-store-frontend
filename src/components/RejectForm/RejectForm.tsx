import updateReviewRequest from "@/api/review-request/update";
import { NewComplaintForm } from "@/types/ComplainFormEntity";
import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useMutation } from "react-query";
import Button from "../Button/Button";
import ControllerTextarea from "../ControllerTextarea/ControllerTextarea";

type Props = {
    form: ScoreReviewForm;
    onClick?: () => any;
};

export default function RejectScoreReviewForm({ onClick, form }: Props) {
    const [openModal, setOpenModal] = useState(false);

    const { testScore, ngayThi, caThi, phongThi, id } = form;

    const { mutate } = useMutation({
        mutationFn: updateReviewRequest,
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
    } = useForm<NewComplaintForm>({ defaultValues: {} });

    const onSubmit = async () => {
        const lyDo = getValues("lyDo");
        mutate({ id, tinhTrang: "TU_CHOI", lyDoTuChoi: lyDo });
        setOpenModal(false);
        onClick?.();
    };

    return (
        <div>
            <Button
                onClick={() => {
                    setOpenModal(true);
                }}
                className=" bg-red-400 hover:bg-red-500 "
            >
                <p className=" font-semibold">Từ chối đơn</p>
            </Button>
            <Modal
                dismissible
                size={"xl"}
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Body>
                    <div className=" w-full py-4 flex flex-col gap-9 items-center">
                        <p className=" text-2xl font-semibold">
                            Từ chối đơn phúc khảo
                        </p>
                        <form className=" w-full">
                            <div className=" w-full flex flex-col gap-2">
                                <div className=" w-full">
                                    <p
                                        className={` mb-2 font-semibold text-sm text-secondary-900`}
                                    >
                                        Lý do
                                    </p>
                                    <ControllerTextarea
                                        id="lyDo"
                                        rows={5}
                                        placeholder="Nhập lý do từ chối..."
                                        control={control}
                                        name="lyDo"
                                        title="Lý do"
                                        rules={{
                                            required:
                                                "Bạn cần nhập lý do từ chối",
                                        }}
                                        register={register}
                                        onValueChange={(d: any) => {
                                            clearErrors("lyDo");
                                        }}
                                        error={errors.lyDo}
                                    />
                                </div>
                            </div>
                        </form>
                        <div className=" flex justify-between gap-4">
                            <Button
                                onClick={() => setOpenModal(false)}
                                className=" col-span-3 bg-gray-50 hover:bg-gray-100"
                            >
                                <div className=" flex items-center gap-2">
                                    <IoArrowUndoOutline
                                        size={22}
                                        className=" text-gray-800"
                                    />
                                    <p className=" font-semibold text-gray-800">
                                        Trở về
                                    </p>
                                </div>
                            </Button>
                            <Button
                                onClick={() => {
                                    onSubmit();
                                }}
                                className=" bg-red-400 hover:bg-red-500 "
                            >
                                <p className=" font-semibold">Từ chối đơn</p>
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
