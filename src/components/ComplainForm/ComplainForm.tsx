import addNewComplainForm from "@/api/complain/addNewForm";
import useLoading from "@/hooks/useLoading";
import { NewScoreReviewForm, ScoreReviewForm } from "@/types/ScoreReviewForm";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMegaphoneOutline } from "react-icons/io5";
import { useMutation } from "react-query";
import Button from "../Button/Button";
import ControllerTextarea from "../ControllerTextarea/ControllerTextarea";
import LabeledText from "../Typography/LabeledText";

type Props = {
    onCreated?: () => any;
    form: ScoreReviewForm;
};

export default function ComplainForm({ onCreated, form }: Props) {
    const { testScore, ngayThi, caThi, phongThi } = form;

    const [openModal, setOpenModal] = useState(false);
    const { openLoading, closeLoading } = useLoading();

    const { mutate: addNewForm } = useMutation({
        mutationFn: addNewComplainForm,
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
    } = useForm<NewScoreReviewForm>({ defaultValues: {} });

    const onSubmit = async (data: NewScoreReviewForm) => {
        const newForm = {
            ...data,
            reviewFormId: form.id,
        };
        openLoading("Đang tạo đơn khiếu nại...");
        addNewForm(newForm, {
            onSettled: () => {
                closeLoading();
            },
            onSuccess: () => {
                toast.success("Tạo đơn khiếu nại thành công");
                setOpenModal(false);
                onCreated?.();
            },
        });
    };

    return (
        <div className=" w-full">
            <Button
                className=" w-full bg-red-100 hover:bg-red-200"
                onClick={() => {
                    setOpenModal(true);
                    reset({});
                }}
            >
                <div className=" flex items-center gap-2">
                    <IoMegaphoneOutline size={22} className=" text-red-800" />
                    <p className=" font-semibold text-red-800">Khiếu nại</p>
                </div>
            </Button>
            <Modal
                dismissible
                size={"3xl"}
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>
                    <p className=" font-bold">Nhập thông tin đơn khiếu nại</p>
                </Modal.Header>
                <Modal.Body>
                    <div className=" w-full flex flex-col gap-2 justify-between">
                        <div className=" w-full grid grid-cols-5 gap-8">
                            <LabeledText
                                className=" col-span-3"
                                title="Môn phúc khảo"
                                value={`${testScore.maMon} - ${testScore.tenMon}`}
                            />
                            <LabeledText
                                className=" col-span-2"
                                title="Lớp"
                                value={testScore.lop}
                            />
                        </div>
                    </div>
                    <form className=" mt-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className=" flex flex-col gap-4">
                            <div>
                                <p
                                    className={` mb-2 font-semibold text-sm text-secondary-900`}
                                >
                                    Lý do
                                </p>
                                <ControllerTextarea
                                    id="lyDo"
                                    rows={5}
                                    placeholder="Nhập lý do khiếu nại..."
                                    control={control}
                                    name="lyDo"
                                    title="Lý do"
                                    rules={{
                                        required:
                                            "Bạn cần nhập lý do khiếu nại",
                                    }}
                                    register={register}
                                    onValueChange={(d: any) => {
                                        clearErrors("lyDo");
                                    }}
                                    error={errors.lyDo}
                                />
                            </div>
                        </div>
                        <div className=" mt-8 flex gap-4">
                            <Button type="submit">Nộp đơn khiếu nại</Button>
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
