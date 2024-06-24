export const ROLE_KEYS = [
    "student",
    "lecturer",
    "training-department",
    "administrator",
] as const;

type RoleType = typeof ROLE_KEYS;
export type UserRole = RoleType[number];

export const ALL_ROLES: Record<UserRole, string> = {
    student: "Sinh viên",
    lecturer: "Giảng viên",
    "training-department": "Phòng đào tạo",
    administrator: "Ban giám hiệu",
} as const;
