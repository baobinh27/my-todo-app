import type { TaskInfo } from "../types/types";
import useLocalStorage from "./useLocalStorage";


const useTask = () => {
    const taskManager = useLocalStorage<TaskInfo[]>('tasks', []);
    const taskCounter = useLocalStorage<number>('task-counter', 0);

    const getTasks = () => {
        return taskManager.storedValue;
    }

    const getTaskById = (id: number) => {
        return taskManager.storedValue.find(task => task.id === id);
    }

    const createTask = (task: TaskInfo) => {
        task.id = taskCounter.storedValue + 1;
        taskCounter.setValue(task.id);
        const updatedTasks = [...taskManager.storedValue, task];
        taskManager.setValue(updatedTasks);
    }

    const updateTask = (task: TaskInfo) => {
        const tasks = taskManager.storedValue;
        const updatedTasks = tasks.map(t => t.id === task.id ? task : t);
        taskManager.setValue(updatedTasks);
    }

    const deleteTask = (taskId: number) => {
        const tasks = taskManager.storedValue;
        const updatedTasks = tasks.filter(t => t.id !== taskId);
        taskManager.setValue(updatedTasks);
    }

    const markCompleted = (taskId: number) => {
        const tasks = taskManager.storedValue;
        const updatedTasks = tasks.map(t => {
            if (t.id === taskId) {
                return { ...t, status: 'completed' as const };
            }
            return t;
        });
        taskManager.setValue(updatedTasks);
    }

    return { getTasks, getTaskById, createTask, updateTask, deleteTask, markCompleted };
}

export default useTask;