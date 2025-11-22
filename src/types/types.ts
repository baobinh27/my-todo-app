export type TaskInfo = {
    id: number,
    title: string,
    description: string,
    createdAt: Date,
    status: "pending" | "completed" | "overdue",
    dueAt: Date;
}
