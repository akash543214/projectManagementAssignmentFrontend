export type UserData = {
  _id: string;
  name: string;
  email: string;
  created_at: Date;
};

export type TaskData = {
  _id:string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: Date;
  user?:string;
  project?: string;
}

export type ProjectData = {
_id: string;
  title: string;
  description: string;
  status: "active" | "completed";
  user?:string;
}