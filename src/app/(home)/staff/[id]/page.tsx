import PermissionTab from "./PermissionTab";
import StaffDetailTab from "./StaffDetailTab";

export default function Page({ params: { id } }: { params: { id: string } }) {
    return (
        <div className=" w-full flex flex-row">
            <StaffDetailTab id={id} />
            <PermissionTab id={id} />
        </div>
    );
}
