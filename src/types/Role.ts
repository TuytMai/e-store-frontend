export const ROLE_KEYS = [
    "student",
    "lecturer",
    "trainingDepartment",
    "administrator",
] as const;

type RoleType = typeof ROLE_KEYS;
export type UserRole = RoleType[number];

export const ALL_ROLES: Record<UserRole, string> = {
    student: "Sinh viên",
    lecturer: "Giảng viên",
    trainingDepartment: "Phòng đào tạo",
    administrator: "Ban giám hiệu",
} as const;
