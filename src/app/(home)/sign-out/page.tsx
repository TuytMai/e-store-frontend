import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default function Page() {
    deleteCookie("accessToken");

    setTimeout(() => redirect("/signin"), 1000);
}
