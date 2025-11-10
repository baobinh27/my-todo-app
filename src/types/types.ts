export type TodoInfo = {
    title: string,
    description: string,
    createdAt: Date,
    status: "pending" | "completed" | "overdue",
    dueAt: Date;
}
