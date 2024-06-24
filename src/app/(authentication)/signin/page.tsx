import withQuery from "@/utils/withQuery";
import SignIn from "./SignIn";

import API from "@/constants/apiEnpoint";
import COOKIE_NAME from "@/constants/cookies";
import { UserRole } from "@/types/Role";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
    const myHeaders = new Headers();
    const accessToken = cookies().get("accessToken")?.value || "";
    const role = (cookies().get(COOKIE_NAME.ROLE)?.value as UserRole) || null;

    if (accessToken) {
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        const staffInfoResponse = await fetch(API.staff.getStaffProfile, {
            headers: myHeaders,
        });

        if (staffInfoResponse.status === 200) redirect(withQuery("/home", {}));
    }

    return <SignIn role={role} />;
}
