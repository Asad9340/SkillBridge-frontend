
export interface User {
  role: "ADMIN" | "TUTOR" | "STUDENT";
  phone: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  bio: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image: string | null;
}
