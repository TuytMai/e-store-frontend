import { Modal } from "flowbite-react";
import { useState } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Button from "../Button/Button";

type Props = {
    onClick?: () => any;
};

export default function ApproveForm({ onClick }: Props) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div>
            <Button
                onClick={() => {
                    setOpenModal(true);
                    onClick?.();
                }}
                className=" bg-green-400 hover:bg-green-500 "
            >
                <p className=" font-semibold"> Duyệt đơn</p>
            </Button>
            <Modal
                dismissible
                size={"xl"}
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Body>
                    <div className=" py-4 flex flex-col gap-9 items-center">
                        <p className=" text-2xl font-semibold">
                            Đã duyệt đơn phúc khảo
                        </p>
                        <div className=" flex flex-col gap-2">
                            <div className=" flex flex-row gap-2">
                                <IoCheckmarkDoneOutline
                                    className=" text-green-600"
                                    size={24}
                                />
                                <p className=" text-green-600 font-medium">
                                    Đơn đã được đưa vào danh sách chờ phúc khảo
                                </p>
                            </div>
                            <div className=" flex flex-row gap-2">
                                <IoCheckmarkDoneOutline
                                    className=" text-green-600"
                                    size={24}
                                />
                                <p className=" text-green-600 font-medium">
                                    Đơn đã được đưa vào danh sách chờ phúc khảo
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setOpenModal(false)}
                            className=" w-fit bg-blue-100 hover:bg-blue-200"
                        >
                            <p className=" font-bold text-blue-800">
                                Duyệt đơn khác
                            </p>
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
