import { createContext, useContext } from "react";
import useTask from "../hooks/useTask";
import type { TaskInfo } from "../types/types";

type TaskContextType = {
    getTasks: () => TaskInfo[],
    getTaskById: (id: number) => TaskInfo | undefined,
    createTask: (task: TaskInfo) => void,
    updateTask: (task: TaskInfo) => void,
    markCompleted: (id: number) => void,
    deleteTask: (id: number) => void
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const task = useTask();

    return <TaskContext.Provider value={task}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used inside TaskProvider");
    }
    return context;
};