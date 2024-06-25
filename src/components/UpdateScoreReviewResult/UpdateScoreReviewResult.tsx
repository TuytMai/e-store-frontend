import updateReviewRequest from "@/api/review-request/update";
import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import { Label, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useMutation } from "react-query";
import Button from "../Button/Button";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import ControllerTextarea from "../ControllerTextarea/ControllerTextarea";
import ReviewFormStatus from "../ReviewFormStatus/ReviewFormStatus";
import LabeledText from "../Typography/LabeledText";

type Props = {
    isOpen: boolean;
    form: ScoreReviewForm;
    onClose: () => any;
};

export default function UpdateScoreReviewResult({
    isOpen,
    form,
    onClose,
}: Props) {
    const {
        id,
        ngayDangKy,
        student,
        testScore,
        ngayThi,
        caThi,
        phongThi,
        lyDo,
        tinhTrang,
    } = form;

    const { mutate } = useMutation({ mutationFn: updateReviewRequest });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setValue,
        clearErrors,
        reset,
    } = useForm<
        Partial<ScoreReviewForm> & {
            diemPhucKhao?: number;
            giaiTrinh?: string;
        }
    >({ defaultValues: {} });

    const onSubmit = (
        data: Partial<ScoreReviewForm> & {
            diemPhucKhao?: number;
            giaiTrinh?: string;
        },
    ) => {
        mutate({
            id,
            diemPhucKhao: data.diemPhucKhao,
            giaiTrinh: data.giaiTrinh,
            tinhTrang: "DA_XU_LI",
        });
    };

    return (
        <Modal show={isOpen} onClose={onClose} dismissible size={"2xl"}>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=" px-4 flex flex-col items-center gap-9">
                        <div className=" w-full flex flex-row justify-between">
                            <p className=" text-sm text-gray-500">
                                Id: <span className=" font-semibold">{id}</span>
                            </p>
                            <p className=" text-sm text-gray-500">
                                Ngày tạo:{" "}
                                <span className=" font-semibold">
                                    {new Intl.DateTimeFormat("vi-VN", {
                                        dateStyle: "medium",
                                        timeZone: "Asia/Ho_Chi_Minh",
                                    }).format(new Date(ngayDangKy))}
                                </span>
                            </p>
                        </div>
                        <div className=" flex flex-col gap-2 items-center">
                            <p className=" text-3xl font-semibold">
                                Thông tin đơn phúc khảo
                            </p>
                            <ReviewFormStatus status={form.tinhTrang} />
                        </div>
                        <div className=" w-full flex flex-col gap-2 justify-between">
                            <p className=" font-semibold text-center text-gray-500">
                                Thông tin sinh viên
                            </p>
                            <div className=" py-3 px-4 bg-gray-100 rounded-lg mt-4 w-full grid grid-cols-5 gap-4 gap-y-8">
                                <LabeledText
                                    className=" col-span-3"
                                    title="Họ và tên"
                                    value={student.hoTen}
                                />
                                <LabeledText
                                    className=" col-span-2"
                                    title="Mã số sinh viên"
                                    value={student.mssv}
                                />
                                <LabeledText
                                    title="Lớp sinh hoạt"
                                    value={student.lopSinhHoat}
                                />
                            </div>
                        </div>
                        <div className=" w-full flex flex-col gap-2 justify-between">
                            <p className=" font-semibold text-center text-gray-500">
                                Thông tin môn học cần phúc khảo
                            </p>
                            <div className=" py-3 px-4 bg-gray-100 rounded-lg mt-4 w-full grid grid-cols-5 gap-4">
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
                                <LabeledText
                                    title="Khoa quản lý"
                                    value={testScore.khoaQuanLy}
                                />
                            </div>
                        </div>
                        <div className=" w-full flex flex-col gap-2 justify-between">
                            <p className=" font-semibold text-center text-gray-500">
                                Thông tin bài thi
                            </p>
                            <div className=" py-3 px-4 bg-gray-100 rounded-lg mt-4 w-full grid grid-cols-3 gap-4">
                                <LabeledText
                                    title="Ngày thi"
                                    value={new Intl.DateTimeFormat("vi-VN", {
                                        dateStyle: "medium",
                                        timeZone: "Asia/Ho_Chi_Minh",
                                    }).format(new Date(ngayThi))}
                                />
                                <LabeledText title="Ca thi" value={caThi} />
                                <LabeledText
                                    title="Phòng thi"
                                    value={phongThi}
                                />
                                <LabeledText
                                    title="Điểm hiện tại"
                                    value={testScore.diemHienTai}
                                />
                                <LabeledText
                                    className=" col-span-2"
                                    title="Lý do"
                                    value={lyDo}
                                />
                            </div>
                        </div>
                        <div className=" w-full rounded-xl py-4 bg-primary-100 flex flex-col gap-2 justify-between">
                            <p className=" font-semibold text-center text-secondary-900">
                                Cập nhật điểm thi
                            </p>
                            <div className=" py-3 px-4 rounded-lg mt-4 w-full grid grid-cols-3 gap-4">
                                {tinhTrang === "DANG_XU_LI" ? (
                                    <ControllerTextInput
                                        control={control}
                                        name="diemPhucKhao"
                                        title="Điểm phúc khảo"
                                        rules={{
                                            required:
                                                "Cần phải nhập điểm phúc khảo",
                                        }}
                                        register={register}
                                        placeholder="Nhập điểm..."
                                        onValueChange={(d: any) => {
                                            clearErrors("diemPhucKhao");
                                        }}
                                        error={errors.diemPhucKhao}
                                    />
                                ) : (
                                    <LabeledText
                                        className=" col-span-1"
                                        title="Điểm phúc khảo"
                                        value={form.reviewResult.diemPhucKhao}
                                    />
                                )}
                                <div className=" col-span-2">
                                    {tinhTrang === "DANG_XU_LI" ? (
                                        <Label
                                            htmlFor={"giaiTrinh"}
                                            className=" mb-2 block font-semibold text-secondary-900 "
                                            value={"Giải trình"}
                                        />
                                    ) : null}
                                    {tinhTrang === "DANG_XU_LI" ? (
                                        <ControllerTextarea
                                            control={control}
                                            id="giaiTrinh"
                                            name="giaiTrinh"
                                            title="Giải trình"
                                            rules={{}}
                                            rows={4}
                                            register={register}
                                            placeholder="Nhập giải trình sau khi phúc khảo..."
                                            onValueChange={(d: any) => {
                                                clearErrors("giaiTrinh");
                                            }}
                                            error={errors.giaiTrinh}
                                        />
                                    ) : (
                                        <LabeledText
                                            className=" w-full"
                                            title="Giải trình"
                                            value={form.reviewResult.giaiTrinh}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className=" w-full flex items-center justify-between gap-4">
                            <Button
                                onClick={onClose}
                                className=" bg-gray-50 hover:bg-gray-100"
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
                            {form.tinhTrang === "DANG_XU_LI" ? (
                                <div className=" flex gap-4">
                                    <Button type="submit">
                                        Cập nhật điểm thi
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}
