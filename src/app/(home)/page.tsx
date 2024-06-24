import COOKIE_NAME from "@/constants/cookies";
import { UserRole } from "@/types/Role";
import withQuery from "@/utils/withQuery";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
    const role = (cookies().get(COOKIE_NAME.ROLE)?.value as UserRole) || null;

    redirect(withQuery(`/${role}`, {}));
}
