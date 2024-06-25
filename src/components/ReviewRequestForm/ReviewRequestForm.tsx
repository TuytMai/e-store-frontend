import viewTestScoreList from "@/api/test-score/viewTestScoreList";
import { NewScoreReviewForm } from "@/types/ScoreReviewForm";
import { TestScoreEntity } from "@/types/TestScoreEntity";
import FONT from "@/utils/fontFamily";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import Button from "../Button/Button";
import ControllerSelectInput from "../ControllerInput/ControllerSelectInput";
import ControllerSubjectSelectInput from "../ControllerInput/ControllerSubjectSelectInput";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import ControllerTextarea from "../ControllerTextarea/ControllerTextarea";
import LabeledText from "../Typography/LabeledText";
import ControllerDateInput from "../ControllerInput/ControllerDateInput";

export default function ReviewRequestForm() {
    const [openModal, setOpenModal] = useState(false);

    const { data: testScores, isLoading } = useQuery<
        TestScoreEntity[] | undefined
    >({
        queryKey: ["test-score"],
        queryFn: viewTestScoreList,
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setValue,
        clearErrors,
    } = useForm<NewScoreReviewForm>({});

    const [subjectDetail, setSubjectDetail] = useState<TestScoreEntity | null>(
        null,
    );

    return (
        <div>
            <Button onClick={() => setOpenModal(true)}>
                <div className=" flex items-center gap-2">
                    <IoAddOutline size={24} />
                    Tạo đơn phúc khảo mới
                </div>
            </Button>
            <Modal
                dismissible
                size={"3xl"}
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>
                    <p className=" font-bold">
                        Nhập thông tin của đơn phúc khảo
                    </p>
                </Modal.Header>
                <Modal.Body>
                    <div className=" flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className=" flex-1">
                                <ControllerSubjectSelectInput
                                    control={control}
                                    name="subjectId"
                                    title="Môn học cần phúc khảo"
                                    isLoading={isLoading}
                                    items={testScores || []}
                                    choseValue={getValues("maMon")}
                                    onValueChange={(value) => {
                                        if (value) setValue("maMon", value);
                                        if (!testScores) return;
                                        setSubjectDetail(
                                            testScores.find(
                                                (test) => test.id === value,
                                            ) || null,
                                        );
                                    }}
                                />
                                {subjectDetail ? (
                                    <div className=" mt-4 px-2 flex flex-col gap-3">
                                        <LabeledText
                                            title={"Tên môn"}
                                            value={`${subjectDetail.tenMon} - ${subjectDetail.maMon}`}
                                        />
                                        <LabeledText
                                            title={"Khoa quản lý"}
                                            value={subjectDetail.khoaQuanLy}
                                        />
                                        <LabeledText
                                            title={"Điểm hiện tại"}
                                            value={subjectDetail.diemHienTai}
                                        />
                                    </div>
                                ) : null}
                            </div>
                            <div className=" flex-1 flex flex-col gap-3">
                                <ControllerDateInput
                                    type={"date"}
                                    control={control}
                                    name="ngayThi"
                                    title="Ngày thi"
                                    rules={{
                                        required: "Cần phải nhập ngày thi",
                                    }}
                                    register={register}
                                    placeholder="dd/mm/yyyy"
                                    onValueChange={(d: any) => {
                                        clearErrors("ngayThi");
                                    }}
                                    error={errors.ngayThi}
                                />
                                <ControllerTextInput
                                    control={control}
                                    name="phongThi"
                                    title="Phòng thi"
                                    rules={{
                                        required: "Cần phải nhập phòng thi",
                                    }}
                                    register={register}
                                    placeholder="C201"
                                    onValueChange={(d: any) => {
                                        clearErrors("phongThi");
                                    }}
                                    error={errors.ngayThi}
                                />
                                <ControllerSelectInput
                                    control={control}
                                    name="caThi"
                                    title="Ca thi"
                                    isLoading={isLoading}
                                    items={Array(6)
                                        .fill("")
                                        .map((value, index) => ({
                                            id: index.toString(),
                                            name: `Ca ${index + 1}`,
                                        }))}
                                    choseValue={getValues("caThi")}
                                    onValueChange={(value) => {
                                        if (value) setValue("caThi", value);
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <p
                                className={`${FONT.primary.className} mb-2 font-semibold text-sm text-secondary-900`}
                            >
                                Lý do
                            </p>
                            <ControllerTextarea
                                id="lydo"
                                rows={4}
                                placeholder="Nhập lý do phúc khảo..."
                                control={control}
                                name="lydo"
                                title="Lý do"
                                rules={{
                                    required: "Bạn cần nhập lý do phúc khảo",
                                }}
                                register={register}
                                onValueChange={(d: any) => {
                                    clearErrors("lyDo");
                                }}
                                error={errors.lyDo}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>
                        I accept
                    </Button>
                    <Button
                        btnType="secondary"
                        onClick={() => setOpenModal(false)}
                    >
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
