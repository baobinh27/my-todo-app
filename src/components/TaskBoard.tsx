import { FaPlusCircle } from "react-icons/fa";
import type { TaskInfo } from "../types/types";
import Card from "./Card";
import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { useTaskContext } from "../services/useTaskContext";

type TaskBoardProps = {
    // taskInfos: TaskInfo[],
    onSelectTask: (id: number) => void,
    onCreateTask: () => void
}

const TaskBoard = ({ onSelectTask, onCreateTask }: TaskBoardProps) => {
    const { getTasks } = useTaskContext();

    const [showCompleted, setShowCompleted] = useState(false);

    const tasks = getTasks();

    if (!tasks) {
        return <LoadingScreen />
    }


    return <div className="flex flex-col h-full w-3/4 h-40 overflow-y-scroll">
        <div className="flex flex-row justify-between py-4 px-6">
            <button
                className="flex flex-row gap-2 px-4 py-2 rounded-md bg-[#474751] items-center"
                onClick={onCreateTask}
            >
                <FaPlusCircle />
                Add new task
            </button>
            <div className="flex flex-row gap-2 items-center">
                <input
                    type="checkbox"
                    name="show-completed"
                    onChange={(e: any) => setShowCompleted(e.target.checked)}
                />
                <label htmlFor="show-completed">Show completed tasks</label>
            </div>
        </div>

        <div className="w-full grid grid-cols-4 auto-rows-min place-items-center gap-x-2 gap-y-10 p-4">
            {tasks.map((task: TaskInfo) => {
                if (!showCompleted && task.status === 'completed') return null;
                return <Card id={task.id} taskInfo={task} onSelect={() => {
                    onSelectTask(task.id); console.log(task);
                }} />
            }
            )}
        </div>
    </div>

}

export default TaskBoard;