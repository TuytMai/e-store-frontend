import { EReviewStatus } from "@/types/ScoreReviewForm";
import FONT from "@/utils/fontFamily";
import { twMerge } from "tailwind-merge";

type Props = {
    status: EReviewStatus;
};

const STYLES: Record<
    EReviewStatus,
    { color: string; backgroundColor: string; text: string }
> = {
    DA_GUI: {
        color: "text-yellow-800",
        backgroundColor: "bg-yellow-100",
        text: "Đã gửi",
    },
    TU_CHOI: {
        color: "text-red-800",
        backgroundColor: "bg-red-100",
        text: "Từ chối",
    },
    DANG_XU_LI: {
        color: "text-purple-800",
        backgroundColor: "bg-purple-100",
        text: "Đang xử lí",
    },
    DA_XU_LI: {
        color: "text-green-800",
        backgroundColor: "bg-green-100",
        text: "Đã xử lí",
    },
};

export default function ReviewFormStatus({ status }: Props) {
    const { color, backgroundColor, text } = STYLES[status];

    return (
        <p
            className={twMerge(
                color,
                backgroundColor,
                " w-fit text-sm font-semibold rounded-md px-2 py-1",
            )}
        >
            {text}
        </p>
    );
}
