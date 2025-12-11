export type Role = "user" | "instructor" | "admin";

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
  wallet: number;
  purchasedCourseIds: number[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructorName: string;
  price: number;
}

export interface MatchRequest {
  id: number;
  studentId: number;
  topic: string;
  status: "pending" | "matched";
  assignedInstructorId?: number;
}
