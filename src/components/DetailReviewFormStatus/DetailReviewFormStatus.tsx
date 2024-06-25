import { ReviewResultEntity } from "@/types/ReviewResult";
import { EReviewStatus } from "@/types/ScoreReviewForm";
import { twMerge } from "tailwind-merge";

type Props = {
    status: EReviewStatus;
    result?: ReviewResultEntity;
    reason?: string;
};

const STYLES: Record<
    EReviewStatus,
    { color: string; backgroundColor: string; text: string }
> = {
    DA_GUI: {
        color: "text-yellow-800",
        backgroundColor: "bg-yellow-100",
        text: "Đang chờ Phòng Đào tạo xét duyệt đơn",
    },
    TU_CHOI: {
        color: "text-red-800",
        backgroundColor: "bg-red-100",
        text: "Đơn của bạn đã bị từ chỗi với lý do:",
    },
    DANG_XU_LI: {
        color: "text-purple-800",
        backgroundColor: "bg-purple-100",
        text: "Đơn của bạn đã được duyệt, đang chờ kết quả phúc khảo",
    },
    DA_XU_LI: {
        color: "text-green-800",
        backgroundColor: "bg-green-100",
        text: "Kết quả phúc khảo đã được cập nhật",
    },
};

export default function DetailReviewFormStatus({
    status,
    result,
    reason,
}: Props) {
    const { color, backgroundColor, text } = STYLES[status];

    return (
        <div
            className={twMerge(
                backgroundColor,
                " px-5 py-4 rounded-2xl w-full flex flex-col gap-3",
            )}
        >
            <p className={twMerge(color, " font-medium ")}>Trạng thái</p>
            <div className=" flex flex-col gap-2">
                <p className={twMerge(color, " font-bold ")}>{text}</p>
                {status === "DA_XU_LI" ? (
                    <p className={twMerge(color, " font-bold ")}>
                        <span className=" font-medium">Điểm phúc khảo: </span>
                        {` ${result?.diemPhucKhao}`}
                    </p>
                ) : null}
                {status === "DA_XU_LI" ? (
                    <p className={twMerge(color, " font-bold ")}>
                        <span className=" font-medium">Giải trình: </span>
                        {` ${result?.giaiTrinh}`}
                    </p>
                ) : null}
                {status === "TU_CHOI" ? (
                    <p className={twMerge(color, " font-bold ")}>
                        {`${reason}`}
                    </p>
                ) : null}
            </div>
        </div>
    );
}
