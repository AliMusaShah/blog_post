export type User = { id: number; username: string };

export type AuthState = {
  user: User | null;
  access: string | null;
  refresh: string | null;
  setAuth: (data: { user?: User; access: string; refresh?: string }) => void;
  setAccess: (access: string, refresh?: string) => void;
  logout: () => void;
};

export type UserRole = "student" | "teacher";

export type RoleOption = {
  value: UserRole;
  label: string;
  iconSrc: string;
  iconClassName: string;
};
